import { OpenAI } from 'openai';
import { OPENAI_API_KEY, OPENAI_BASE_URL } from '../config.js';

let customApiKey = '';
let customBaseUrl = '';

export function setCustomAiConfig(apiKey, baseUrl) {
  if (apiKey) customApiKey = apiKey;
  if (baseUrl) customBaseUrl = baseUrl;
}

export function getAiClient() {
  const key = customApiKey || OPENAI_API_KEY;
  const baseURL = customBaseUrl || OPENAI_BASE_URL;
  if (!key) return null;
  return new OpenAI({
    apiKey: key,
    baseURL: baseURL || undefined
  });
}

// Comprehensive Question Bank with Topic & Expected Concept Tags
export const QUESTION_REPOSITORY = {
  'Software Engineer': {
    Beginner: [
      {
        question: "Explain the difference between an Array and a Linked List. What are their respective time complexities for searching and inserting elements?",
        category: "Data Structures",
        type: "Technical",
        keyConcepts: ["contiguous memory", "pointers", "O(1) insert at head", "O(n) search", "cache locality", "dynamic size"],
        wrongConcepts: ["linked lists have O(1) random access", "arrays take more memory per node pointer", "linked list search is O(1)"]
      },
      {
        question: "What is the difference between synchronous and asynchronous code execution in programming? Give a real-world example.",
        category: "Core Concepts",
        type: "Technical",
        keyConcepts: ["blocking", "non-blocking", "event loop", "callbacks", "promises", "I/O operations", "concurrency"],
        wrongConcepts: ["asynchronous means multithreading only", "synchronous is always faster"]
      },
      {
        question: "Explain Git branching and merging. What is the difference between a Git merge and a Git rebase?",
        category: "Tools & Collaboration",
        type: "Technical",
        keyConcepts: ["linear history", "merge commit", "commit hash rewriting", "fast-forward", "conflict resolution"],
        wrongConcepts: ["rebase deletes commits permanently without trace", "merge is not recommended"]
      }
    ],
    Intermediate: [
      {
        question: "How does HTTP/2 improve over HTTP/1.1? Explain multiplexing, header compression (HPACK), and head-of-line blocking.",
        category: "Networking & Web",
        type: "Technical",
        keyConcepts: ["multiplexing", "single TCP connection", "binary framing", "HPACK", "head of line blocking at TCP layer", "server push"],
        wrongConcepts: ["HTTP/2 uses UDP", "HTTP/2 creates multiple TCP connections per asset", "HTTP/1.1 supported multiplexing"]
      },
      {
        question: "How would you design a URL shortener service (like bit.ly)? Discuss hash generation, collision resolution, database schema, and caching strategies.",
        category: "System Design",
        type: "Technical",
        keyConcepts: ["base62 encoding", "unique ID generator", "Snowflake", "MD5/SHA256 truncation with salt", "Redis cache", "read heavy ratio", "database indexing on short_code"],
        wrongConcepts: ["use simple incrementing integer in URL without encoding", "no database needed", "cache everything in RAM without eviction"]
      },
      {
        question: "Tell me about a time you encountered a severe production bug or memory leak. How did you diagnose, isolate, and remediate it?",
        category: "Debugging & Problem Solving",
        type: "Behavioral / Technical",
        keyConcepts: ["monitoring", "profiler", "heap dump", "APM logs", "reproduction", "rollback", "root cause analysis", "postmortem"],
        wrongConcepts: ["rebooting server permanently fixes memory leak", "ignoring logs"]
      }
    ],
    Advanced: [
      {
        question: "Design a distributed rate limiter that operates across multiple application server instances handling 100k requests per second. Compare Token Bucket, Leaky Bucket, and Sliding Window algorithms.",
        category: "Distributed Systems",
        type: "Technical",
        keyConcepts: ["token bucket", "sliding window log", "sliding window counter", "Redis lua script", "atomic operations", "eventual consistency", "race conditions", "network latency"],
        wrongConcepts: ["storing rate limits in local server memory only", "using locks across HTTP requests without Redis"]
      },
      {
        question: "Explain the CAP theorem and PACELC theorem. In a distributed key-value store like Cassandra or DynamoDB, how do you tune consistency levels for read/write trade-offs?",
        category: "Distributed Data",
        type: "Technical",
        keyConcepts: ["consistency", "availability", "partition tolerance", "latency", "quorum", "tunable consistency", "W + R > N", "vector clocks"],
        wrongConcepts: ["a system can provide CA during network partitions", "Cassandra is purely CP"]
      }
    ]
  },
  'Frontend Developer': {
    Beginner: [
      {
        question: "Explain the difference between CSS Flexbox and CSS Grid. When would you use one over the other for a responsive web layout?",
        category: "CSS & Layout",
        type: "Technical",
        keyConcepts: ["one-dimensional vs two-dimensional", "flex-direction", "grid-template-columns", "content-first vs layout-first", "responsiveness"],
        wrongConcepts: ["grid is deprecated", "flexbox cannot wrap", "grid cannot align items"]
      },
      {
        question: "What are semantic HTML tags, and why are they crucial for accessibility (a11y) and SEO?",
        category: "Web Fundamentals",
        type: "Technical",
        keyConcepts: ["screen readers", "nav", "article", "section", "main", "header", "ARIA roles", "SEO indexing"],
        wrongConcepts: ["using divs everywhere with CSS is identical for accessibility", "semantic tags are only for styling"]
      },
      {
        question: "Explain JavaScript closures. Can you provide a code example of where closures are useful in real frontend development?",
        category: "JavaScript Core",
        type: "Technical",
        keyConcepts: ["lexical scope", "outer function scope access", "data privacy", "state preservation", "callback functions", "memoization"],
        wrongConcepts: ["closures create global variables", "closure means a function has ended execution and deleted its variables"]
      }
    ],
    Intermediate: [
      {
        question: "How does React's Reconciliation process and Virtual DOM diffing algorithm work? What is the significance of the 'key' prop in lists?",
        category: "React Architecture",
        type: "Technical",
        keyConcepts: ["virtual DOM tree", "diffing O(n) heuristic", "fiber architecture", "key prop stability", "avoiding index as key with dynamic lists", "re-rendering"],
        wrongConcepts: ["virtual DOM is stored in browser local storage", "using array index as key is always recommended", "virtual DOM diffing compares every DOM element in O(n^3)"]
      },
      {
        question: "How do you optimize Core Web Vitals (LCP, INP/FID, CLS) on a heavy frontend application?",
        category: "Performance Optimization",
        type: "Technical",
        keyConcepts: ["Largest Contentful Paint", "Cumulative Layout Shift", "Interaction to Next Paint", "code splitting", "image optimization WebP", "lazy loading", "font-display swap", "aspect-ratio"],
        wrongConcepts: ["CLS measures CPU speed", "bundle size does not affect LCP", "inline all scripts in HTML head"]
      }
    ],
    Advanced: [
      {
        question: "Explain Micro-Frontends architecture. Compare Module Federation, iframe isolation, and build-time composition. What are the operational trade-offs?",
        category: "Frontend Architecture",
        type: "Technical",
        keyConcepts: ["Webpack Module Federation", "shared dependencies", "independent deployment", "CSS namespace collisions", "version skew", "runtime overhead"],
        wrongConcepts: ["micro-frontends always increase performance", "iframes allow seamless single-page navigation without cross-origin messaging"]
      }
    ]
  },
  'Backend Developer': {
    Beginner: [
      {
        question: "Explain the difference between SQL and NoSQL databases. When would you choose PostgreSQL versus MongoDB for a new project?",
        category: "Databases",
        type: "Technical",
        keyConcepts: ["relational vs document", "ACID compliance", "schema enforcement", "joins vs embedding", "vertical vs horizontal scaling"],
        wrongConcepts: ["NoSQL cannot handle transactions", "SQL databases cannot scale at all", "PostgreSQL is NoSQL"]
      },
      {
        question: "What is RESTful API design? Explain HTTP methods (GET, POST, PUT, PATCH, DELETE) and status code categories (2xx, 4xx, 5xx).",
        category: "API Design",
        type: "Technical",
        keyConcepts: ["idempotency", "PUT replaces vs PATCH updates", "statelessness", "resource URIs", "401 vs 403", "500 server error"],
        wrongConcepts: ["GET requests should modify database data", "POST is idempotent", "404 means server crashed"]
      }
    ],
    Intermediate: [
      {
        question: "How do database indexes (B-Tree vs Hash vs GIN) work? Why can having too many indexes degrade database write performance?",
        category: "Database Optimization",
        type: "Technical",
        keyConcepts: ["B-Tree balanced tree", "logarithmic search O(log N)", "composite index column order", "write penalty", "index page maintenance", "table bloat"],
        wrongConcepts: ["indexes make inserts and updates faster", "a database scans the whole table regardless of indexes"]
      },
      {
        question: "How do you implement secure user authentication and authorization? Compare session cookies with JWT tokens, including token invalidation strategies.",
        category: "Security",
        type: "Technical",
        keyConcepts: ["httpOnly cookies", "CSRF protection", "JWT statelessness", "token expiry", "refresh token rotation", "blacklist in Redis", "password hashing scrypt/bcrypt"],
        wrongConcepts: ["store plain JWT in localStorage without XSS protection", "store plain text passwords", "JWT tokens can be invalidated automatically without state"]
      }
    ],
    Advanced: [
      {
        question: "How would you handle eventual consistency in microservices using the Saga Pattern? Compare choreography-based vs orchestration-based Sagas with compensating transactions.",
        category: "Microservices Architecture",
        type: "Technical",
        keyConcepts: ["two-phase commit limitations", "choreography with event broker Kafka", "orchestrator state machine", "compensating actions", "idempotency", "outbox pattern"],
        wrongConcepts: ["Sagas provide immediate ACID isolation", "compensating transactions are never needed if an error occurs"]
      }
    ]
  },
  'Full Stack Developer': {
    Beginner: [
      {
        question: "Walk me through what happens under the hood when a user types 'https://example.com' into their browser and presses Enter.",
        category: "Full Stack Fundamentals",
        type: "Technical",
        keyConcepts: ["DNS resolution", "TCP 3-way handshake", "TLS negotiation", "HTTP GET request", "server routing", "HTML parsing", "DOM tree", "render tree"],
        wrongConcepts: ["browser immediately paints page without DNS", "TLS handshake happens before TCP connection"]
      }
    ],
    Intermediate: [
      {
        question: "How do you structure an end-to-end real-time notification system using WebSockets or Server-Sent Events (SSE)? Compare both technologies.",
        category: "Real-Time Architecture",
        type: "Technical",
        keyConcepts: ["bidirectional vs unidirectional", "HTTP upgrade", "heartbeats/ping-pong", "connection pooling", "Redis Pub/Sub for horizontal scaling", "reconnection backoff"],
        wrongConcepts: ["SSE supports binary uploads from client to server", "WebSockets use standard HTTP polling on every message"]
      }
    ],
    Advanced: [
      {
        question: "Design an end-to-end file upload pipeline for multi-gigabyte video files with progress tracking, resumable uploads, asynchronous transcoding, and CDN caching.",
        category: "Full Stack System Design",
        type: "Technical",
        keyConcepts: ["presigned S3 URLs", "multipart chunked upload", "tus protocol", "message queue SQS/RabbitMQ", "worker nodes FFmpeg", "HLS streaming", "CloudFront caching"],
        wrongConcepts: ["buffer entire 5GB video in Node.js server RAM before writing to disk", "upload directly through single monolithic HTTP request"]
      }
    ]
  },
  'Java Developer': {
    Beginner: [
      {
        question: "Explain the difference between JVM, JRE, and JDK. How does Java achieve platform independence ('Write Once, Run Anywhere')?",
        category: "Java Core",
        type: "Technical",
        keyConcepts: ["bytecode .class files", "Java Virtual Machine", "JIT compiler", "platform specific JVMs", "garbage collection"],
        wrongConcepts: ["bytecode is machine code directly executed by CPU", "Java requires recompilation on every operating system"]
      },
      {
        question: "Explain the difference between '==' and '.equals()' in Java. Why is it important to override hashCode() when overriding equals()?",
        category: "Java Core",
        type: "Technical",
        keyConcepts: ["reference equality vs value equality", "String pool", "HashMap contract", "hash bucket distribution", "collisions"],
        wrongConcepts: ["== always compares object values", "hashCode does not affect HashMap lookups"]
      }
    ],
    Intermediate: [
      {
        question: "How does Garbage Collection work in the JVM (Generational GC)? Explain Eden, Survivor, and Tenured spaces, and compare G1GC with ZGC.",
        category: "JVM Internals",
        type: "Technical",
        keyConcepts: ["weak generational hypothesis", "Eden space", "Survivor S0/S1", "Old/Tenured generation", "Stop-the-World pauses", "G1GC region based", "ZGC concurrent colored pointers"],
        wrongConcepts: ["System.gc() guarantees immediate full garbage collection", "objects are placed directly into Old generation always"]
      },
      {
        question: "Explain Spring Boot's Dependency Injection and Inversion of Control (IoC). Compare @Component, @Service, and @Repository annotations.",
        category: "Spring Framework",
        type: "Technical",
        keyConcepts: ["IoC container", "ApplicationContext", "bean lifecycle", "constructor injection vs field injection", "persistence exception translation", "singleton scope default"],
        wrongConcepts: ["field injection is recommended over constructor injection", "beans are recreated on every method call by default"]
      }
    ],
    Advanced: [
      {
        question: "Explain Java Concurrency: Thread Pools, ExecutorService, volatile keyword, and synchronized vs ReentrantLock. How do Virtual Threads (Project Loom in Java 21) change high-throughput I/O?",
        category: "Java Concurrency",
        type: "Technical",
        keyConcepts: ["memory visibility", "CPU cache coherency", "lock striping", "optimistic locking StampedLock", "carrier threads", "mounting/unmounting virtual threads on blocking I/O"],
        wrongConcepts: ["volatile makes compound operations like i++ atomic", "virtual threads are designed for CPU-intensive calculation"]
      }
    ]
  },
  'Data Analyst': {
    Beginner: [
      {
        question: "Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN in SQL with examples.",
        category: "SQL Queries",
        type: "Technical",
        keyConcepts: ["matching keys", "NULL handling", "cartesian product caution", "primary key foreign key relationships"],
        wrongConcepts: ["INNER JOIN returns all rows from left table regardless of match", "LEFT JOIN excludes matching rows"]
      },
      {
        question: "What is the difference between Mean, Median, and Mode? When is the Median a better measure of central tendency than the Mean?",
        category: "Statistics",
        type: "Technical",
        keyConcepts: ["skewed distributions", "outliers", "salary distribution example", "bell curve symmetry"],
        wrongConcepts: ["mean is always the best metric", "outliers do not affect the mean"]
      }
    ],
    Intermediate: [
      {
        question: "Explain SQL Window Functions (ROW_NUMBER(), RANK(), DENSE_RANK(), and LEAD()/LAG()). How do they differ from GROUP BY?",
        category: "Advanced SQL",
        type: "Technical",
        keyConcepts: ["PARTITION BY", "ORDER BY within window", "preserving row count vs aggregating", "gaps in rank vs dense_rank", "calculating running totals"],
        wrongConcepts: ["window functions collapse rows into a single summary row", "RANK() never skips numbers on duplicate values"]
      },
      {
        question: "How do you detect and handle missing data and outliers in a tabular dataset? Discuss imputation strategies and their trade-offs.",
        category: "Data Cleaning",
        type: "Technical",
        keyConcepts: ["MCAR vs MAR vs MNAR", "mean/median imputation", "KNN imputation", "IQR method (1.5 * IQR)", "Z-score threshold", "domain knowledge"],
        wrongConcepts: ["always drop every row with any missing value", "replace all missing values with 0 unconditionally"]
      }
    ],
    Advanced: [
      {
        question: "Explain Cohort Analysis and Churn Prediction modeling. What metrics (CAC, LTV, Retention rate) would you present to executive stakeholders to drive product retention?",
        category: "Business Analytics",
        type: "Technical",
        keyConcepts: ["cohort retention curves", "Customer Acquisition Cost", "Lifetime Value ratio LTV:CAC", "cohort segmentation by acquisition date", "funnel drop-offs", "actionable insights"],
        wrongConcepts: ["churn is simply 100 minus conversion rate", "LTV:CAC ratio should ideally be less than 1:1"]
      }
    ]
  },
  'HR / Behavioral': {
    All: [
      {
        question: "Tell me about a challenging project or conflict you worked through with a colleague or manager. How did you resolve it?",
        category: "Conflict Resolution & Collaboration",
        type: "Behavioral",
        keyConcepts: ["STAR method", "situation", "task", "action taken", "measurable result", "active listening", "compromise", "empathy"],
        wrongConcepts: ["blaming coworkers completely", "refusing to compromise"]
      },
      {
        question: "Where do you see yourself in 3 to 5 years, and how does this role align with your long-term career aspirations?",
        category: "Career Goals & Motivation",
        type: "HR",
        keyConcepts: ["continuous learning", "mentorship", "technical leadership", "impact on company mission", "realistic progression"],
        wrongConcepts: ["saying you want the interviewer's job aggressively", "saying you only care about the salary"]
      },
      {
        question: "Describe a time when you missed a deadline or made a critical mistake on a task. How did you communicate it and what was the outcome?",
        category: "Accountability",
        type: "Behavioral",
        keyConcepts: ["ownership", "early communication", "mitigation plan", "learning from failure", "preventative measures"],
        wrongConcepts: ["hiding the mistake until discovered", "claiming you have never made any mistakes"]
      }
    ]
  }
};

// Fallback questions for custom roles
export function getQuestionsForRole(role, difficulty = 'Intermediate', interviewType = 'Technical Interview') {
  let roleBank = QUESTION_REPOSITORY[role];

  // Map common role aliases
  if (!roleBank) {
    if (role.toLowerCase().includes('front')) roleBank = QUESTION_REPOSITORY['Frontend Developer'];
    else if (role.toLowerCase().includes('back')) roleBank = QUESTION_REPOSITORY['Backend Developer'];
    else if (role.toLowerCase().includes('full') || role.toLowerCase().includes('stack')) roleBank = QUESTION_REPOSITORY['Full Stack Developer'];
    else if (role.toLowerCase().includes('java')) roleBank = QUESTION_REPOSITORY['Java Developer'];
    else if (role.toLowerCase().includes('data') || role.toLowerCase().includes('analyst')) roleBank = QUESTION_REPOSITORY['Data Analyst'];
    else roleBank = QUESTION_REPOSITORY['Software Engineer'];
  }

  if (interviewType === 'HR Interview' || interviewType === 'Behavioral Interview') {
    return QUESTION_REPOSITORY['HR / Behavioral'].All;
  }

  const diffQuestions = roleBank[difficulty] || roleBank['Intermediate'] || roleBank['Beginner'] || [];
  if (interviewType === 'Mixed Interview') {
    return [...diffQuestions, ...QUESTION_REPOSITORY['HR / Behavioral'].All];
  }
  return diffQuestions;
}

function isGibberishOrNonsense(text) {
  const clean = (text || '').trim();
  if (clean.length < 5) return true;

  // Extract alphabetical words
  const words = clean.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (words.length === 0) return true;

  // Extract alphabetical characters
  const letters = clean.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 4) return true;

  // Check vowel ratio in alphabetical characters (English words are 30-50% vowels)
  const vowels = letters.match(/[aeiouyAEIOUY]/g) || [];
  const vowelRatio = vowels.length / letters.length;
  if (vowelRatio < 0.15 && letters.length >= 5) return true;

  // Check for repeated character runs like "aaaaa" or "zzzzz"
  if (/(.)\1{4,}/i.test(clean)) return true;

  // Check for common keyboard smashing patterns
  if (/^[asdfghjklqwertyuiopzxcvbnm\s,.;:!?-]+$/i.test(clean) && vowelRatio < 0.18 && letters.length >= 6) {
    return true;
  }

  // Common vocabulary check
  const commonWords = new Set([
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this',
    'but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what',
    'so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know',
    'take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come',
    'its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because',
    'any','these','give','day','most','us','is','are','was','were','has','had','been','data','system','code','query','server',
    'react','http','web','api','sql','database','index','cache','memory','thread','method','function','class','protocol','network'
  ]);

  const recognizedWordCount = words.filter(w => commonWords.has(w.toLowerCase())).length;
  if (recognizedWordCount === 0 && words.length <= 4) {
    return true;
  }

  return false;
}

/**
 * Detects if the user simply copied/pasted the question (or question + UI text)
 * without providing an actual substantive answer.
 */
export function isQuestionEchoOrParrot(question, answer) {
  const rawQ = (question || '').trim().toLowerCase();
  const rawA = (answer || '').trim().toLowerCase();
  if (!rawQ || !rawA) return false;

  const normalize = (str) =>
    (str || '')
      .toLowerCase()
      .replace(/\b(your response|my response|question \d+|answer|response|q\d+|q:?|a:?)\b/gi, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const normQ = normalize(rawQ);
  const normA = normalize(rawA);

  if (!normA) return true;
  if (normQ === normA) return true;

  // 1. Answer contains the entire normalized question
  if (normA.includes(normQ)) {
    const remainder = normA.replace(normQ, '').trim();
    const remWords = remainder.split(/\s+/).filter(Boolean);
    // If the non-question part is 8 words or fewer, it's just an echo with UI/filler words
    if (remWords.length <= 8) return true;
  }

  // 2. Question contains the entire normalized answer (user copied part of the question)
  if (normQ.includes(normA) && normA.length >= 12) {
    return true;
  }

  // 3. Word-level containment and novel words analysis
  const qWords = normQ.split(/\s+/).filter(w => w.length > 2);
  const aWords = normA.split(/\s+/).filter(w => w.length > 2);

  if (aWords.length > 0 && qWords.length > 0) {
    const qWordSet = new Set(qWords);
    const nonQWords = aWords.filter(w => !qWordSet.has(w));
    const overlapRatio = (aWords.length - nonQWords.length) / aWords.length;

    // High overlap and very few non-question words
    if (overlapRatio >= 0.70 && nonQWords.length <= 6) return true;
    if (overlapRatio >= 0.85 && nonQWords.length <= 10) return true;
  }

  return false;
}

/**
 * Intelligent Concept-Aware Semantic Evaluator
 * Evaluates the answer against the specific question's core concepts.
 * Detects wrong answers, nonsense, "I don't know", and incorrect statements.
 */
export async function evaluateAnswerIntelligently({ question, userAnswer, role, difficulty, interviewType }) {
  const openai = getAiClient();
  const trimmed = (userAnswer || '').trim();

  // 1. Check for gibberish, keysmash, random punctuation (e.g. "lk,;l,;l,;l", "asdfasdf")
  if (isGibberishOrNonsense(trimmed)) {
    return {
      clarity: 0.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 0.0,
      problemSolving: 0.0,
      overall: 0.0,
      strengths: ["None. The submitted response consists of random characters, symbols, or keyboard smashing."],
      missingConcepts: ["A complete, meaningful answer addressing the question was not provided."],
      incorrectConcepts: [`Invalid gibberish input detected: "${trimmed}". This does not contain any recognizable explanation or concepts.`],
      improvements: [
        "Please provide a genuine, coherent answer in full sentences.",
        "Explain the core technical principles requested in the question."
      ],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Invalid answer detected (0.0/10). Re-asking a foundational question to ensure basic comprehension."
    };
  }

  // 2. Check for question copying/echoing (e.g. user pasted question or question + "Your Response")
  if (isQuestionEchoOrParrot(question, trimmed)) {
    return {
      clarity: 0.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 0.0,
      problemSolving: 0.0,
      overall: 0.0,
      strengths: ["None. The submitted response merely copies or repeats the question prompt."],
      missingConcepts: ["You echoed the prompt instead of providing an actual technical explanation or solution."],
      incorrectConcepts: [`Question Echo Detected: The submitted response repeats the question prompt ("${trimmed.slice(0, 80)}...") without answering it.`],
      improvements: [
        "Do not copy or paste the question text into the response box.",
        "Provide a substantive technical explanation answering the core principles, mechanisms, and trade-offs."
      ],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Question echoed back without an answer (0.0/10). Re-asking a foundational question to gauge comprehension."
    };
  }

  // 3. Check for empty or trivial answers (< 10 chars)
  if (trimmed.length < 10) {
    return {
      clarity: 0.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 0.0,
      problemSolving: 0.0,
      overall: 0.0,
      strengths: ["None."],
      missingConcepts: ["Answer was too short to convey any meaning."],
      incorrectConcepts: ["Incomplete response."],
      improvements: ["Type a full explanation addressing the question."],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Answer was too short (0.0/10). Re-calibrating."
    };
  }

  // 4. Check for common evasive or "I don't know" answers
  const isIdk = /^(i don'?t know|no idea|skip|not sure|pass|na|none|idk|dont know)\.?$/i.test(trimmed);
  if (isIdk) {
    return {
      clarity: 1.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 1.0,
      problemSolving: 0.0,
      overall: 0.4,
      strengths: ["Honest acknowledgement of knowledge boundary."],
      missingConcepts: ["Core technical concept knowledge was not demonstrated."],
      incorrectConcepts: ["No attempt to formulate a technical answer."],
      improvements: [
        "In interviews, when you do not know the exact answer, explain your reasoning process or relate it to a similar concept you know.",
        "Break down the problem from first principles."
      ],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Pivoting to a simpler foundational concept to evaluate basic principles."
    };
  }

  // 4. Try real OpenAI evaluation if client is configured
  if (openai) {
    try {
      const prompt = `
You are an expert technical interviewer assessing a candidate for a ${role} position (${difficulty} level, ${interviewType}).

Question asked:
"${question}"

Candidate's Answer:
"${trimmed}"

Evaluate the candidate's answer strictly and fairly using the 10-point rubric:
1. Technical Correctness (0-10)
2. Relevance to Question (0-10)
3. Clarity and Structure (0-10)
4. Depth of Explanation (0-10)
5. Problem-Solving / Practical Approach (0-10)

IMPORTANT CRITICAL RULES:
- If the candidate merely copies, repeats, echoes, or paraphrases the question prompt (or just appends placeholder phrases like "Your response"), give STRICTLY 0.0 across all dimensions (overall: 0.0, correctness: 0.0, relevance: 0.0, depth: 0.0, clarity: 0.0, problemSolving: 0.0)!
- If the answer is completely off-topic or irrelevant (e.g. talking about food, movies, or unrelated topics), give 0.0 for Relevance, Correctness, and Overall = 0.0!
- If the answer is factually WRONG or claims incorrect things, give low scores (1.0-3.0) in Technical Correctness and Relevance!
- Do NOT inflate scores for length alone or for repeating the prompt's own keywords without explaining them.

Return ONLY a valid JSON object matching this schema:
{
  "clarity": number (0-10, one decimal),
  "relevance": number (0-10, one decimal),
  "depth": number (0-10, one decimal),
  "communication": number (0-10, one decimal),
  "problemSolving": number (0-10, one decimal),
  "overall": number (0-10, average rounded to 1 decimal),
  "strengths": ["bullet 1", "bullet 2"],
  "missingConcepts": ["concept 1", "concept 2"],
  "incorrectConcepts": ["specifically what was wrong or inaccurate"],
  "improvements": ["actionable advice 1", "actionable advice 2"],
  "strongerAnswer": "A concise example of an outstanding answer to this question",
  "adaptiveHint": "Reasoning for what kind of question should be asked next"
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3
      });

      const parsed = JSON.parse(response.choices[0].message.content);
      if (parsed.overall !== undefined && parsed.strengths) {
        return parsed;
      }
    } catch (apiErr) {
      console.warn('OpenAI API call failed, activating Semantic Concept Validator:', apiErr.message);
    }
  }

  // 5. High-Precision Semantic Concept Validator (Zero-Dummy Engine)
  return performSemanticConceptValidation(question, trimmed, role, difficulty);
}

/**
 * Semantic Concept & Misconception Validator
 * Evaluates semantic content, detects incorrect claims, and scores accurately.
 */
function performSemanticConceptValidation(question, answer, role, difficulty) {
  // Check if answer is an echo or copy of the question
  if (isQuestionEchoOrParrot(question, answer)) {
    return {
      clarity: 0.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 0.0,
      problemSolving: 0.0,
      overall: 0.0,
      strengths: ["None. The submitted response merely copies or repeats the question prompt."],
      missingConcepts: ["You echoed the prompt instead of providing an actual technical explanation or solution."],
      incorrectConcepts: [`Question Echo Detected: The submitted response repeats the question prompt without answering it.`],
      improvements: [
        "Do not copy or paste the question into the response box.",
        "Provide a direct technical explanation addressing the core principles, architecture, and trade-offs."
      ],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Question echoed back without an answer (0.0/10). Re-asking a foundational question to gauge comprehension."
    };
  }

  const lowerAnswer = answer.toLowerCase();
  const lowerQuestion = question.toLowerCase();
  const answerWords = answer.trim().split(/\s+/).filter(Boolean);

  // Stop words for novel content analysis
  const stopWords = new Set([
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this',
    'but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what',
    'so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know',
    'take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come',
    'its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because',
    'any','these','give','day','most','us','is','are','was','were','has','had','been','response','question','answer'
  ]);

  const qWordSet = new Set(
    lowerQuestion.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2)
  );

  const novelWords = answerWords.filter(w => {
    const clean = w.toLowerCase().replace(/[^\w]/g, '');
    return clean.length > 2 && !qWordSet.has(clean) && !stopWords.has(clean);
  });

  // Find the exact or highest-overlap matching question in QUESTION_REPOSITORY
  let bestMatchItem = null;
  let bestMatchScore = 0;
  const qTerms = lowerQuestion.split(/[\s,?.!]+/).filter(w => w.length > 3);

  for (const r of Object.keys(QUESTION_REPOSITORY)) {
    const categories = QUESTION_REPOSITORY[r];
    for (const d of Object.keys(categories)) {
      const qList = categories[d];
      if (Array.isArray(qList)) {
        for (const item of qList) {
          const itemLower = item.question.toLowerCase();
          if (itemLower === lowerQuestion) {
            bestMatchItem = item;
            bestMatchScore = 999;
            break;
          }
          // Compute word overlap
          let overlap = 0;
          qTerms.forEach(t => {
            if (itemLower.includes(t)) overlap++;
          });
          if (overlap > bestMatchScore) {
            bestMatchScore = overlap;
            bestMatchItem = item;
          }
        }
      }
      if (bestMatchScore === 999) break;
    }
    if (bestMatchScore === 999) break;
  }

  const allConcepts = bestMatchItem ? (bestMatchItem.keyConcepts || []) : [];
  const wrongConceptsList = bestMatchItem ? (bestMatchItem.wrongConcepts || []) : [];

  // Match key concepts:
  // Must demonstrate genuine knowledge, not merely parrot words already present in the prompt
  const matchedConcepts = [];
  allConcepts.forEach(c => {
    const cLower = c.toLowerCase();
    // 1. Direct multi-word phrase match
    if (cLower.split(/\s+/).length > 1 && lowerAnswer.includes(cLower)) {
      if (!lowerQuestion.includes(cLower) || novelWords.length >= 10) {
        matchedConcepts.push(c);
        return;
      }
    }
    // 2. Significant keywords of the concept that were NOT in the question
    const conceptTokens = cLower.split(/[\s/]+/).filter(w => w.length > 2 && !stopWords.has(w));
    const nonQConceptTokens = conceptTokens.filter(t => !qWordSet.has(t));

    if (nonQConceptTokens.length > 0) {
      // Must match at least one significant non-question token from the concept
      const hasMatch = nonQConceptTokens.some(t => new RegExp(`\\b${t}\\b`, 'i').test(lowerAnswer));
      if (hasMatch) {
        matchedConcepts.push(c);
      }
    } else {
      // All tokens of the concept were in the question, so candidate must use them in novel context
      const allTokensMatch = conceptTokens.every(t => new RegExp(`\\b${t}\\b`, 'i').test(lowerAnswer));
      if (allTokensMatch && novelWords.length >= 12) {
        matchedConcepts.push(c);
      }
    }
  });

  // Check detected wrong concepts with phrase or pattern matching
  const detectedWrongConcepts = [];
  wrongConceptsList.forEach(wc => {
    const cleanedWc = wc.toLowerCase().replace(/[()]/g, '');
    const wcWords = cleanedWc.split(/\s+/).filter(w => w.length > 2);
    if (wcWords.length >= 2) {
      const phraseRegex = new RegExp(wcWords.join('\\s+(?:[\\w]+\\s+)?'), 'i');
      if (phraseRegex.test(lowerAnswer)) {
        detectedWrongConcepts.push(wc);
      }
    }
  });

  // Check relevance to question keywords
  const relevantQuestionKeywords = qTerms.filter(t => lowerAnswer.includes(t));
  const questionRelevanceRatio = qTerms.length > 0 ? (relevantQuestionKeywords.length / qTerms.length) : 0.5;

  // Check for nonsense, gibberish, or completely off-topic response
  const hasNonsense = /(asdf|qwer|blah|dummy|test test|cheese|cats|pizza|nothing|whatever|lol|haha|random)/i.test(lowerAnswer);
  const isOffTopic = questionRelevanceRatio < 0.15 && matchedConcepts.length === 0;

  let correctness = 5.0;
  let relevance = 5.0;
  let depth = 4.0;
  let clarity = 5.0;
  let problemSolving = 4.0;

  if (hasNonsense || isOffTopic || novelWords.length < 4) {
    // Answer is completely off-topic, nonsense, or has virtually no novel words
    correctness = 0.0;
    relevance = 0.0;
    depth = 0.0;
    clarity = 0.0;
    problemSolving = 0.0;
  } else if (novelWords.length < 10) {
    // Extremely thin / repeating prompt with minimal addition
    correctness = 1.0;
    relevance = 1.5;
    depth = 0.5;
    clarity = 2.0;
    problemSolving = 1.0;
  } else if (detectedWrongConcepts.length > 0) {
    // Answer contains explicit factual errors
    correctness = Math.max(1.0, 3.0 - detectedWrongConcepts.length);
    relevance = Math.max(1.5, 2.5 + questionRelevanceRatio * 2.5);
    depth = Math.max(1.0, 2.0 + (matchedConcepts.length / Math.max(1, allConcepts.length)) * 2.5);
    problemSolving = 1.5;
  } else {
    // Normal technical answer evaluation
    const conceptRatio = allConcepts.length > 0 ? (matchedConcepts.length / allConcepts.length) : (novelWords.length / 30);

    if ((conceptRatio >= 0.5 || matchedConcepts.length >= 3) && novelWords.length >= 25) {
      // Strong to exceptional answer
      correctness = Math.min(9.5, 6.5 + conceptRatio * 3.0);
      relevance = Math.min(9.5, 7.0 + questionRelevanceRatio * 2.5);
      depth = Math.min(9.0, 6.0 + conceptRatio * 2.5 + (answerWords.length > 60 ? 1.0 : 0));
      problemSolving = Math.min(9.5, 6.5 + conceptRatio * 3.0);
      clarity = 7.5;
    } else if ((conceptRatio >= 0.25 || matchedConcepts.length >= 1) && novelWords.length >= 15) {
      // Moderate answer
      correctness = Math.min(6.5, 4.5 + conceptRatio * 2.0);
      relevance = Math.min(6.5, 4.5 + questionRelevanceRatio * 2.0);
      depth = Math.min(6.0, 3.5 + (answerWords.length > 40 ? 1.0 : 0));
      problemSolving = 4.5;
      clarity = 6.0;
    } else {
      // Weak answer with minimal conceptual depth or novel vocabulary
      correctness = Math.min(3.5, 1.5 + (novelWords.length / 10));
      relevance = Math.min(3.5, 1.5 + (novelWords.length / 10));
      depth = 2.0;
      problemSolving = 2.0;
      clarity = 4.0;
    }
  }

  const hasStructure = /\b(first|second|moreover|furthermore|for example|in contrast|specifically|trade-off|because|however|in summary)\b/i.test(lowerAnswer);
  if (hasStructure && correctness > 3.0) clarity += 1.0;

  const clamp = v => Math.max(0.0, Math.min(10.0, Math.round(v * 10) / 10));
  correctness = clamp(correctness);
  relevance = clamp(relevance);
  depth = clamp(depth);
  clarity = (relevance === 0.0 && correctness === 0.0) ? 0.0 : clamp(clarity);
  problemSolving = clamp(problemSolving);

  const overall = Math.round(((correctness + relevance + depth + clarity + problemSolving) / 5) * 10) / 10;

  // Build strengths and improvements
  const strengths = [];
  const missing = [];
  const improvements = [];

  if (overall === 0.0 || correctness === 0.0) {
    strengths.push("None. The submitted response did not provide an acceptable technical explanation.");
    missing.push("A substantive, original technical answer explaining the mechanisms requested.");
    improvements.push("Do not repeat or copy the question. Provide a direct, detailed answer explaining the underlying principles.");
  } else {
    if (correctness >= 7.0) {
      strengths.push("Accurately identified essential technical principles and trade-offs.");
    }
    if (matchedConcepts.length > 0) {
      strengths.push(`Addressed core technical areas: ${matchedConcepts.slice(0, 4).join(', ')}.`);
    }
    if (hasStructure) {
      strengths.push("Well-structured delivery with logical flow.");
    }
    if (strengths.length === 0) {
      strengths.push("Attempted to respond to the prompt.");
    }

    const missingItems = allConcepts.filter(c => !matchedConcepts.includes(c));
    if (missingItems.length > 0) {
      missing.push(...missingItems.slice(0, 3).map(m => `Elaborate on ${m}`));
    } else if (answerWords.length < 50) {
      missing.push("Provide deeper production examples and operational failure modes.");
    }

    if (detectedWrongConcepts.length > 0) {
      improvements.push(`Correct factual error: Note that "${detectedWrongConcepts[0]}" is incorrect.`);
    }
    if (correctness < 4.0) {
      improvements.push("Directly answer the question asked without going off-topic or guessing.");
      improvements.push("Focus on the fundamental definitions and structural differences.");
    } else if (depth < 6.0) {
      improvements.push("Incorporate real-world production trade-offs, scalability numbers, and latency considerations.");
    }
    if (!hasStructure) {
      improvements.push("Structure your responses with clear signposts ('First...', 'In contrast...', 'In production, we handled this by...').");
    }
  }

  // Adaptive Hint
  let adaptiveHint = '';
  if (overall >= 7.5) {
    adaptiveHint = `Strong response (${overall}/10). Scaling up difficulty to test architectural edge cases and optimization under pressure.`;
  } else if (overall >= 4.5) {
    adaptiveHint = `Partially correct response (${overall}/10). Asking a clarifying follow-up to test specific trade-offs and missing nuances.`;
  } else {
    adaptiveHint = `Critical gaps identified (${overall}/10). Pivoting to foundational concepts to re-calibrate assessment.`;
  }

  return {
    clarity,
    relevance,
    depth,
    communication: clarity,
    problemSolving: correctness,
    overall,
    strengths,
    missingConcepts: missing.length ? missing : ["Provide more concrete metrics and failure recovery details."],
    incorrectConcepts: detectedWrongConcepts,
    improvements,
    strongerAnswer: generateStrongerAnswerTemplate(question, matchedConcepts, allConcepts),
    adaptiveHint
  };
}

function generateStrongerAnswerTemplate(question, matched, allConcepts) {
  const missingList = allConcepts.filter(c => !matched.includes(c));
  if (missingList.length > 0) {
    return `An exceptional answer clearly defines the core principles, highlights trade-offs, and explicitly covers: ${missingList.join(', ')}. Include concrete metrics (such as latency or scale numbers) from your hands-on experience.`;
  }
  return `A high-scoring response clearly contrasts the alternatives, outlines performance implications (CPU, memory, I/O), and provides a concrete real-world production example showing how you handled edge cases.`;
}

/**
 * Dynamic Adaptive Follow-up Question Generator
 * Generates the next question based on the candidate's previous score and covered topics.
 */
export async function generateAdaptiveQuestion({ role, difficulty, interviewType, previousQuestion, previousScore, questionIndex, coveredCategories = [] }) {
  const openai = getAiClient();

  if (openai) {
    try {
      const prompt = `
You are an expert AI interviewer conducting a ${interviewType} for a ${role} (${difficulty} level).
The interview is currently at question #${questionIndex + 1}.

Previous Question: "${previousQuestion}"
Candidate's Previous Overall Score: ${previousScore} / 10.0
Topics already covered: ${coveredCategories.join(', ') || 'None yet'}

ADAPTIVE RULE:
- If previous score >= 7.5: Escalate complexity, ask an advanced deep-dive or architectural follow-up.
- If previous score is 4.0 - 7.4: Ask a clarifying follow-up probing the specific trade-offs or missing aspects of the previous answer.
- If previous score < 4.0: Pivot to a fundamental concept to verify core knowledge without discouraging the candidate.
- Never repeat previous questions.

Return ONLY a valid JSON object:
{
  "question": "The next adaptive question string",
  "category": "Topic Category",
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "type": "Technical" | "Behavioral" | "Situational"
}
`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.5
      });

      const parsed = JSON.parse(response.choices[0].message.content);
      if (parsed.question) {
        return parsed;
      }
    } catch (e) {
      console.warn('OpenAI adaptive question failed, using dynamic repository selection:', e.message);
    }
  }

  // Dynamic Repository-Based Adaptive Selector
  const questions = getQuestionsForRole(role, difficulty, interviewType);
  // Pick an unused question that matches the adaptive direction
  let targetDiff = difficulty;
  if (previousScore >= 8.0) targetDiff = 'Advanced';
  else if (previousScore < 5.0) targetDiff = 'Beginner';

  const roleBank = QUESTION_REPOSITORY[role] || QUESTION_REPOSITORY['Software Engineer'];
  const candidates = roleBank[targetDiff] || questions;
  const filtered = candidates.filter(q => q.question !== previousQuestion);
  const picked = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : questions[0];

  return {
    question: picked.question,
    category: picked.category || 'Core Competency',
    difficulty: targetDiff,
    type: picked.type || 'Technical'
  };
}
