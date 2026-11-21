import express from 'express';
import { db } from '../db.js';

export const historyRouter = express.Router();

/**
 * GET /api/history
 */
historyRouter.get('/', (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const sessions = db.prepare(`
      SELECT * FROM interview_sessions 
      WHERE user_id = ? 
      ORDER BY started_at DESC
    `).all(userId);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch interview history' });
  }
});

/**
 * GET /api/history/:sessionId
 */
historyRouter.get('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = db.prepare('SELECT * FROM interview_sessions WHERE id = ?').get(sessionId);
    if (!session) return res.status(404).json({ error: 'Interview session not found' });

    const exchanges = db.prepare(`
      SELECT * FROM interview_exchanges 
      WHERE session_id = ? 
      ORDER BY question_index ASC
    `).all(sessionId);

    res.json({ session, exchanges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load report' });
  }
});
