import fs from 'node:fs';
import path from 'node:path';

// Load .env automatically if it exists using Node's built-in loader
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath) && process.loadEnvFile) {
  try {
    process.loadEnvFile(envPath);
  } catch (err) {
    console.warn('Could not load .env file:', err.message);
  }
}

export const PORT = parseInt(process.env.PORT, 10) || 3001;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || undefined;
export const JWT_SECRET = process.env.JWT_SECRET || 'interviewiq-jwt-secret-key-2026';
