import express from 'express';
import { randomUUID } from 'node:crypto';
import { db } from '../db.js';
import { getQuestionsForRole, evaluateAnswerIntelligently, generateAdaptiveQuestion } from '../services/ai.js';

export const interviewRouter = express.Router();

/**
 * POST /api/interview/start
 * Launches a new interview session and generates the first question
 */
interviewRouter.post('/start', async (req, res) => {
  try {
    const {
      role = 'Software Engineer',
      interviewType = 'Technical Interview',
      difficulty = 'Intermediate',
      duration = 15,
      questionCount = 5,
      userId = 1
    } = req.body;

    const sessionId = randomUUID();
    const durationMinutes = parseInt(duration, 10) || 15;
    const totalQuestions = parseInt(questionCount, 10) || 5;

    // Insert session into SQLite
    const insertSession = db.prepare(`
      INSERT INTO interview_sessions (
        id, user_id, role, interview_type, difficulty, duration_minutes, question_count, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'in_progress')
    `);
    insertSession.run(sessionId, userId, role, interviewType, difficulty, durationMinutes, totalQuestions);

    // Pick opening question
    const questions = getQuestionsForRole(role, difficulty, interviewType);
    const firstQ = questions[0] || {
      question: `Walk me through your engineering experience and how you approach complex problem-solving in a ${role} role.`,
      category: 'Overview',
      difficulty: difficulty,
      type: interviewType
    };

    // Insert first exchange record
    const insertExchange = db.prepare(`
      INSERT INTO interview_exchanges (
        session_id, question_index, question_text, question_type, difficulty_level
      ) VALUES (?, 0, ?, ?, ?)
    `);
    insertExchange.run(sessionId, firstQ.question, firstQ.type || 'Technical', firstQ.difficulty || difficulty);

    res.json({
      sessionId,
      question: firstQ.question,
      category: firstQ.category || 'Core Concepts',
      difficulty: firstQ.difficulty || difficulty,
      type: firstQ.type || 'Technical',
      questionIndex: 0,
      totalQuestions,
      role,
      interviewType
    });
  } catch (err) {
    console.error('Error starting interview session:', err);
    res.status(500).json({ error: 'Failed to start interview session', details: err.message });
  }
});

/**
 * POST /api/interview/:sessionId/answer
 * Evaluates the submitted answer and dynamically generates the adaptive next question
 */
interviewRouter.post('/:sessionId/answer', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    // Get current session
    const session = db.prepare('SELECT * FROM interview_sessions WHERE id = ?').get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get the active exchange
    const latestExchange = db.prepare(`
      SELECT * FROM interview_exchanges 
      WHERE session_id = ? 
      ORDER BY question_index DESC 
      LIMIT 1
    `).get(sessionId);

    if (!latestExchange) {
      return res.status(400).json({ error: 'No active question found for this session' });
    }

    // Evaluate answer strictly and intelligently
    const evaluation = await evaluateAnswerIntelligently({
      question: latestExchange.question_text,
      userAnswer: answer,
      role: session.role,
      difficulty: session.difficulty,
      interviewType: session.interview_type
    });

    // Update exchange with evaluation
    const updateExchange = db.prepare(`
      UPDATE interview_exchanges
      SET user_answer = ?,
          clarity_score = ?,
          relevance_score = ?,
          depth_score = ?,
          communication_score = ?,
          problem_solving_score = ?,
          overall_score = ?,
          strengths = ?,
          missing_concepts = ?,
          incorrect_concepts = ?,
          improvements = ?,
          stronger_answer = ?,
          adaptive_reason = ?
      WHERE id = ?
    `);

    updateExchange.run(
      answer,
      evaluation.clarity,
      evaluation.relevance,
      evaluation.depth,
      evaluation.communication,
      evaluation.problemSolving,
      evaluation.overall,
      JSON.stringify(evaluation.strengths || []),
      JSON.stringify(evaluation.missingConcepts || []),
      JSON.stringify(evaluation.incorrectConcepts || []),
      JSON.stringify(evaluation.improvements || []),
      evaluation.strongerAnswer || '',
      evaluation.adaptiveHint || '',
      latestExchange.id
    );

    // Compute updated session averages
    const avgStats = db.prepare(`
      SELECT 
        AVG(overall_score) as avgOverall,
        AVG(clarity_score) as avgClarity,
        AVG(relevance_score) as avgRelevance,
        AVG(depth_score) as avgDepth,
        AVG(communication_score) as avgComm,
        AVG(problem_solving_score) as avgProb
      FROM interview_exchanges
      WHERE session_id = ? AND overall_score > 0
    `).get(sessionId);

    db.prepare(`
      UPDATE interview_sessions
      SET overall_score = ?,
          clarity_avg = ?,
          relevance_avg = ?,
          depth_avg = ?,
          communication_avg = ?,
          problem_solving_avg = ?
      WHERE id = ?
    `).run(
      avgStats.avgOverall || 0,
      avgStats.avgClarity || 0,
      avgStats.avgRelevance || 0,
      avgStats.avgDepth || 0,
      avgStats.avgComm || 0,
      avgStats.avgProb || 0,
      sessionId
    );

    const nextIndex = latestExchange.question_index + 1;
    const isComplete = nextIndex >= session.question_count;

    let nextQuestion = null;
    if (!isComplete) {
      // Fetch all covered questions so far to avoid repetition
      const covered = db.prepare(`
        SELECT question_text FROM interview_exchanges WHERE session_id = ?
      `).all(sessionId).map(r => r.question_text);

      nextQuestion = await generateAdaptiveQuestion({
        role: session.role,
        difficulty: session.difficulty,
        interviewType: session.interview_type,
        previousQuestion: latestExchange.question_text,
        previousScore: evaluation.overall,
        questionIndex: nextIndex,
        coveredCategories: covered
      });

      // Insert new exchange row for next question
      db.prepare(`
        INSERT INTO interview_exchanges (
          session_id, question_index, question_text, question_type, difficulty_level
        ) VALUES (?, ?, ?, ?, ?)
      `).run(sessionId, nextIndex, nextQuestion.question, nextQuestion.type || 'Technical', nextQuestion.difficulty || session.difficulty);
    } else {
      // Mark session completed
      db.prepare(`
        UPDATE interview_sessions 
        SET status = 'completed', completed_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(sessionId);
    }

    res.json({
      evaluation,
      nextQuestion,
      isComplete,
      questionIndex: nextIndex,
      totalQuestions: session.question_count,
      currentSessionAverage: avgStats.avgOverall ? Math.round(avgStats.avgOverall * 10) / 10 : 0
    });
  } catch (err) {
    console.error('Error evaluating answer:', err);
    res.status(500).json({ error: 'Failed to evaluate answer', details: err.message });
  }
});

/**
 * POST /api/interview/:sessionId/end
 * Ends the interview session early or marks completed
 */
interviewRouter.post('/:sessionId/end', (req, res) => {
  try {
    const { sessionId } = req.params;
    db.prepare(`
      UPDATE interview_sessions 
      SET status = 'completed', completed_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(sessionId);

    const session = db.prepare('SELECT * FROM interview_sessions WHERE id = ?').get(sessionId);
    const exchanges = db.prepare('SELECT * FROM interview_exchanges WHERE session_id = ? ORDER BY question_index ASC').all(sessionId);

    res.json({ session, exchanges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to end session' });
  }
});

/**
 * GET /api/interview/:sessionId
 * Retrieves full interview report and transcript
 */
interviewRouter.get('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = db.prepare('SELECT * FROM interview_sessions WHERE id = ?').get(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const exchanges = db.prepare('SELECT * FROM interview_exchanges WHERE session_id = ? ORDER BY question_index ASC').all(sessionId);
    res.json({ session, exchanges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session details' });
  }
});
