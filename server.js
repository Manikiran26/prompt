import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PORT } from './src/config.js';
import { initDatabase } from './src/db.js';
import { authRouter } from './src/routes/auth.js';
import { interviewRouter } from './src/routes/interview.js';
import { dashboardRouter } from './src/routes/dashboard.js';
import { resumeRouter } from './src/routes/resume.js';
import { codingRouter } from './src/routes/coding.js';
import { challengeRouter } from './src/routes/challenge.js';
import { historyRouter } from './src/routes/history.js';

// Initialize SQLite database
initDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, 'public')));

// Mount Modular API Routes
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/coding', codingRouter);
app.use('/api/challenge', challengeRouter);
app.use('/api/history', historyRouter);

// Reset utility endpoint
app.post('/api/reset', (req, res) => {
  res.json({ ok: true });
});

// Direct Download Endpoints for Project Report & BMC
app.get('/api/download/pdf', (req, res) => {
  const file = join(__dirname, 'InterviewIQ_Complete_Project_Report_And_BMC.pdf');
  res.download(file, 'InterviewIQ_Complete_Project_Report_And_BMC.pdf');
});

app.get('/api/download/docx', (req, res) => {
  const file = join(__dirname, 'InterviewIQ_Complete_Project_Report_And_BMC.docx');
  res.download(file, 'InterviewIQ_Complete_Project_Report_And_BMC.docx');
});

app.get('/api/download/html', (req, res) => {
  const file = join(__dirname, 'INTERVIEWIQ_PROJECT_REPORT_AND_BMC.html');
  res.download(file, 'InterviewIQ_Complete_Project_Report_And_BMC.html');
});

app.get('/api/download/md', (req, res) => {
  const file = join(__dirname, 'INTERVIEWIQ_PROJECT_REPORT_AND_BMC.md');
  res.download(file, 'InterviewIQ_Complete_Project_Report_And_BMC.md');
});

app.listen(PORT, () => console.log(`InterviewIQ running on http://localhost:${PORT}`));
