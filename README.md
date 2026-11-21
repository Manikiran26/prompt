# InterviewIQ – Adaptive AI Interview Coach

> An enterprise-grade, adaptive AI interview preparation and assessment platform simulating realistic technical, behavioral, and resume-based vetting with real-time adaptive questioning, multidimensional 10-point rubric scoring, lexical accuracy verification, and live coding sandboxes.

[![Node.js](https://img.shields.io/badge/Node.js-v24.19.0-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-Native%20SQLite%20(WAL)-blue.svg)](https://nodejs.org/api/sqlite.html)
[![AI](https://img.shields.io/badge/AI-OpenAI%20GPT--4o--mini-purple.svg)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

---

## 🚀 Key Features

- 🎯 **Multi-Role & Domain Support**: Tailored interview simulations for 7 roles (Software Engineer, Frontend, Backend, Full Stack, Java, Data Analyst, Custom) across 5 interview types (Technical, Behavioral STAR, HR, Resume Deep-Dive, Mixed).
- 🧠 **Dynamic Adaptive Questioning**: Follow-up questions dynamically adapt based on candidate performance—scaling to architectural trade-offs for high performers ($\ge 7.5$), drilling into missing nuances ($4.5 - 7.4$), or pivoting to core concepts ($< 4.5$).
- 📊 **Strict 10-Point Multidimensional Rubric**: Objective scoring across 5 key dimensions:
  1. *Technical Correctness*
  2. *Relevance to Prompt*
  3. *Clarity & Organization*
  4. *Depth of Explanation*
  5. *Problem-Solving Delivery*
- 🛡️ **Lexical Entropy & Gibberish Filtering**: Mathematical vowel-to-consonant entropy inspection catches keyboard smashing (e.g. `lk,;l,;l,;l`) and awards strictly **0.0 / 10.0**, completely eliminating fake score inflation.
- 📄 **Resume AI Parsing & Cross-Examination**: Multi-layer binary PDF parsing extracts candidate tech stacks and project descriptions to formulate 5 customized architectural drill-down questions.
- 💻 **Isolated Coding Sandbox**: Node.js `node:vm` execution sandbox with a 1500ms safety timeout to safely test candidate algorithms against unit tests without risk of infinite loops.
- 🎙️ **Live Voice Mode & Countdown Timers**: Web Speech API real-time speech dictation and active interview room countdown timers.
- 📈 **Longitudinal Analytics & Mastery Radars**: SQLite-persisted analytics featuring Chart.js score progression trends, competency balance radar charts, and daily challenge streaks.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v24.19.0) | High-performance asynchronous JavaScript engine |
| **Backend Framework** | Express.js (^4.19.2) | Modular REST API routing, static delivery, body parsing |
| **Persistence** | `node:sqlite` (`DatabaseSync`) | Zero-dependency native SQLite database with Write-Ahead Logging (WAL) |
| **AI LLM Engine** | OpenAI API (GPT-4o-mini) | JSON schema-driven prompt engine with local semantic fallback validation |
| **Document Processing** | `pdf-parse` & Buffer streams | Server-side PDF binary extraction for resume vetting |
| **Speech Processing** | Web Speech API | Browser-native real-time speech-to-text dictation |
| **Visualization** | Chart.js (v4) | Interactive longitudinal progression and competency radar charts |
| **Code Execution** | `node:vm` | Secure JavaScript algorithmic challenge sandbox |
| **Security** | `node:crypto` | Salted password hashing (`scryptSync`) and crypto session tokens |

---

## 📦 Project Structure

```text
├── data/
│   └── interviewiq.db           # Auto-seeded SQLite database with WAL
├── public/
│   ├── index.html               # Modern Linear/Notion-inspired SPA client
│   ├── report.html              # Printable Technical Report & BMC page
│   ├── InterviewIQ_Complete_Project_Report_And_BMC.pdf
│   └── InterviewIQ_Complete_Project_Report_And_BMC.docx
├── src/
│   ├── config.js                # Port & dynamic environment loader
│   ├── db.js                    # Native SQLite schema & automatic seeder
│   ├── routes/
│   │   ├── auth.js              # Authentication & candidate profile endpoints
│   │   ├── challenge.js         # Daily coding & conceptual challenges
│   │   ├── coding.js            # Sandboxed algorithmic challenge runner
│   │   ├── dashboard.js         # SQLite-aggregated analytics & competency metrics
│   │   ├── history.js           # Session history & past evaluations
│   │   ├── interview.js         # Session lifecycle, answer evaluation & follow-ups
│   │   └── resume.js            # PDF resume parsing & project question generator
│   └── services/
│       └── ai.js                # 10-point evaluation engine, question banks, gibberish detector
├── INTERVIEWIQ_PROJECT_REPORT_AND_BMC.md    # Complete Technical Report & 9-Block BMC
├── INTERVIEWIQ_PROJECT_REPORT_AND_BMC.html  # Standalone HTML report
├── generate_documents.py        # Python automated DOCX & PDF compilation engine
├── package.json
└── server.js                    # Express application entrypoint
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher, v24 recommended)
- Optional: OpenAI API Key (or use custom keys in the in-app AI Config modal)

### 1. Clone the Repository
```bash
git clone https://github.com/Manikiran26/prompt.git
cd prompt
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```
The application will launch on **`http://localhost:3001`**.

---

## 📑 Technical Report & Business Model Canvas (BMC)

A complete project report and standard 9-block Business Model Canvas (covering Key Partners, Key Activities, Key Resources, Value Propositions, Customer Relationships, Channels, Customer Segments, Cost Structure, and Revenue Streams) is included:
- **PDF Version**: `InterviewIQ_Complete_Project_Report_And_BMC.pdf`
- **Word Version**: `InterviewIQ_Complete_Project_Report_And_BMC.docx`
- **Markdown Version**: `INTERVIEWIQ_PROJECT_REPORT_AND_BMC.md`
- **Interactive Web Report**: Accessible via `http://localhost:3001/report.html`

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
