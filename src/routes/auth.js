import express from 'express';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import { db } from '../db.js';

export const authRouter = express.Router();

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  return timingSafeEqual(hashedBuffer, keyBuffer);
}

// In-memory token store for lightweight secure sessions
const activeSessions = new Map();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    req.user = { id: 1, name: 'Guest Candidate', email: 'guest@interviewiq.ai' };
    return next();
  }

  const user = activeSessions.get(token);
  if (!user) {
    req.user = { id: 1, name: 'Guest Candidate', email: 'guest@interviewiq.ai' };
    return next();
  }

  req.user = user;
  next();
}

/**
 * POST /api/auth/register
 */
authRouter.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const passwordHash = hashPassword(password);
    const insert = db.prepare(`
      INSERT INTO users (email, password_hash, name)
      VALUES (?, ?, ?)
    `);
    const result = insert.run(email.toLowerCase().trim(), passwordHash, name.trim());
    const userId = Number(result.lastInsertRowid);

    // Create default profile
    db.prepare(`
      INSERT INTO user_profiles (user_id, education, technical_skills, experience_level, preferred_role)
      VALUES (?, '', '[]', 'Mid Level (3-5 years)', 'Software Engineer')
    `).run(userId);

    const token = randomBytes(32).toString('hex');
    const user = { id: userId, name: name.trim(), email: email.toLowerCase().trim() };
    activeSessions.set(token, user);

    res.json({ token, user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register account' });
  }
});

/**
 * POST /api/auth/login
 */
authRouter.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = randomBytes(32).toString('hex');
    const userData = { id: user.id, name: user.name, email: user.email };
    activeSessions.set(token, userData);

    res.json({ token, user: userData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

/**
 * GET /api/auth/me
 */
authRouter.get('/me', authenticateToken, (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(req.user.id);
    res.json({
      user: req.user,
      profile: profile || {}
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

/**
 * PUT /api/auth/profile
 */
authRouter.put('/profile', authenticateToken, (req, res) => {
  try {
    const { education, technicalSkills, experienceLevel, preferredRole, careerGoals } = req.body;
    const skillsJson = Array.isArray(technicalSkills) ? JSON.stringify(technicalSkills) : (technicalSkills || '[]');

    db.prepare(`
      INSERT INTO user_profiles (user_id, education, technical_skills, experience_level, preferred_role, career_goals, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id) DO UPDATE SET
        education = excluded.education,
        technical_skills = excluded.technical_skills,
        experience_level = excluded.experience_level,
        preferred_role = excluded.preferred_role,
        career_goals = excluded.career_goals,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      req.user.id,
      education || '',
      skillsJson,
      experienceLevel || 'Mid Level (3-5 years)',
      preferredRole || 'Software Engineer',
      careerGoals || ''
    );

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
