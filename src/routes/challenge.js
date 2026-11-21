import express from 'express';
import { db } from '../db.js';
import { evaluateAnswerIntelligently } from '../services/ai.js';

export const challengeRouter = express.Router();

/**
 * GET /api/challenge/today
 */
challengeRouter.get('/today', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    let challenge = db.prepare('SELECT * FROM daily_challenges WHERE date_str = ?').get(today);
    if (!challenge) {
      challenge = db.prepare('SELECT * FROM daily_challenges ORDER BY id DESC LIMIT 1').get();
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch challenge' });
  }
});

/**
 * POST /api/challenge/submit
 */
challengeRouter.post('/submit', async (req, res) => {
  try {
    const { challengeId, answer, userId = 1 } = req.body;
    const challenge = db.prepare('SELECT * FROM daily_challenges WHERE id = ?').get(challengeId);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    const evaluation = await evaluateAnswerIntelligently({
      question: challenge.question_text,
      userAnswer: answer,
      role: 'Software Engineer',
      difficulty: challenge.difficulty,
      interviewType: challenge.category
    });

    // Save participation
    db.prepare(`
      INSERT INTO daily_participations (user_id, challenge_id, user_answer, score, feedback)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      userId,
      challengeId,
      answer,
      evaluation.overall,
      evaluation.strongerAnswer || ''
    );

    // Get current streak
    const streakResult = db.prepare(`
      SELECT COUNT(DISTINCT date(completed_at)) as streak
      FROM daily_participations
      WHERE user_id = ?
    `).get(userId);

    res.json({
      evaluation,
      streak: streakResult.streak || 1
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit challenge' });
  }
});
