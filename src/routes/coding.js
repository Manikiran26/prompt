import express from 'express';
import vm from 'node:vm';
import { db } from '../db.js';

export const codingRouter = express.Router();

/**
 * GET /api/coding/challenges
 */
codingRouter.get('/challenges', (req, res) => {
  try {
    const challenges = db.prepare('SELECT * FROM coding_challenges').all();
    const formatted = challenges.map(c => ({
      ...c,
      testCases: JSON.parse(c.test_cases || '[]')
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

/**
 * POST /api/coding/run
 * Safely runs JavaScript code against test cases in an isolated node:vm context
 */
codingRouter.post('/run', (req, res) => {
  try {
    const { code, challengeId } = req.body;
    const challenge = db.prepare('SELECT * FROM coding_challenges WHERE id = ?').get(challengeId);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    const testCases = JSON.parse(challenge.test_cases || '[]');
    const results = [];
    let passedCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const sandbox = { console: { log: () => {} } };
      vm.createContext(sandbox);

      const runnerScript = `
        ${code}
        const funcName = Object.keys(this).find(k => typeof this[k] === 'function' && k !== 'funcName');
        if (!funcName) throw new Error('No solution function defined');
        const args = ${JSON.stringify(tc.input)};
        const output = this[funcName](...args);
        output;
      `;

      try {
        const output = vm.runInContext(runnerScript, sandbox, { timeout: 1500 });
        const passed = JSON.stringify(output) === JSON.stringify(tc.expected);
        if (passed) passedCount++;
        results.push({
          testCase: i + 1,
          passed,
          input: tc.input,
          expected: tc.expected,
          actual: output
        });
      } catch (execErr) {
        results.push({
          testCase: i + 1,
          passed: false,
          error: execErr.message
        });
      }
    }

    res.json({
      allPassed: passedCount === testCases.length,
      passedCount,
      totalCount: testCases.length,
      results
    });
  } catch (err) {
    res.status(500).json({ error: 'Execution failed', details: err.message });
  }
});
