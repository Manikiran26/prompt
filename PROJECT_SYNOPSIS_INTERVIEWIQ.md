SCSE4041 – Prompt Engineering Mini Project (Milestone 2 Supporting Document)
# Project Synopsis: InterviewIQ Adaptive AI Interview Coach
Problem Pool ID: C18 – Adaptive AI Interview Coach & Resume Vetting Framework | Team: PE-B49-55

---

| Project Title: | InterviewIQ: An Adaptive Technical Interview Coach and Resume Simulator with Multi-Rubric Zero-Cheat Evaluation |
| :--- | :--- |
| **Team ID & Batch:** | PE-B49-55 \| Batch B49–64 |
| **Faculty Name:** | Dr. Ankit Vijay Bansal |
| **Team Members:** | Manikiran Reddy (S24CSEU1985), S24CSEU1346, S24CSEU0565, S24CSEU2860, S24CSEU0529, S24CSEU1980 |
| **Live Web App:** | https://github.com/Manikiran26/prompt (Local: http://localhost:3001) |
| **GitHub Repository:** | https://github.com/Manikiran26/prompt |
| **Video Demo:** | https://youtu.be/1SCWbHGUUCo |

---

## 1. Project Objectives
The primary objective of **InterviewIQ** is to build a systematic, automated technical interview simulation and candidate vetting framework tailored for software engineering candidates. The framework aims to: (1) empirically evaluate candidate responses using an objective, multi-dimensional scoring judge across 5 standardized rubrics (*Technical Correctness, Relevance, Clarity, Depth, and Problem-Solving*); (2) dynamically probe candidate technical depth through real-time adaptive questioning and deep-dive scenario generation directly anchored to extracted resume projects and skills; and (3) enforce zero-cheat defense mechanisms that strictly penalize prompt echoing, keyboard smashing, off-topic fluff, and factual misconceptions with 0.0 scores while preserving 100% responsiveness on genuine architectural explanations.

## 2. Scope & Problem Domain
InterviewIQ addresses the critical vulnerabilities and evaluation gaps of conventional mock interview platforms and unregulated conversational AI helpdesks (which suffer from severe grade inflation, prompt parroting vulnerability, and static, repetitive question banks). The scope encompasses four standardized testing and vetting categories: (a) **Normal In-Scope Queries** (system architecture, distributed consensus, data structures, concurrency, caching, and database ACID properties); (b) **Out-of-Scope Requests** (personal conversational fluff, non-technical hobbies, and brief incomplete fragments); (c) **Adversarial Prompt Injections** (prompt echoing / copy-pasting the question prompt directly into the answer box, appending UI placeholder labels 'Your Response', and deceptive keyword stuffing without contextual explanation); and (d) **Malformed Edge Cases** (keyboard smashing `lk,;l,;l,;l`, honest boundary admissions 'I don't know', contradictory parameters, and explicit factual contradictions).

## 3. Technical Methodology
InterviewIQ implements an end-to-end 4-stage empirical methodology:
* **Phase 1: Test Suite Management & Execution:** Curates and persists candidate profile parameters and parses binary PDF or TXT resumes on the server using multi-layer fallback extractors. The dynamic Question Synthesis Engine dispatches user prompts across Google Gemini (gemini-2.5-flash) or OpenAI (gpt-4o-mini).
* **Phase 2: Multi-Criteria Intelligent Evaluation:** An impartial AI evaluation judge assesses raw candidate answers against 5 standardized criteria: *Role Adherence / Technical Correctness, Scope & Relevance, Depth of Explanation, Communication Clarity, and Refusal / Edge-Case Quality*. It dynamically detects missing architectural concepts and synthesizes an exemplary high-scoring response (`strongerAnswer`) for candidate learning.
* **Phase 3: Visual Audit & Performance Analytics:** Computes cumulative session averages, category strengths/weaknesses, and 5-axis competence radar charts rendered via interactive Canvas and CSS dashboards.
* **Phase 4: Automated Self-Healing Prompt Hardening:** Ingests empirical failure logs and applies defense-in-depth prompt engineering: (1) Immutable Instruction Hierarchy, (2) Explicit Domain Whitelisting, (3) Substring & Lexical Overlap Anti-Echo Formula (strictly 0.0/10 for prompt copying), (4) Dynamic SQLite Non-Repetition Filter, and (5) Node.js native `vm` sandboxed execution for live coding challenges.

## 4. Expected Outcome & Empirical Results
InterviewIQ proves concrete empirical evaluation reliability and anti-cheat enforcement across prompt iterations:
* **Baseline Prompt (V1):** Achieved only a **60.0% pass rate** (6 passed, 4 failed), completely failing against copy-pasted questions (awarded 8.3/10), off-topic fluff (awarded 4.5/10), and repeatedly served identical questions across sessions.
* **Hardened Prompt (V4):** Achieved a perfect **100.0% pass rate** (15 passed, 0 failed), successfully neutralizing all adversarial prompt echoing, keysmash inputs, and irrelevant fluff by awarding strictly 0.0/10, while maintaining calibrated high scores (8.5–9.5/10) on legitimate technical architecture answers (+40.0% net evaluation precision gain with zero question repetition).
* **Deliverables:** Delivered as a full-featured web application (Node.js 22+, Express, Native SQLite WAL, Vanilla JS/HTML/CSS) with automated PDF resume parsing, interactive coding sandbox, real-time analytics radar charts, and complete GitHub repository documentation.
