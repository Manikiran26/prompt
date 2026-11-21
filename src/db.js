import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'interviewiq.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for optimal performance and safety
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INTEGER PRIMARY KEY,
      education TEXT DEFAULT '',
      technical_skills TEXT DEFAULT '[]',
      experience_level TEXT DEFAULT 'Entry Level (0-2 years)',
      preferred_role TEXT DEFAULT 'Software Engineer',
      career_goals TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS interview_sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      interview_type TEXT NOT NULL DEFAULT 'Technical Interview',
      difficulty TEXT NOT NULL DEFAULT 'Intermediate',
      duration_minutes INTEGER DEFAULT 15,
      question_count INTEGER DEFAULT 5,
      status TEXT DEFAULT 'in_progress',
      overall_score REAL DEFAULT 0,
      clarity_avg REAL DEFAULT 0,
      relevance_avg REAL DEFAULT 0,
      depth_avg REAL DEFAULT 0,
      communication_avg REAL DEFAULT 0,
      problem_solving_avg REAL DEFAULT 0,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS interview_exchanges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      question_index INTEGER NOT NULL,
      question_text TEXT NOT NULL,
      question_type TEXT DEFAULT 'Technical',
      difficulty_level TEXT DEFAULT 'Intermediate',
      user_answer TEXT DEFAULT '',
      clarity_score REAL DEFAULT 0,
      relevance_score REAL DEFAULT 0,
      depth_score REAL DEFAULT 0,
      communication_score REAL DEFAULT 0,
      problem_solving_score REAL DEFAULT 0,
      overall_score REAL DEFAULT 0,
      strengths TEXT DEFAULT '[]',
      missing_concepts TEXT DEFAULT '[]',
      incorrect_concepts TEXT DEFAULT '[]',
      improvements TEXT DEFAULT '[]',
      stronger_answer TEXT DEFAULT '',
      adaptive_reason TEXT DEFAULT '',
      star_breakdown TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES interview_sessions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      filename TEXT NOT NULL,
      raw_text TEXT NOT NULL,
      extracted_skills TEXT DEFAULT '[]',
      extracted_projects TEXT DEFAULT '[]',
      extracted_experience TEXT DEFAULT '',
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS daily_challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_str TEXT UNIQUE NOT NULL,
      question_text TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS daily_participations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      user_answer TEXT NOT NULL,
      score REAL DEFAULT 0,
      feedback TEXT DEFAULT '',
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (challenge_id) REFERENCES daily_challenges(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS coding_challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      description TEXT NOT NULL,
      starter_code TEXT NOT NULL,
      test_cases TEXT NOT NULL,
      expected_complexity TEXT DEFAULT 'O(n)'
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user ON interview_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_exchanges_session ON interview_exchanges(session_id);
    CREATE INDEX IF NOT EXISTS idx_daily_date ON daily_challenges(date_str);
  `);

  // Seed sample daily challenges and coding challenges if table is empty
  seedInitialData();
  console.log('Database initialized successfully with native SQLite at:', dbPath);
}

function seedInitialData() {
  // Ensure default candidate user exists for guest / initial sessions
  const userCount = db.prepare('SELECT count(*) as count FROM users WHERE id = 1').get();
  if (userCount.count === 0) {
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, password_hash, name)
      VALUES (1, 'candidate@interviewiq.ai', 'guest:hash', 'Candidate')
    `).run();

    db.prepare(`
      INSERT OR IGNORE INTO user_profiles (user_id, education, technical_skills, experience_level, preferred_role)
      VALUES (1, 'B.S. in Computer Science', '["JavaScript","React","Node.js","SQL"]', 'Mid Level (3-5 years)', 'Software Engineer')
    `).run();
  }

  const countStmt = db.prepare('SELECT count(*) as count FROM daily_challenges');
  const result = countStmt.get();
  if (result.count === 0) {
    const today = new Date().toISOString().split('T')[0];
    const insertDaily = db.prepare(`
      INSERT OR IGNORE INTO daily_challenges (date_str, question_text, category, difficulty)
      VALUES (?, ?, ?, ?)
    `);

    insertDaily.run(
      today,
      'Explain how database indexing works under the hood (e.g. B-Trees). When does an index actually degrade performance?',
      'Technical Interview',
      'Intermediate'
    );

    // Also seed a few dates around today
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    insertDaily.run(
      tomorrow,
      'Tell me about a time you made an architectural trade-off between consistency and latency. How did you validate your choice?',
      'Behavioral / System Design',
      'Advanced'
    );
  }

  const codeCountStmt = db.prepare('SELECT count(*) as count FROM coding_challenges');
  const codeResult = codeCountStmt.get();
  if (codeResult.count === 0) {
    const insertCode = db.prepare(`
      INSERT INTO coding_challenges (title, difficulty, description, starter_code, test_cases, expected_complexity)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertCode.run(
      'Two Sum Target Index',
      'Easy',
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.',
      `function twoSum(nums, target) {\n  // Your code here\n  \n}`,
      JSON.stringify([
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ]),
      'Time: O(n), Space: O(n)'
    );

    insertCode.run(
      'Valid Palindrome Alphanumeric',
      'Easy',
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
      `function isPalindrome(s) {\n  // Your code here\n  \n}`,
      JSON.stringify([
        { input: ['A man, a plan, a canal: Panama'], expected: true },
        { input: ['race a car'], expected: false },
        { input: [' '], expected: true }
      ]),
      'Time: O(n), Space: O(1)'
    );
  }
}
