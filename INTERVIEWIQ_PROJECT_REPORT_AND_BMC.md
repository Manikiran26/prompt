# InterviewIQ – Adaptive AI Interview Coach
## Comprehensive Technical Project Report & Business Model Canvas (BMC)

---

# PART 1: COMPLETE TECHNICAL PROJECT REPORT

## 1. Executive Summary & Problem Statement

### 1.1 Executive Summary
**InterviewIQ** is an enterprise-grade, adaptive AI interview preparation and assessment platform designed to bridge the gap between candidate preparation and real-world hiring standards. Unlike traditional interview preparation platforms that rely on static, predetermined question banks and generic conversational bots, InterviewIQ simulates realistic technical, behavioral, and resume-based interviews with real-time adaptive questioning, multidimensional rubric scoring, lexical accuracy verification, and live coding sandboxes.

### 1.2 Problem Statement
Job seekers and university students frequently struggle during technical and behavioral interviews due to three critical flaws in existing preparation methods:
1. **Static & Predictable Questioning**: Candidates memorize static question lists which fail to prepare them for dynamic interviewer drill-downs.
2. **Superficial Feedback**: Generic AI chatbots judge answers purely by length, offering vague praise and inflated scores (e.g., scoring random or incorrect answers 4/5) without pinpointing specific technical misconceptions.
3. **Disconnection from Real Resumes**: Mock interviews do not vet candidates on their actual projects, architectures, and technologies listed on their resumes.

### 1.3 Project Objectives
- Build an interactive, real-time interview simulator supporting technical, HR, behavioral, and resume-based interviews across multiple domains.
- Formulate a 10-point multidimensional evaluation engine assessing Technical Correctness, Relevance, Clarity, Depth, and Problem-Solving.
- Implement an adaptive questioning engine where follow-up questions dynamically scale in difficulty or probe identified weaknesses.
- Integrate an automated resume parser (PDF/TXT) that extracts skills and projects to formulate deep-dive architectural interview questions.
- Provide database-driven analytics tracking candidate mastery, competency radars, and longitudinal progression.

---

## 2. System Architecture & Data Flow

### 2.1 High-Level Architecture
InterviewIQ follows a decoupled, modular client-server architecture built on Node.js 24 and Express, backed by local ACID-compliant native SQLite storage and OpenAI GPT-4o-mini with local semantic fallback validation.

```
+------------------------------------------------------------------------------------+
|                                FRONTEND CLIENT (SPA)                               |
|  - Modern Linear/Notion UI      - Interactive Interview Room with Timer & Voice    |
|  - Real-Time Chart.js Visuals   - Resume Drag-and-Drop Parser & Code Sandbox       |
+------------------------------------------+-----------------------------------------+
                                           | REST JSON / File Streams
                                           v
+------------------------------------------------------------------------------------+
|                                EXPRESS BACKEND SERVER                              |
|  - Auth & Profile (/api/auth)             - Session Lifecycle Engine (/api/interview)
|  - Multi-Layer PDF Parser (/api/resume)   - Aggregated Analytics (/api/dashboard)   |
|  - Sandboxed Code Evaluator (/api/coding) - Daily Challenge & Streaks (/api/chal)  |
+---------------------+------------------------------------+-------------------------+
                      |                                    |
                      v                                    v
+---------------------------------------+  +-----------------------------------------+
|        AI & EVALUATION PIPELINE       |  |           PERSISTENT STORAGE            |
|  - OpenAI GPT-4o-mini (JSON Schema)   |  |  - Native SQLite (node:sqlite WAL mode) |
|  - 10-Point Concept & Rubric Engine   |  |  - Tables: users, sessions, exchanges,  |
|  - Lexical Entropy & Gibberish Filter |  |            resumes, challenges, coding   |
+---------------------------------------+  +-----------------------------------------+
```

### 2.2 Interview Session Lifecycle Flow
1. **Configuration**: Candidate chooses Role (e.g. Software Engineer, Backend, Java, Custom), Type (Technical, HR, Behavioral, Resume, Mixed), and Difficulty.
2. **Session Launch**: Backend writes a new record to `interview_sessions` in SQLite and dispenses Question 1.
3. **Answering & Input**: Candidate submits their response via structured text editor or live voice dictation.
4. **Lexical & Semantic Evaluation**:
   - **Gibberish Filter**: Non-words and keyboard smashing (e.g. `lk,;l,;l,;l`) are strictly awarded **0.0 / 10.0**.
   - **Misconception Checker**: Factually incorrect assertions (e.g. *"SQL cannot scale"*) are flagged in an explicit alerts banner.
   - **10-Point Scoring**: Evaluated on Correctness, Relevance, Depth, Clarity, and Communication.
5. **Adaptive Follow-Up Generation**:
   - High score ($\ge 7.5$): Scales to architectural trade-offs and edge cases.
   - Moderate score ($4.5 - 7.4$): Drills into missing nuances and trade-offs.
   - Low score ($< 4.5$): Pivots to foundational concepts.
6. **Persistence & Reports**: Every exchange is written to `interview_exchanges` and aggregated into the candidate's longitudinal dashboard.

---

## 3. Technology Stack & Tools Used

| Layer | Tool / Technology | Version / Spec | Purpose in Project |
| :--- | :--- | :--- | :--- |
| **Runtime** | Node.js | v24.19.0 | High-performance asynchronous JavaScript server runtime. |
| **Backend Framework** | Express.js | ^4.19.2 | Modular REST API routing, JSON body parsing, and static file serving. |
| **Database** | `node:sqlite` (DatabaseSync) | Native Node 24 | Built-in zero-dependency SQLite database with Write-Ahead Logging (WAL) and ACID guarantees. |
| **AI LLM Engine** | OpenAI API | GPT-4o-mini | Primary generative AI for question generation, semantic evaluations, and follow-up formulation. |
| **Document Processing**| `pdf-parse` & Buffer streams | ^2.4.5 | Server-side PDF binary parsing and text stream extraction for resume analysis. |
| **Speech Processing** | Web Speech API | Native Browser | Client-side real-time speech-to-text dictation in the interview room. |
| **Visualization** | Chart.js | v4 (via CDN) | Interactive longitudinal score progression (Line Chart) and competency mastery (Radar Chart). |
| **Code Execution** | `node:vm` | Native Node | Isolated JavaScript sandboxed evaluation for coding interview challenges with execution timeouts. |
| **Security** | `node:crypto` | Native Node | Salted password hashing (`scryptSync`) and crypto session token generation. |
| **Frontend Styling** | Custom CSS3 Custom Props | Modern CSS | Linear/Notion-inspired dark navy UI (`#090d16`), glassmorphism, responsive CSS grid, score animations. |

---

## 4. Database Schema & Data Models

InterviewIQ stores persistent data across 8 normalized tables in SQLite (`data/interviewiq.db`):
- `users`: Candidate credentials and timestamps.
- `user_profiles`: Educational background, technical skills array, and career goals.
- `interview_sessions`: Master session records, role, difficulty, duration, question count, and running rubric averages.
- `interview_exchanges`: Question text, submitted answer, 5 rubric dimension scores, overall score, strengths list, missing concepts, incorrect concepts, model answer, and adaptive hint.
- `resumes`: Raw text, parsed technical skills array, extracted projects, and upload date.
- `daily_challenges`: Daily interview questions, category, and target difficulty.
- `daily_participations`: Candidate daily challenge answers, scores, and streak tracking.
- `coding_challenges`: Algorithmic problems, starter code, test cases, and time/space complexity targets.

---

## 5. Core Modules & Implementation Details

### 5.1 Dynamic AI Interview Engine
- Supports **7 Roles**: Software Engineer, Frontend Developer, Backend Developer, Full Stack Developer, Java Developer, Data Analyst, and Custom Job Roles.
- Supports **5 Interview Types**: Technical, HR, Behavioral, Resume-Based, and Mixed.
- Supports **3 Difficulties**: Beginner, Intermediate, and Advanced.
- Active countdown timer with visual warning when under 3 minutes.
- Live progress indicator showing percentage of session completed.

### 5.2 Multidimensional 10-Point Evaluation Engine
Evaluates every response on 5 distinct dimensions:
1. **Technical Correctness (0–10)**: Accuracy of concepts, definitions, algorithms, and mechanisms.
2. **Relevance to Question (0–10)**: How directly the answer addresses the exact prompt.
3. **Clarity & Structure (0–10)**: Organization, readability, and signposting.
4. **Depth of Explanation (0–10)**: Coverage of trade-offs, scalability, and concrete architectural nuances.
5. **Problem-Solving / Practical Delivery (0–10)**: Real-world engineering trade-offs and operational experience.

### 5.3 Dynamic Adaptive Questioning
The next question is generated dynamically based on candidate performance:
- **Score ≥ 7.5**: AI escalates difficulty, probing architectural trade-offs, failure recovery, or concurrency.
- **Score 4.5 – 7.4**: AI asks a targeted clarifying follow-up directly addressing the missing concept from the previous answer.
- **Score < 4.5**: AI pivots to foundational concepts to re-calibrate without discouraging the candidate.

### 5.4 Lexical Entropy & Gibberish Filtering
To prevent artificial score inflation (where random typing previously scored 1.8 to 4.0):
- Mathematical vowel-to-consonant ratio inspection ($< 0.15$ flagged as keysmashing).
- Keyboard row sequence detection (`asdf`, `qwerty`, `lk,;l,;l,;l`).
- Any invalid input is immediately scored **0.0 / 10.0**, displaying an explicit red warning banner:
  > *"Invalid / Gibberish Input (0.0/10): No recognizable technical concepts provided."*

### 5.5 Resume-Based Deep Dives
- Candidate drops their PDF resume.
- Backend converts base64 binary to Uint8Array, extracts text via `pdf-parse` (with stream regex fallback).
- Automatically catalogs candidate technical stack (e.g. *React, Node.js, Python, PostgreSQL, Docker, AWS*) and project descriptions.
- Generates 5 tailored project vetting questions:
  - Architecture decisions and why specific technologies were selected.
  - Scalability bottlenecks and production edge cases faced.
  - How they would redesign the system today for 10x throughput.

### 5.6 Real-Time Dashboard & Analytics
- Live SQLite aggregate queries for:
  - Total completed interviews.
  - Average score and personal best.
  - Daily challenge streak counter.
- Interactive Chart.js visualizations:
  - **Progression Line Chart**: Longitudinal score trends across sessions.
  - **Competency Radar Chart**: Balance across Correctness, Relevance, Clarity, Depth, and Communication.

### 5.7 Coding Sandbox Mode
- Candidate receives algorithmic challenges (e.g. *Two Sum*, *Valid Palindrome*).
- Code editor with syntax styling.
- Isolated test runner using Node's native `vm` module enforcing strict execution timeouts (1500ms) to safely guard against infinite loops and prototype pollution.

---

## 6. Testing, Verification & Results

| Test Scenario | Input Submitted | Expected Output | Actual System Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Keyboard Smashing** | `lk,;l,;l,;l` | Strictly 0.0/10, flag as gibberish | Score: **0.0/10**, Red warning badge displayed | **PASSED** |
| **Factually Wrong Claim** | *"SQL cannot scale at all and PostgreSQL is a NoSQL database."* | Low score, flag explicit misconceptions | Score: **3.3/10**, Alert: `Misconception: SQL databases cannot scale at all` | **PASSED** |
| **High-Quality Technical Answer** | Thorough explanation of HTTP/2 multiplexing, HPACK, and HOL blocking | High score (8.0–9.5), detailed strengths | Score: **8.6/10**, Correctness: 9.5, Strengths highlighted | **PASSED** |
| **PDF Resume Upload** | Binary PDF resume file | Extract skills & projects, launch interview | Skills: `['React', 'Node.js', 'PostgreSQL', 'AWS']`, 5 project questions generated | **PASSED** |
| **Coding Sandbox Execution** | Correct Two Sum algorithm | All test cases pass | `"✓ All 3 test cases passed! Great job!"` | **PASSED** |
| **Database Persistence** | Page refresh during session | Session data preserved | Reloads session state cleanly from SQLite | **PASSED** |

---

# PART 2: BUSINESS MODEL CANVAS (BMC)

```
+------------------------------------------------------------------------------------------------------------------------------------+
|                                                  INTERVIEWIQ BUSINESS MODEL CANVAS                                                 |
+------------------------------------+------------------------------------+------------------------------------+---------------------+
| KEY PARTNERS                       | KEY ACTIVITIES                     | VALUE PROPOSITIONS                 | CUSTOMER            |
|                                    | - Adaptive AI Prompt Tuning        | - Realistic Multi-Role Interviews  | RELATIONSHIPS       |
| - University Career Placement Cells| - Resume Parser & Question Engine  | - Real-time Adaptive Follow-ups    | - Self-Serve SaaS   |
| - Coding Bootcamps & EdTech Cos    | - Coding Sandbox Maintenance       | - Strict 10-Point Rubric Feedback  | - Automated Coaching|
| - Tech Recruitment Agencies        | - Platform Scaling & Security      | - PDF Resume Project Deep Dives    | - Community Discord |
| - Cloud & LLM Providers (OpenAI)   +------------------------------------+ - Quantifiable Skill Progress      +---------------------+
| - Tech Influencers & Creators      | KEY RESOURCES                      | - Zero Fake/Inflated Scoring       | CHANNELS            |
|                                    | - Proprietary AI Prompt Catalog    |                                    | - Web App (SEO)     |
|                                    | - Native SQLite & Node Architecture|                                    | - Campus Roadshows  |
|                                    | - Question & Rubric Repository     |                                    | - LinkedIn Content  |
|                                    | - Candidate History Database       |                                    | - GitHub & Dev.to   |
+------------------------------------+------------------------------------+------------------------------------+---------------------+
| COST STRUCTURE                                                          | REVENUE STREAMS                                          |
| - Cloud Server Hosting & Compute (AWS/Railway/Vercel)                   | - Freemium Tier: Free daily challenge & 3 mock sessions  |
| - LLM API Token Consumption (OpenAI GPT-4o-mini)                        | - Pro Monthly/Annual Subscription ($19/mo or $149/yr)    |
| - Domain, SSL & Infrastructure Maintenance                              | - University / Bootcamp B2B Institutional Licenses       |
| - Continuous Engineering & Feature Development                          | - Enterprise Recruitment Pre-Screening Assessments       |
| - Marketing & Community Acquisition                                     | - Pay-Per-Interview Resume Deep Dive Credits ($4.99/pack)|
+-------------------------------------------------------------------------+----------------------------------------------------------+
```

### Detailed Breakdown of the 9 Blocks:

1. **Customer Segments**:
   - **University Students**: Final-year CS and engineering students preparing for campus placements and internships.
   - **Career Switchers**: Bootcamp graduates and self-taught developers transitioning into tech who need realistic interview practice.
   - **Experienced Engineers**: Mid/Senior developers targeting tier-1 tech companies for system design and architecture.
   - **Institutional Clients (B2B)**: Colleges and bootcamps wanting to benchmark student placement readiness.

2. **Value Propositions**:
   - **Adaptive Dynamic Follow-ups**: AI listens to your answer and dynamically drills deeper into weak points or escalates difficulty.
   - **No Inflated Scoring**: Strictly rejects gibberish (0.0/10) and flags exact factual misconceptions.
   - **Resume-Driven Project Vetting**: Asks questions on your actual projects rather than generic flashcards.
   - **Complete Preparation Suite**: Conceptual technical questions, STAR behavioral evaluator, voice interview mode, and a coding sandbox.

3. **Channels**:
   - Direct web application with high SEO rankings on tech interview topics.
   - College campus placements and student club ambassador programs.
   - Partnerships with coding bootcamps as their default interview preparation module.
   - Social proof and viral sharing of completion reports on LinkedIn.

4. **Customer Relationships**:
   - Automated, 24/7 self-serve practice with zero scheduling friction.
   - Data-driven feedback loops via longitudinal progress charts.
   - Peer community engagement on Discord for sharing interview questions and solutions.

5. **Revenue Streams**:
   - **B2C Subscriptions**: Free tier (3 interviews) -> Pro tier ($19/mo or $149/yr) for unlimited interviews, resume deep dives, and PDF reports.
   - **B2B Campus Licensing**: Annual institutional contracts ($10–$25 per student seat/year).
   - **Enterprise Screening Add-on**: Pay-per-candidate pre-screening assessments for hiring teams.

6. **Key Resources**:
   - Proprietary 10-point evaluation prompts and misconception detection heuristics.
   - Native SQLite database holding session histories, exchanges, and question repositories.
   - Sandboxed execution engine for safe candidate code compilation.

7. **Key Activities**:
   - Continuous LLM prompt calibration and schema validation.
   - Maintenance of sandboxed coding environments and PDF parsing pipelines.
   - Adding new interview roles (Cloud, AI/ML, DevOps, Cybersecurity).

8. **Key Partnerships**:
   - University placement cells and college career centers.
   - EdTech academies and coding bootcamps.
   - OpenAI and cloud providers for startup infrastructure credits.
   - Tech recruiters & hiring managers providing continuous feedback on industry rubrics.

9. **Cost Structure**:
   - LLM API inference costs (optimized via GPT-4o-mini).
   - Server hosting, domain registration, and SSL certificates.
   - Continuous software development and platform maintenance.
   - Customer acquisition and campus outreach marketing.
