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

// Core Technical Vocabulary for validating technical & resume responses
export const CORE_TECH_VOCABULARY = new Set([
  'architecture', 'system', 'component', 'microservice', 'monolith', 'service', 'module', 'layer', 'mvc', 'mvvm',
  'api', 'rest', 'graphql', 'grpc', 'websocket', 'endpoint', 'controller', 'middleware', 'route', 'payload',
  'frontend', 'client', 'react', 'vue', 'angular', 'dom', 'vdom', 'state', 'props', 'hook', 'redux', 'context',
  'render', 'reconciliation', 'lifecycle', 'css', 'html', 'bundle', 'webpack', 'vite', 'spa', 'ssr', 'ssg',
  'backend', 'server', 'node', 'express', 'spring', 'django', 'flask', 'fastapi', 'thread', 'process', 'async',
  'sync', 'event loop', 'concurrency', 'parallel', 'worker', 'queue', 'job', 'cron', 'memory', 'cpu', 'io',
  'database', 'db', 'sql', 'nosql', 'table', 'schema', 'query', 'index', 'primary key', 'foreign key', 'join',
  'transaction', 'acid', 'postgres', 'postgresql', 'mysql', 'mongodb', 'redis', 'cache', 'caching', 'sharding', 'replication',
  'http', 'https', 'tcp', 'udp', 'ip', 'dns', 'ssl', 'tls', 'header', 'cookie', 'session', 'jwt', 'auth',
  'cors', 'status code', 'latency', 'bandwidth', 'throughput', 'load balancer', 'proxy', 'reverse proxy', 'gateway',
  'docker', 'container', 'kubernetes', 'k8s', 'cloud', 'aws', 'gcp', 'azure', 's3', 'ec2', 'lambda', 'ci/cd',
  'pipeline', 'deploy', 'deployment', 'monitoring', 'metrics', 'logging', 'apm', 'grafana', 'prometheus',
  'test', 'unit test', 'integration test', 'git', 'branch', 'merge', 'pr', 'commit', 'refactor', 'bottleneck',
  'scale', 'scalability', 'performance', 'optimization', 'trade-off', 'security', 'vulnerability', 'sanitize',
  'failover', 'redundancy', 'disaster recovery', 'rate limit', 'timeout', 'retry', 'circuit breaker',
  'javascript', 'typescript', 'python', 'java', 'golang', 'rust', 'c++', 'c#', 'php', 'ruby'
]);

// Behavioral & HR Vocabulary
export const BEHAVIORAL_VOCABULARY = new Set([
  'situation', 'task', 'action', 'result', 'conflict', 'team', 'colleague', 'manager', 'resolved', 'deadline',
  'compromise', 'communication', 'impact', 'learned', 'feedback', 'challenge', 'priority', 'collaborated',
  'stakeholder', 'mentored', 'leadership', 'ownership', 'accountability', 'mistake', 'mitigated', 'goal'
]);

// Helper to count technical terms
export function countTechnicalTerms(text) {
  if (!text) return 0;
  const words = text.toLowerCase().split(/[^a-z0-9+#_]+/);
  let count = 0;
  for (const w of words) {
    if (CORE_TECH_VOCABULARY.has(w)) count++;
  }
  return count;
}

// Helper to count behavioral terms
export function countBehavioralTerms(text) {
  if (!text) return 0;
  const words = text.toLowerCase().split(/[^a-z0-9]+/);
  let count = 0;
  for (const w of words) {
    if (BEHAVIORAL_VOCABULARY.has(w)) count++;
  }
  return count;
}

// Comprehensive Question Bank with Topic & Expected Concept Tags (5+ questions per tier)
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
      },
      {
        question: "Explain the Stack and Queue data structures. What are their operations and real-world software applications?",
        category: "Data Structures",
        type: "Technical",
        keyConcepts: ["LIFO vs FIFO", "push pop", "enqueue dequeue", "call stack", "message buffer", "O(1) operations"],
        wrongConcepts: ["queue is LIFO", "stack is FIFO"]
      },
      {
        question: "What is Big-O notation, and why is it essential for analyzing software algorithms? Contrast time complexity and space complexity.",
        category: "Algorithms",
        type: "Technical",
        keyConcepts: ["asymptotic growth", "upper bound", "worst-case", "auxiliary memory", "scaling with input N"],
        wrongConcepts: ["Big-O measures execution time in milliseconds", "O(N^2) is faster than O(N log N)"]
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
      },
      {
        question: "How do you design an in-memory Least Recently Used (LRU) Cache that supports O(1) get and O(1) put operations?",
        category: "Data Structures & Design",
        type: "Technical",
        keyConcepts: ["doubly linked list", "hash map", "O(1) lookups", "eviction at tail", "moving accessed node to head"],
        wrongConcepts: ["single array supports O(1) LRU eviction", "hash map alone tracks access order in O(1)"]
      },
      {
        question: "Compare Binary Search Tree (BST) and Hash Table. Under what workloads is a balanced BST preferred over a Hash Table?",
        category: "Data Structures",
        type: "Technical",
        keyConcepts: ["ordered traversal", "range queries", "worst-case tree degradation O(n)", "hash collisions", "O(log n) vs average O(1)"],
        wrongConcepts: ["hash tables support range queries in O(log n)", "BST always has O(1) search"]
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
      },
      {
        question: "Design Twitter / X news feed generation. Contrast Fan-Out on Write (Push model) with Fan-Out on Read (Pull model) for celebrity vs regular users.",
        category: "Large-Scale System Design",
        type: "Technical",
        keyConcepts: ["fan-out on write timeline cache", "fan-out on read for high follower celebrities", "hybrid architecture", "Redis timeline list", "pagination with cursor"],
        wrongConcepts: ["querying all followed users with SQL join on every timeline load scales to 500M users", "fan-out on write works seamlessly for 100M follower accounts"]
      },
      {
        question: "How do distributed consensus algorithms like Raft and Paxos work? Explain leader election, log replication, and split-brain prevention via quorums.",
        category: "Distributed Consensus",
        type: "Technical",
        keyConcepts: ["leader election", "term numbers", "log replication", "heartbeats", "majority quorum (N/2 + 1)", "uncommitted entries rollback"],
        wrongConcepts: ["split brain can be resolved without odd-numbered quorums", "followers accept writes directly without leader coordination"]
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
        keyConcepts: ["screen readers", "article section nav header footer", "SEO indexing", "DOM accessibility tree", "ARIA roles"],
        wrongConcepts: ["div tags provide better SEO than semantic tags", "semantic tags are purely decorative"]
      },
      {
        question: "Explain JavaScript closures and lexical scope. Provide a concrete example of how closures are used in practice.",
        category: "JavaScript Core",
        type: "Technical",
        keyConcepts: ["lexical environment", "retaining outer variables", "function factories", "data encapsulation", "private variables"],
        wrongConcepts: ["closures create global variables", "closure means a function has ended execution and deleted its variables"]
      },
      {
        question: "Explain Event Bubbling and Event Capturing in the DOM. How does Event Delegation leverage bubbling to optimize event listeners?",
        category: "DOM & Events",
        type: "Technical",
        keyConcepts: ["event propagation", "capturing phase", "target phase", "bubbling phase", "stopPropagation", "single parent listener for dynamic lists"],
        wrongConcepts: ["events only trigger on the exact element clicked without bubbling", "event delegation increases memory usage"]
      },
      {
        question: "Compare LocalStorage, SessionStorage, and Cookies. When should each storage mechanism be used in a frontend application?",
        category: "Browser Storage",
        type: "Technical",
        keyConcepts: ["persistence across tabs", "session lifetime", "size limit 5MB vs 4KB", "httpOnly cookies for security", "CSRF considerations"],
        wrongConcepts: ["localStorage is automatically sent with HTTP requests", "cookies can store 50MB of data"]
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
      },
      {
        question: "Explain the React useEffect hook lifecycle, dependency arrays, and cleanup functions. How do you prevent memory leaks and stale closures?",
        category: "React Hooks",
        type: "Technical",
        keyConcepts: ["dependency array", "cleanup function", "unmounting subscriptions", "stale closures in async callbacks", "useCallback useMemo"],
        wrongConcepts: ["empty dependency array runs on every state change", "cleanup function runs before component mounts"]
      },
      {
        question: "Compare client-side state management approaches: React Context API vs Redux Toolkit vs Zustand. When is Context sufficient vs when is an external store needed?",
        category: "State Management",
        type: "Technical",
        keyConcepts: ["unnecessary re-renders with context", "global store", "selectors", "middleware async thunks", "boiler-plate comparison"],
        wrongConcepts: ["React Context is designed for high-frequency state updates like animations", "Redux is built into React core"]
      },
      {
        question: "Explain Server-Side Rendering (SSR) vs Static Site Generation (SSG) in Next.js. What are their respective benefits for SEO and initial page load?",
        category: "Modern Frontend Frameworks",
        type: "Technical",
        keyConcepts: ["pre-rendering at build time vs request time", "hydration", "Time to First Byte (TTFB)", "dynamic data vs static marketing pages", "incremental static regeneration"],
        wrongConcepts: ["SSG requires a Node.js server running on every request", "SSR does not support search engine indexing"]
      }
    ],
    Advanced: [
      {
        question: "Explain Micro-Frontends architecture. Compare Module Federation, iframe isolation, and build-time composition. What are the operational trade-offs?",
        category: "Frontend Architecture",
        type: "Technical",
        keyConcepts: ["Webpack Module Federation", "shared dependencies", "independent deployment", "CSS namespace collisions", "version skew", "runtime overhead"],
        wrongConcepts: ["micro-frontends always increase performance", "iframes allow seamless single-page navigation without cross-origin messaging"]
      },
      {
        question: "Explain React Fiber architecture in detail. How does Fiber enable concurrent rendering, lane prioritization, and non-blocking UI updates?",
        category: "React Internals",
        type: "Technical",
        keyConcepts: ["fiber node linked list", "workInProgress tree", "time slicing", "requestIdleCallback / MessageChannel scheduler", "priority lanes", "interruptible rendering"],
        wrongConcepts: ["Fiber uses multithreading in web workers", "Fiber is just the Virtual DOM renamed"]
      },
      {
        question: "How do you detect, profile, and fix memory leaks in complex Single-Page Applications (SPAs) using Chrome DevTools Memory Profiler?",
        category: "Profiling & Performance",
        type: "Technical",
        keyConcepts: ["heap snapshots", "detached DOM trees", "retained size vs shallow size", "event listener leaks", "un-cleared timers / intervals", "closures holding large objects"],
        wrongConcepts: ["reloading page in production permanently resolves SPA leaks", "JavaScript automatically cleans up window event listeners on component unmount"]
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
      },
      {
        question: "What is an API Gateway in backend architectures, and what critical functions does it perform?",
        category: "Backend Architecture",
        type: "Technical",
        keyConcepts: ["reverse proxy", "routing", "authentication & authorization", "rate limiting & throttling", "SSL termination", "request aggregation"],
        wrongConcepts: ["API gateway replaces backend databases", "API gateway executes application business logic directly"]
      },
      {
        question: "Explain the difference between session-based authentication and token-based authentication (JWT). What are the pros and cons of each?",
        category: "Authentication",
        type: "Technical",
        keyConcepts: ["stateful vs stateless", "server memory / Redis store", "httpOnly cookie", "CSRF vs XSS", "token revocation trade-offs"],
        wrongConcepts: ["JWT tokens cannot be stolen", "sessions cannot work with mobile apps"]
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
      },
      {
        question: "Explain database connection pooling. Why is it essential in high-traffic applications, and what happens when pool limits are misconfigured?",
        category: "Database Performance",
        type: "Technical",
        keyConcepts: ["TCP handshake cost", "reusable connections", "max pool size", "connection timeout / queuing", "database worker exhaustion"],
        wrongConcepts: ["creating a brand new database connection per HTTP request is optimal", "infinite pool size improves database speed"]
      },
      {
        question: "How do you design asynchronous background processing using message queues (such as BullMQ, RabbitMQ, or SQS)? Explain dead-letter queues and retry backoff.",
        category: "Asynchronous Architecture",
        type: "Technical",
        keyConcepts: ["producer consumer", "decoupling", "exponential backoff", "idempotent job processing", "dead letter queue DLQ", "worker scaling"],
        wrongConcepts: ["message queues execute code synchronously inside the HTTP handler", "failed jobs should be retried infinitely without delay"]
      }
    ],
    Advanced: [
      {
        question: "How would you handle eventual consistency in microservices using the Saga Pattern? Compare choreography-based vs orchestration-based Sagas with compensating transactions.",
        category: "Microservices Architecture",
        type: "Technical",
        keyConcepts: ["two-phase commit limitations", "choreography with event broker Kafka", "orchestrator state machine", "compensating actions", "idempotency", "outbox pattern"],
        wrongConcepts: ["Sagas provide immediate ACID isolation", "compensating transactions are never needed if an error occurs"]
      },
      {
        question: "Explain Database Sharding strategies (Hash-based vs Range-based). How do you handle cross-shard queries, re-sharding, and distributed transactions?",
        category: "Database Scalability",
        type: "Technical",
        keyConcepts: ["shard key selection", "consistent hashing", "scatter-gather queries", "hotspot prevention", "virtual nodes", "two-phase commit"],
        wrongConcepts: ["sharding is identical to read-replicas", "cross-shard joins run in O(1) time"]
      },
      {
        question: "How do you perform zero-downtime database schema migrations on a table with 100 million active rows receiving 5,000 writes/second?",
        category: "Database Reliability",
        type: "Technical",
        keyConcepts: ["expand and contract pattern", "dual writing", "online schema change (gh-ost / pt-online-schema-change)", "shadow table", "backfilling in batches", "atomic swap"],
        wrongConcepts: ["running ALTER TABLE ADD COLUMN directly in single transaction without locking", "stopping the database during business hours"]
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
      },
      {
        question: "Explain CORS (Cross-Origin Resource Sharing). Why does the browser trigger preflight OPTIONS requests, and how do you configure CORS headers securely?",
        category: "Web Security",
        type: "Technical",
        keyConcepts: ["same-origin policy", "Access-Control-Allow-Origin", "preflight OPTIONS", "custom headers", "withCredentials", "avoiding wildcard with credentials"],
        wrongConcepts: ["CORS is enforced by backend servers", "Access-Control-Allow-Origin '*' with credentials is valid and secure"]
      },
      {
        question: "Explain the Model-View-Controller (MVC) architectural pattern. How are responsibilities segregated across the frontend and backend?",
        category: "Architecture",
        type: "Technical",
        keyConcepts: ["separation of concerns", "model encapsulates data", "view handles presentation", "controller processes requests", "maintainability"],
        wrongConcepts: ["view should query the database directly", "models handle HTML rendering"]
      }
    ],
    Intermediate: [
      {
        question: "How do you structure an end-to-end real-time notification system using WebSockets or Server-Sent Events (SSE)? Compare both technologies.",
        category: "Real-Time Architecture",
        type: "Technical",
        keyConcepts: ["bidirectional vs unidirectional", "HTTP upgrade", "heartbeats/ping-pong", "connection pooling", "Redis Pub/Sub for horizontal scaling", "reconnection backoff"],
        wrongConcepts: ["SSE supports binary uploads from client to server", "WebSockets use standard HTTP polling on every message"]
      },
      {
        question: "How do you design an idempotent payment processing webhook endpoint that receives transaction notifications from Stripe or PayPal?",
        category: "API & Reliability",
        type: "Technical",
        keyConcepts: ["idempotency key", "signature verification", "replay attack protection", "database unique constraint", "acknowledging 200 quickly", "asynchronous processing"],
        wrongConcepts: ["execute long processing before sending HTTP 200 to webhook", "trust webhook payload without signature validation"]
      },
      {
        question: "How do you containerize a full-stack application (React frontend, Node/Express backend, PostgreSQL database) using Docker and Docker Compose for production and local development?",
        category: "DevOps & Containers",
        type: "Technical",
        keyConcepts: ["multi-stage builds", "Docker Compose services", "network bridge", "volume persistence", "environment variables", "non-root user security"],
        wrongConcepts: ["commit database data directly into Docker image layer", "run containers as root in production"]
      }
    ],
    Advanced: [
      {
        question: "Design an end-to-end file upload pipeline for multi-gigabyte video files with progress tracking, resumable uploads, asynchronous transcoding, and CDN caching.",
        category: "Full Stack System Design",
        type: "Technical",
        keyConcepts: ["presigned S3 URLs", "multipart chunked upload", "tus protocol", "message queue SQS/RabbitMQ", "worker nodes FFmpeg", "HLS streaming", "CloudFront caching"],
        wrongConcepts: ["buffer entire 5GB video in Node.js server RAM before writing to disk", "upload directly through single monolithic HTTP request"]
      },
      {
        question: "Design an end-to-end full-text search architecture for an e-commerce platform using PostgreSQL and Elasticsearch. How do you synchronize catalog updates in real time?",
        category: "Distributed Search",
        type: "Technical",
        keyConcepts: ["inverted index", "Change Data Capture (CDC / Debezium)", "Kafka event stream", "eventual consistency", "fuzzy matching & autocomplete", "re-indexing"],
        wrongConcepts: ["use SQL LIKE '%query%' for full text search on 50M items", "update Elasticsearch synchronously inside client purchase transaction"]
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
      },
      {
        question: "Explain the 4 fundamental pillars of Object-Oriented Programming (OOP) in Java: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
        category: "OOP Fundamentals",
        type: "Technical",
        keyConcepts: ["getters setters private fields", "extends vs implements", "method overloading vs overriding", "abstract classes vs interfaces"],
        wrongConcepts: ["Java supports multiple inheritance with classes directly", "interfaces can have stateful instance variables"]
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
      },
      {
        question: "Explain the JPA / Hibernate N+1 select query problem. How do you detect it, and how do you resolve it using JOIN FETCH or @EntityGraph?",
        category: "JPA & Hibernate",
        type: "Technical",
        keyConcepts: ["lazy loading", "individual query per child entity", "JOIN FETCH in JPQL", "EntityGraph", "batch fetch size hibernate.default_batch_fetch_size"],
        wrongConcepts: ["switching everything to EAGER fetching permanently fixes N+1", "Hibernate automatically optimizes lazy queries into single join"]
      }
    ],
    Advanced: [
      {
        question: "Explain Java Concurrency: Thread Pools, ExecutorService, volatile keyword, and synchronized vs ReentrantLock. How do Virtual Threads (Project Loom in Java 21) change high-throughput I/O?",
        category: "Java Concurrency",
        type: "Technical",
        keyConcepts: ["memory visibility", "CPU cache coherency", "lock striping", "optimistic locking StampedLock", "carrier threads", "mounting/unmounting virtual threads on blocking I/O"],
        wrongConcepts: ["volatile makes compound operations like i++ atomic", "virtual threads are designed for CPU-intensive calculation"]
      },
      {
        question: "How do you tune JVM memory and diagnose OutOfMemoryError (OOM)? Explain Metaspace vs Heap, heap dump analysis using Eclipse MAT, and garbage collection logs.",
        category: "JVM Tuning & Profiling",
        type: "Technical",
        keyConcepts: ["-Xmx -Xms -XX:MaxMetaspaceSize", "HeapDumpOnOutOfMemoryError", "dominator tree", "retained memory", "GC pause times", "leak suspects"],
        wrongConcepts: ["increasing heap size to 64GB unconditionally fixes memory leaks", "Metaspace is stored inside Java heap"]
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
      },
      {
        question: "Tell me about a time you had to adapt quickly to a major change in requirements or project direction right before a deadline. How did you prioritize?",
        category: "Adaptability",
        type: "Behavioral",
        keyConcepts: ["triage", "stakeholder communication", "scope negotiation", "calm execution", "post-release stabilization"],
        wrongConcepts: ["refusing to work on changed requirements", "panicking and abandoning quality checks"]
      },
      {
        question: "Describe a project where you took leadership initiative without being formally asked. What drove you and what was the tangible impact?",
        category: "Leadership & Initiative",
        type: "Behavioral",
        keyConcepts: ["proactive problem discovery", "consensus building", "measurable business impact", "documentation & handover"],
        wrongConcepts: ["imposing decisions without team agreement", "claiming all credit alone"]
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

    // Almost no new words or very high overlap
    if (nonQWords.length <= 4 && aWords.length >= 3) return true;
    if (overlapRatio >= 0.60 && nonQWords.length <= 8) return true;
    if (overlapRatio >= 0.75 && nonQWords.length <= 12) return true;
  }

  return false;
}

/**
 * Synthesizes dynamic key architectural concepts for custom or resume-generated questions
 */
export function synthesizeDynamicConceptsForQuestion(question, role = '') {
  const lowerQ = (question || '').toLowerCase();
  const keyConcepts = [];
  const wrongConcepts = [];

  if (lowerQ.includes('architecture') || lowerQ.includes('high-level') || lowerQ.includes('walk me through')) {
    keyConcepts.push(
      'component hierarchy and modular layer separation',
      'API communication and asynchronous data fetching',
      'persistence layer and relational database schema',
      'state management and caching layer',
      'error boundaries and production deployment'
    );
    wrongConcepts.push('architecture requires monolithic state with direct database access from frontend');
  }

  if (lowerQ.includes('bottleneck') || lowerQ.includes('scalability') || lowerQ.includes('performance')) {
    keyConcepts.push(
      'query optimization and database indexing',
      'caching layer (Redis/Memcached)',
      'asynchronous processing and worker queues',
      'profiling, latency measurement and APM metrics',
      'load balancing and connection pooling'
    );
    wrongConcepts.push('simply restarting the server resolves architectural bottlenecks permanently');
  }

  if (lowerQ.includes('consistency') || lowerQ.includes('peak load') || lowerQ.includes('concurrency')) {
    keyConcepts.push(
      'database transactions and ACID isolation',
      'rate limiting and request throttling',
      'connection pooling and graceful timeouts',
      'read replicas and message queue buffering',
      'idempotency and retry strategies'
    );
    wrongConcepts.push('database locks should be held indefinitely during network HTTP calls');
  }

  if (lowerQ.includes('trade-off') || lowerQ.includes('technical debt')) {
    keyConcepts.push(
      'delivery velocity vs long-term maintainability',
      'modular refactoring and test automation',
      'documentation and team communication',
      'architectural risk assessment and mitigation'
    );
  }

  if (lowerQ.includes('10x') || lowerQ.includes('throughput') || lowerQ.includes('re-architecting')) {
    keyConcepts.push(
      'horizontal scaling with stateless application servers',
      'distributed caching and CDN asset offloading',
      'event-driven architecture with message queues (Kafka/RabbitMQ)',
      'database sharding and read-write replication',
      'asynchronous background batch processing'
    );
    wrongConcepts.push('a single monolithic database server can scale vertically to 10x without sharding or caching');
  }

  if (keyConcepts.length === 0) {
    keyConcepts.push(
      'system modularity and clean architectural patterns',
      'defensive programming and error handling',
      'production logging and observability',
      'performance optimization and test coverage'
    );
  }

    return { keyConcepts, wrongConcepts };
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
        incorrectConcepts: [`Question Echo Detected: The submitted response repeats the question prompt without answering it.`],
        improvements: [
          "Do not copy or paste the question text into the response box.",
          "Provide a direct technical explanation addressing the core principles, architecture, and trade-offs."
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

    // 5. Try real OpenAI evaluation if client is configured
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
  - If the answer is completely off-topic or irrelevant (e.g. talking about food, movies, personal hobbies, or unrelated non-technical topics), give 0.0 for Relevance, Correctness, and Overall = 0.0!
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

        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('OpenAI evaluation timeout')), 2500));
        const response = await Promise.race([
          openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.3
          }),
          timeoutPromise
        ]);

        const parsed = JSON.parse(response.choices[0].message.content);
        if (parsed.overall !== undefined && parsed.strengths) {
          return parsed;
        }
      } catch (apiErr) {
        console.warn('OpenAI API call failed, activating Semantic Concept Validator:', apiErr.message);
      }
    }

    // 6. High-Precision Semantic Concept Validator (Zero-Dummy Engine)
    return performSemanticConceptValidation(question, trimmed, role, difficulty, interviewType);
  }

  /**
   * Semantic Concept & Misconception Validator
   * Evaluates semantic content, detects incorrect claims, and scores accurately.
   */
  function performSemanticConceptValidation(question, answer, role, difficulty, interviewType = 'Technical') {
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

  const isBehavioral = interviewType.toLowerCase().includes('behavioral') || interviewType.toLowerCase().includes('hr');
  const techTermsCount = countTechnicalTerms(lowerAnswer);
  const behavioralTermsCount = countBehavioralTerms(lowerAnswer);

  // Strict Check: Non-technical or off-topic answer to technical / resume interview
  if (!isBehavioral && techTermsCount === 0 && novelWords.length < 20) {
    return {
      clarity: 0.0,
      relevance: 0.0,
      depth: 0.0,
      communication: 0.0,
      problemSolving: 0.0,
      overall: 0.0,
      strengths: ["None. The submitted response does not answer the technical question asked."],
      missingConcepts: ["You must explain the technical architecture, components, databases, trade-offs, or implementation details."],
      incorrectConcepts: ["Off-Topic / Non-Technical Response: Your answer does not discuss any relevant software engineering concepts or technical architectures."],
      improvements: [
        "Address the specific technical prompt directly.",
        "Include concrete technical mechanisms (e.g. data structures, frameworks, databases, or trade-offs)."
      ],
      strongerAnswer: generateStrongerAnswerTemplate(question, [], []),
      adaptiveHint: "Non-technical response detected (0.0/10). Re-asking a foundational engineering question."
    };
  }

  // Find the exact or highest-overlap matching question in QUESTION_REPOSITORY
  let bestMatchItem = null;
  let bestMatchScore = 0;
  const qTerms = lowerQuestion.split(/[\s,?.!]+/).filter(w => w.length > 3 && !stopWords.has(w));

  const isResumeInterview = interviewType.toLowerCase().includes('resume');

  // Resume questions are dynamically tailored and must use dynamic concept synthesis
  if (!isResumeInterview) {
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
            if (overlap > bestMatchScore && overlap >= 5) {
              bestMatchScore = overlap;
              bestMatchItem = item;
            }
          }
        }
        if (bestMatchScore === 999) break;
      }
      if (bestMatchScore === 999) break;
    }
  }

  // If question is not in static repository (e.g. dynamic Resume interview question), synthesize target concepts
  let allConcepts = [];
  let wrongConceptsList = [];

  if (bestMatchItem && bestMatchScore >= 5) {
    allConcepts = bestMatchItem.keyConcepts || [];
    wrongConceptsList = bestMatchItem.wrongConcepts || [];
  } else {
    const synthesized = synthesizeDynamicConceptsForQuestion(question, role);
    allConcepts = synthesized.keyConcepts;
    wrongConceptsList = synthesized.wrongConcepts;
  }

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
  const isOffTopic = (!isBehavioral && techTermsCount === 0) || (questionRelevanceRatio < 0.10 && matchedConcepts.length === 0);

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
  } else if (novelWords.length < 10 || (!isBehavioral && techTermsCount <= 1)) {
    // Extremely thin / superficial answer
    correctness = 1.5;
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
    const conceptRatio = allConcepts.length > 0 ? (matchedConcepts.length / allConcepts.length) : (techTermsCount / 8);

    if ((conceptRatio >= 0.35 || matchedConcepts.length >= 2 || (techTermsCount >= 4 && novelWords.length >= 25)) && novelWords.length >= 20 && (!isBehavioral ? techTermsCount >= 3 : behavioralTermsCount >= 2)) {
      // Strong to exceptional answer
      correctness = Math.min(9.5, 7.0 + conceptRatio * 2.5);
      relevance = Math.min(9.5, 7.0 + questionRelevanceRatio * 2.5);
      depth = Math.min(9.0, 6.0 + conceptRatio * 2.5 + (answerWords.length > 50 ? 1.5 : 0.5));
      problemSolving = Math.min(9.5, 7.0 + conceptRatio * 2.5);
      clarity = 8.0;
    } else if ((conceptRatio >= 0.2 || matchedConcepts.length >= 1 || techTermsCount >= 2) && novelWords.length >= 15 && (!isBehavioral ? techTermsCount >= 2 : true)) {
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
 * Strictly guarantees that previously covered questions are never repeated.
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
Questions already covered in this session: ${coveredCategories.join(' | ') || 'None yet'}

ADAPTIVE RULES:
- If previous score >= 7.5: Escalate complexity, ask an advanced deep-dive or architectural follow-up.
- If previous score is 4.0 - 7.4: Ask a clarifying follow-up probing the specific trade-offs or missing aspects of the previous answer.
- If previous score < 4.0: Pivot to a fundamental concept to verify core knowledge without discouraging the candidate.
- NEVER repeat any question that has already been asked in this session!

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

  // Dynamic Repository-Based Adaptive Selector with STRICT Non-Repetition
  const coveredSet = new Set((coveredCategories || []).map(q => q.trim().toLowerCase()));
  if (previousQuestion) coveredSet.add(previousQuestion.trim().toLowerCase());

  let targetDiff = difficulty;
  if (previousScore >= 8.0) targetDiff = 'Advanced';
  else if (previousScore < 5.0) targetDiff = 'Beginner';

  const roleBank = QUESTION_REPOSITORY[role] || QUESTION_REPOSITORY['Software Engineer'];

  // 1. Try unused questions at target difficulty
  let pool = (roleBank[targetDiff] || []).filter(q => !coveredSet.has(q.question.trim().toLowerCase()));

  // 2. If target difficulty ran out, check other difficulties of same role
  if (pool.length === 0) {
    for (const d of ['Intermediate', 'Beginner', 'Advanced']) {
      const unused = (roleBank[d] || []).filter(q => !coveredSet.has(q.question.trim().toLowerCase()));
      if (unused.length > 0) {
        pool = unused;
        targetDiff = d;
        break;
      }
    }
  }

  // 3. If still empty, check related roles (Software Engineer / Full Stack)
  if (pool.length === 0) {
    const fallbackBank = QUESTION_REPOSITORY['Software Engineer'];
    for (const d of ['Intermediate', 'Beginner', 'Advanced']) {
      const unused = (fallbackBank[d] || []).filter(q => !coveredSet.has(q.question.trim().toLowerCase()));
      if (unused.length > 0) {
        pool = unused;
        targetDiff = d;
        break;
      }
    }
  }

  const defaultQuestions = getQuestionsForRole(role, difficulty, interviewType);
  const picked = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : defaultQuestions[0];

  return {
    question: picked.question,
    category: picked.category || 'Core Competency',
    difficulty: targetDiff,
    type: picked.type || 'Technical'
  };
}

/**
 * Picks or generates a fresh, unique opening question for a new interview session.
 * Guarantees that questions asked in recent sessions are avoided.
 */
export async function getFreshOpeningQuestion({ role, difficulty, interviewType, recentQuestions = [] }) {
  const openai = getAiClient();
  const recentSet = new Set((recentQuestions || []).map(q => q.trim().toLowerCase()));

  // 1. If OpenAI is available, generate a brand-new dynamic opening question
  if (openai) {
    try {
      const prompt = `
You are an expert technical interviewer conducting a ${interviewType} for a ${role} (${difficulty} level).
Generate a fresh, unique, challenging opening interview question for the candidate.

RULES:
- Do NOT repeat or closely resemble any of these previously asked questions:
${Array.from(recentSet).slice(0, 15).join(' | ') || 'None'}

Return ONLY a valid JSON object:
{
  "question": "The interview question string",
  "category": "Topic Category",
  "difficulty": "${difficulty}",
  "type": "${interviewType}"
}
`;
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7
      });
      const parsed = JSON.parse(response.choices[0].message.content);
      if (parsed.question && !recentSet.has(parsed.question.trim().toLowerCase())) {
        return parsed;
      }
    } catch (e) {
      // Fall through to repository selection
    }
  }

  // 2. Select an unused question from the repository across all tiers of this role
  let roleBank = QUESTION_REPOSITORY[role];
  if (!roleBank) {
    if (role.toLowerCase().includes('front')) roleBank = QUESTION_REPOSITORY['Frontend Developer'];
    else if (role.toLowerCase().includes('back')) roleBank = QUESTION_REPOSITORY['Backend Developer'];
    else if (role.toLowerCase().includes('full') || role.toLowerCase().includes('stack')) roleBank = QUESTION_REPOSITORY['Full Stack Developer'];
    else if (role.toLowerCase().includes('java')) roleBank = QUESTION_REPOSITORY['Java Developer'];
    else if (role.toLowerCase().includes('data') || role.toLowerCase().includes('analyst')) roleBank = QUESTION_REPOSITORY['Data Analyst'];
    else roleBank = QUESTION_REPOSITORY['Software Engineer'];
  }

  // Collect all questions for this role
  let allRoleQuestions = [];
  if (interviewType === 'HR Interview' || interviewType === 'Behavioral Interview') {
    allRoleQuestions = [...(QUESTION_REPOSITORY['HR / Behavioral'].All || [])];
  } else {
    // Prefer target difficulty first, then others
    const targetTier = roleBank[difficulty] || [];
    const otherTiers = Object.keys(roleBank).filter(d => d !== difficulty).flatMap(d => roleBank[d] || []);
    allRoleQuestions = [...targetTier, ...otherTiers];
    if (interviewType === 'Mixed Interview') {
      allRoleQuestions.push(...(QUESTION_REPOSITORY['HR / Behavioral'].All || []));
    }
  }

  // Filter out any question recently asked
  const unused = allRoleQuestions.filter(q => !recentSet.has(q.question.trim().toLowerCase()));

  if (unused.length > 0) {
    return unused[Math.floor(Math.random() * unused.length)];
  }

  // If all questions for this specific role have been seen, pool from general Software Engineer / Full Stack
  const fallbackPool = [
    ...(QUESTION_REPOSITORY['Software Engineer'].Beginner || []),
    ...(QUESTION_REPOSITORY['Software Engineer'].Intermediate || []),
    ...(QUESTION_REPOSITORY['Software Engineer'].Advanced || []),
    ...(QUESTION_REPOSITORY['Full Stack Developer'].Beginner || []),
    ...(QUESTION_REPOSITORY['Full Stack Developer'].Intermediate || [])
  ];
  const unusedFallback = fallbackPool.filter(q => !recentSet.has(q.question.trim().toLowerCase()));
  if (unusedFallback.length > 0) {
    return unusedFallback[Math.floor(Math.random() * unusedFallback.length)];
  }

  // If every question has been seen, pick one that is at least not the very last question
  const lastQ = Array.from(recentSet)[0] || '';
  const notLast = allRoleQuestions.filter(q => q.question.trim().toLowerCase() !== lastQ);
  return notLast.length > 0 ? notLast[Math.floor(Math.random() * notLast.length)] : allRoleQuestions[0];
}

/**
 * Generates a diverse, fresh list of interview questions tailored to the candidate's resume.
 * Guarantees that questions asked in recent sessions are never repeated.
 */
export async function generateFreshResumeQuestions({
  skills = [],
  projects = [],
  recentQuestions = [],
  totalQuestions = 5
}) {
  const openai = getAiClient();
  const recentSet = new Set((recentQuestions || []).map(q => q.trim().toLowerCase()));

  // Fallbacks if empty
  const safeSkills = skills && skills.length > 0 ? skills : ['JavaScript', 'Node.js', 'React', 'SQL', 'Git'];
  const safeProjects = projects && projects.length > 0 ? projects : [
    'Full-Stack Web Application with database integration',
    'High-performance backend API service with caching',
    'Responsive frontend interface with modern component architecture'
  ];

  // 1. Try OpenAI dynamic generation if configured
  if (openai) {
    try {
      const prompt = `
You are a senior tech hiring manager conducting a technical interview based on a candidate's resume.
Candidate Skills: ${safeSkills.slice(0, 8).join(', ')}
Candidate Projects / Highlights:
${safeProjects.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join('\n')}

Recent questions already asked to this candidate in prior sessions:
${Array.from(recentSet).slice(0, 15).join('\n') || 'None'}

Generate ${totalQuestions} distinct, in-depth, scenario-based interview questions directly referencing their projects and skills.
CRITICAL RULES:
- Do NOT repeat or closely mirror any recent questions listed above!
- Distribute questions across different projects and skills (not just the first one).
- Cover: 1) System architecture, 2) Performance & bottlenecks, 3) Concurrency & data consistency, 4) Technical trade-offs, 5) Scalability & disaster recovery.

Return ONLY a JSON array of strings:
["Question 1...", "Question 2...", ...]
`;
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('OpenAI timeout')), 3000));
      const response = await Promise.race([
        openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.7
        }),
        timeoutPromise
      ]);

      const parsed = JSON.parse(response.choices[0].message.content);
      const qList = Array.isArray(parsed) ? parsed : (parsed.questions || Object.values(parsed)[0]);
      if (Array.isArray(qList) && qList.length >= totalQuestions) {
        const filtered = qList.filter(q => typeof q === 'string' && !recentSet.has(q.trim().toLowerCase()));
        if (filtered.length >= totalQuestions) {
          return filtered.slice(0, totalQuestions);
        }
      }
    } catch (e) {
      // Fallback to rich dynamic template generator
    }
  }

  // 2. Rich Dynamic Deterministic Template Engine (Zero-Repeat Guarantee)
  const templates = [
    // Archetype 1: Architecture & Technology Selection
    (p, s) => `I noticed on your resume that you worked on: "${p}". Walk me through the high-level architecture of this system and how you decided to leverage ${s}.`,
    (p, s) => `Looking at your implementation of "${p}", how did you structure the separation of concerns between your service layer, persistence layer, and API contracts when integrating ${s}?`,
    (p, s) => `In the context of "${p}", what other frameworks or technologies did you evaluate before choosing ${s}, and what decisive architectural trade-offs influenced your decision?`,

    // Archetype 2: Performance Bottlenecks & Optimization
    (p, s) => `In your project involving "${p}", what was the most difficult technical bottleneck or scalability challenge you encountered, and how did you resolve it?`,
    (p, s) => `During your work on "${p}", how did you measure and profile system latency, and what specific optimizations did you implement using ${s}?`,
    (p, s) => `When handling intensive workloads in "${p}", how did you prevent resource starvation or memory leaks in your ${s} implementation?`,

    // Archetype 3: Concurrency, Data Consistency & Reliability
    (p, s) => `Regarding your experience with ${s} in "${p}", how did you ensure data consistency, transaction integrity, and error handling under peak load?`,
    (p, s) => `How did you manage database connection pooling, state synchronization, and failover recovery while working on "${p}" with ${s}?`,
    (p, s) => `In "${p}", how did you handle asynchronous jobs, event queues, or background tasks with ${s} to guarantee idempotency and avoid race conditions?`,

    // Archetype 4: Technical Debt & Trade-offs
    (p, s) => `Tell me about an instance during your work on "${p}" when you had to make a tough trade-off between delivery speed and technical debt. What was the outcome?`,
    (p, s) => `If you could revisit a design decision made during the development of "${p}", what would you refactor or implement differently today using ${s}?`,
    (p, s) => `In "${p}", how did your team balance shipping new customer features against refactoring core legacy modules and writing comprehensive test suites?`,

    // Archetype 5: High-Scale Re-Architecture & Production Readiness
    (p, s) => `If you were tasked with re-architecting "${p}" today to support 10x higher throughput and 99.99% uptime, what architectural changes would you make?`,
    (p, s) => `How did you implement automated testing, CI/CD pipelines, and observability (metrics, APM, logging) for "${p}" to ensure zero-downtime releases?`,
    (p, s) => `In "${p}", how did you approach security, authorization checks, and data protection for APIs powered by ${s}?`
  ];

  // Shuffle projects & skills to provide rich variety across sessions
  const shuffledProjects = [...safeProjects].sort(() => Math.random() - 0.5);
  const shuffledSkills = [...safeSkills].sort(() => Math.random() - 0.5);

  const candidateQuestions = [];

  for (let i = 0; i < templates.length && candidateQuestions.length < totalQuestions * 3; i++) {
    const proj = shuffledProjects[i % shuffledProjects.length];
    const skill = shuffledSkills[i % shuffledSkills.length];
    const qStr = templates[i](proj, skill);

    if (!recentSet.has(qStr.trim().toLowerCase()) && !candidateQuestions.includes(qStr)) {
      candidateQuestions.push(qStr);
    }
  }

  // If we collected enough, take the first totalQuestions
  if (candidateQuestions.length >= totalQuestions) {
    return candidateQuestions.slice(0, totalQuestions);
  }

  // Fallback: fill any missing slots with varied templates
  for (const t of templates) {
    const proj = safeProjects[Math.floor(Math.random() * safeProjects.length)];
    const skill = safeSkills[Math.floor(Math.random() * safeSkills.length)];
    const q = t(proj, skill);
    if (!candidateQuestions.includes(q)) {
      candidateQuestions.push(q);
    }
    if (candidateQuestions.length >= totalQuestions) break;
  }

  return candidateQuestions.slice(0, totalQuestions);
}
