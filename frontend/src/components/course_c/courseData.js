// ─────────────────────────────────────────────────────────────────────────────
// courseData.js  —  ADANI ERP · Course Module Mock Data
// Replace API fetch calls here when backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════════════
// CURRENT USER
// ══════════════════════════════════════════════════════════════════════════════
export const CURRENT_USER = {
  id: "S001",
  name: "Arjun Mehta",
  initials: "AM",
  rollNo: "21CS049",
  semester: 4,
  department: "Computer Science & Engineering",
  batch: "2021–2025",
  year: "2024–25",
};

// ══════════════════════════════════════════════════════════════════════════════
// COURSES  (enrolled, filtered by student semester + department)
// ══════════════════════════════════════════════════════════════════════════════
export const COURSES = [
  {
    id: "CS301",
    code: "CS301",
    name: "Database Management Systems",
    credits: 3,
    faculty: "Dr. Grace Hopper",
    facultyAvatar: "GH",
    semester: 4,
    department: "CSE",
    status: "completed",
    totalContent: 20,
    completedContent: 20,
    chapters: 5,
    schedule: "Mon / Wed  ·  9:00 AM",
    grade: null,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
    description:
      "Comprehensive study of relational databases, SQL, normalisation, transactions, and modern DBMS internals. Students will design schemas, write complex queries, and understand indexing strategies.",
  },
  {
    id: "CS201",
    code: "CS201",
    name: "Data Structures and Algorithms",
    credits: 4,
    faculty: "Dr. Ada Lovelace",
    facultyAvatar: "AL",
    semester: 4,
    department: "CSE",
    status: "in_progress",
    totalContent: 24,
    completedContent: 14,
    chapters: 6,
    schedule: "Tue / Thu  ·  11:00 AM",
    grade: "B+",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    description:
      "Core data structures — arrays, linked lists, trees, graphs, heaps — and algorithm design techniques: sorting, searching, divide-and-conquer, greedy, and dynamic programming.",
  },
  {
    id: "CS101",
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 4,
    faculty: "Dr. Alan Turing",
    facultyAvatar: "AT",
    semester: 4,
    department: "CSE",
    status: "in_progress",
    totalContent: 18,
    completedContent: 10,
    chapters: 5,
    schedule: "Fri  ·  2:00 PM",
    grade: "A-",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    description:
      "Foundational course covering computational thinking, programming paradigms, Boolean algebra, number systems, and the history and future of computing.",
  },
  {
    id: "MA401",
    code: "MA401",
    name: "Engineering Mathematics IV",
    credits: 4,
    faculty: "Dr. Meena Joshi",
    facultyAvatar: "MJ",
    semester: 4,
    department: "CSE",
    status: "in_progress",
    totalContent: 16,
    completedContent: 6,
    chapters: 4,
    schedule: "Mon / Wed / Fri  ·  8:00 AM",
    grade: null,
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    description:
      "Advanced applied mathematics including Fourier transforms, Laplace transforms, complex analysis, partial differential equations, and numerical methods.",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// CHAPTERS  (keyed by course ID)
// Each chapter → items []
//   item.type: "video" | "pdf" | "assignment" | "quiz" | "lab"
//   item.status: "completed" | "submitted" | "viewed" | "not_started" | "locked"
// ══════════════════════════════════════════════════════════════════════════════
export const CHAPTERS = {

  // ── CS201 · Data Structures & Algorithms ──────────────────────────────────
  CS201: [
    {
      id: "CH1",
      title: "Introduction & Complexity Analysis",
      order: 1,
      unlocked: true,
      items: [
        {
          id: "C01",
          type: "video",
          title: "What is DSA and Why It Matters",
          duration: "12 min",
          status: "completed",
        },
        {
          id: "C02",
          type: "video",
          title: "Big-O, Big-Θ and Big-Ω Notation",
          duration: "18 min",
          status: "completed",
        },
        {
          id: "C03",
          type: "pdf",
          title: "Complexity Analysis Cheat Sheet",
          size: "240 KB",
          status: "completed",
        },
        {
          id: "C04",
          type: "quiz",
          title: "Complexity Basics Quiz",
          questions: 10,
          status: "completed",
          score: 85,
        },
      ],
    },
    {
      id: "CH2",
      title: "Arrays & Linked Lists",
      order: 2,
      unlocked: true,
      items: [
        {
          id: "C05",
          type: "video",
          title: "Arrays: Memory Layout & Operations",
          duration: "22 min",
          status: "completed",
        },
        {
          id: "C06",
          type: "video",
          title: "Singly Linked List — Build from Scratch",
          duration: "20 min",
          status: "completed",
        },
        {
          id: "C07",
          type: "video",
          title: "Doubly & Circular Linked Lists",
          duration: "25 min",
          status: "completed",
        },
        {
          id: "C08",
          type: "pdf",
          title: "Linked List Operations Reference",
          size: "310 KB",
          status: "completed",
        },
        {
          id: "C09",
          type: "assignment",
          title: "Assignment 1: Linked List Implementation",
          due: "Feb 28, 2025",
          status: "submitted",
          grade: "A",
          marks: "48 / 50",
        },
        {
          id: "C10",
          type: "lab",
          title: "Lab 2: Array Rotation & Reversal",
          duration: "90 min",
          status: "completed",
        },
      ],
    },
    {
      id: "CH3",
      title: "Stacks, Queues & Deques",
      order: 3,
      unlocked: true,
      items: [
        {
          id: "C11",
          type: "video",
          title: "Stack ADT — Concept & Applications",
          duration: "15 min",
          status: "completed",
        },
        {
          id: "C12",
          type: "video",
          title: "Queue, Deque & Priority Queue",
          duration: "18 min",
          status: "viewed",
        },
        {
          id: "C13",
          type: "pdf",
          title: "Stack & Queue Practice Problems",
          size: "380 KB",
          status: "not_started",
        },
        {
          id: "C14",
          type: "quiz",
          title: "Stacks & Queues Quiz",
          questions: 12,
          status: "not_started",
        },
        {
          id: "C15",
          type: "assignment",
          title: "Assignment 2: Stack-Based Calculator",
          due: "Mar 10, 2025",
          status: "not_started",
          marks: "— / 40",
        },
      ],
    },
    {
      id: "CH4",
      title: "Trees & Binary Search Trees",
      order: 4,
      unlocked: false,
      items: [
        {
          id: "C16",
          type: "video",
          title: "Tree Terminology & Properties",
          duration: "20 min",
          status: "locked",
        },
        {
          id: "C17",
          type: "video",
          title: "Binary Search Tree: Insert, Delete, Search",
          duration: "28 min",
          status: "locked",
        },
        {
          id: "C18",
          type: "video",
          title: "AVL Trees & Self-Balancing",
          duration: "32 min",
          status: "locked",
        },
        {
          id: "C19",
          type: "pdf",
          title: "Tree Traversal Techniques",
          size: "420 KB",
          status: "locked",
        },
        {
          id: "C20",
          type: "quiz",
          title: "Trees Assessment",
          questions: 15,
          status: "locked",
        },
      ],
    },
    {
      id: "CH5",
      title: "Graph Algorithms",
      order: 5,
      unlocked: false,
      items: [
        {
          id: "C21",
          type: "video",
          title: "Graph Representation: Matrix vs List",
          duration: "22 min",
          status: "locked",
        },
        {
          id: "C22",
          type: "video",
          title: "BFS & DFS — Deep Dive",
          duration: "35 min",
          status: "locked",
        },
        {
          id: "C23",
          type: "video",
          title: "Dijkstra's Shortest Path",
          duration: "30 min",
          status: "locked",
        },
        {
          id: "C24",
          type: "lab",
          title: "Lab 5: Graph Traversal Visualiser",
          duration: "120 min",
          status: "locked",
        },
        {
          id: "C25",
          type: "assignment",
          title: "Assignment 3: Graph Traversal Project",
          due: "Apr 2, 2025",
          status: "locked",
          marks: "— / 60",
        },
      ],
    },
    {
      id: "CH6",
      title: "Sorting & Searching",
      order: 6,
      unlocked: false,
      items: [
        {
          id: "C26",
          type: "video",
          title: "Bubble, Selection & Insertion Sort",
          duration: "30 min",
          status: "locked",
        },
        {
          id: "C27",
          type: "video",
          title: "Merge Sort & Quick Sort",
          duration: "40 min",
          status: "locked",
        },
        {
          id: "C28",
          type: "video",
          title: "Heap Sort & Counting Sort",
          duration: "25 min",
          status: "locked",
        },
        {
          id: "C29",
          type: "lab",
          title: "Lab 6: Sorting Algorithm Visualiser",
          duration: "120 min",
          status: "locked",
        },
        {
          id: "C30",
          type: "quiz",
          title: "Final Chapter Assessment",
          questions: 25,
          status: "locked",
        },
      ],
    },
  ],

  // ── CS301 · Database Management Systems ───────────────────────────────────
  CS301: [
    {
      id: "D_CH1",
      title: "Introduction to Databases",
      order: 1,
      unlocked: true,
      items: [
        {
          id: "D01",
          type: "video",
          title: "What is a Database? DBMS vs File System",
          duration: "14 min",
          status: "completed",
        },
        {
          id: "D02",
          type: "video",
          title: "Database Architecture & Data Models",
          duration: "20 min",
          status: "completed",
        },
        {
          id: "D03",
          type: "pdf",
          title: "DBMS Overview Reference Sheet",
          size: "180 KB",
          status: "completed",
        },
        {
          id: "D04",
          type: "quiz",
          title: "Intro Quiz",
          questions: 8,
          status: "completed",
          score: 100,
        },
      ],
    },
    {
      id: "D_CH2",
      title: "Relational Model & SQL",
      order: 2,
      unlocked: true,
      items: [
        {
          id: "D05",
          type: "video",
          title: "Relational Model: Tables, Keys & Constraints",
          duration: "25 min",
          status: "completed",
        },
        {
          id: "D06",
          type: "video",
          title: "SQL: DDL — CREATE, ALTER, DROP",
          duration: "22 min",
          status: "completed",
        },
        {
          id: "D07",
          type: "video",
          title: "SQL: DML — SELECT, INSERT, UPDATE, DELETE",
          duration: "30 min",
          status: "completed",
        },
        {
          id: "D08",
          type: "pdf",
          title: "SQL Quick Reference & Practice Set",
          size: "520 KB",
          status: "completed",
        },
        {
          id: "D09",
          type: "assignment",
          title: "Assignment 1: Library DB Schema + Queries",
          due: "Jan 20, 2025",
          status: "submitted",
          grade: "A+",
          marks: "50 / 50",
        },
        {
          id: "D10",
          type: "lab",
          title: "Lab 2: SQL Query Workbench",
          duration: "90 min",
          status: "completed",
        },
      ],
    },
    {
      id: "D_CH3",
      title: "Normalisation & ER Modelling",
      order: 3,
      unlocked: true,
      items: [
        {
          id: "D11",
          type: "video",
          title: "ER Diagrams — Entities, Relationships, Cardinality",
          duration: "28 min",
          status: "completed",
        },
        {
          id: "D12",
          type: "video",
          title: "1NF, 2NF, 3NF & BCNF Explained",
          duration: "35 min",
          status: "completed",
        },
        {
          id: "D13",
          type: "pdf",
          title: "Normalisation Step-by-Step Guide",
          size: "390 KB",
          status: "completed",
        },
        {
          id: "D14",
          type: "quiz",
          title: "Normalisation Quiz",
          questions: 15,
          status: "completed",
          score: 80,
        },
        {
          id: "D15",
          type: "assignment",
          title: "Assignment 2: ER Design — University System",
          due: "Feb 10, 2025",
          status: "submitted",
          grade: "A",
          marks: "47 / 50",
        },
      ],
    },
    {
      id: "D_CH4",
      title: "Transactions & Concurrency",
      order: 4,
      unlocked: true,
      items: [
        {
          id: "D16",
          type: "video",
          title: "ACID Properties & Transaction States",
          duration: "20 min",
          status: "completed",
        },
        {
          id: "D17",
          type: "video",
          title: "Concurrency Control: Locks & 2PL",
          duration: "25 min",
          status: "completed",
        },
        {
          id: "D18",
          type: "pdf",
          title: "Concurrency & Deadlock Notes",
          size: "280 KB",
          status: "completed",
        },
        {
          id: "D19",
          type: "quiz",
          title: "Transactions Quiz",
          questions: 12,
          status: "completed",
          score: 92,
        },
      ],
    },
    {
      id: "D_CH5",
      title: "Indexing, Hashing & Query Optimisation",
      order: 5,
      unlocked: true,
      items: [
        {
          id: "D20",
          type: "video",
          title: "B+ Trees & Index Structures",
          duration: "30 min",
          status: "completed",
        },
        {
          id: "D21",
          type: "video",
          title: "Query Processing & Optimisation",
          duration: "28 min",
          status: "completed",
        },
        {
          id: "D22",
          type: "pdf",
          title: "Indexing Techniques Summary",
          size: "310 KB",
          status: "completed",
        },
        {
          id: "D23",
          type: "assignment",
          title: "Assignment 3: Query Optimisation Report",
          due: "Mar 5, 2025",
          status: "submitted",
          grade: "A-",
          marks: "44 / 50",
        },
        {
          id: "D24",
          type: "quiz",
          title: "Final Comprehensive Quiz",
          questions: 20,
          status: "completed",
          score: 90,
        },
      ],
    },
  ],

  // ── CS101 · Introduction to Computer Science ──────────────────────────────
  CS101: [
    {
      id: "I_CH1",
      title: "What is Computer Science?",
      order: 1,
      unlocked: true,
      items: [
        {
          id: "I01",
          type: "video",
          title: "History of Computing",
          duration: "16 min",
          status: "completed",
        },
        {
          id: "I02",
          type: "video",
          title: "Computational Thinking & Problem Solving",
          duration: "14 min",
          status: "completed",
        },
        {
          id: "I03",
          type: "pdf",
          title: "CS Fundamentals Reading",
          size: "200 KB",
          status: "completed",
        },
        {
          id: "I04",
          type: "quiz",
          title: "Intro Quiz",
          questions: 8,
          status: "completed",
          score: 88,
        },
      ],
    },
    {
      id: "I_CH2",
      title: "Number Systems & Boolean Logic",
      order: 2,
      unlocked: true,
      items: [
        {
          id: "I05",
          type: "video",
          title: "Binary, Octal & Hexadecimal",
          duration: "20 min",
          status: "completed",
        },
        {
          id: "I06",
          type: "video",
          title: "Boolean Algebra & Logic Gates",
          duration: "24 min",
          status: "completed",
        },
        {
          id: "I07",
          type: "pdf",
          title: "Number Conversion Practice Sheet",
          size: "150 KB",
          status: "completed",
        },
        {
          id: "I08",
          type: "assignment",
          title: "Assignment 1: Number System Conversion Set",
          due: "Jan 25, 2025",
          status: "submitted",
          grade: "A-",
          marks: "38 / 40",
        },
        {
          id: "I09",
          type: "quiz",
          title: "Boolean Logic Quiz",
          questions: 10,
          status: "completed",
          score: 90,
        },
      ],
    },
    {
      id: "I_CH3",
      title: "Programming Fundamentals",
      order: 3,
      unlocked: true,
      items: [
        {
          id: "I10",
          type: "video",
          title: "Variables, Data Types & Operators",
          duration: "18 min",
          status: "completed",
        },
        {
          id: "I11",
          type: "video",
          title: "Control Flow: if / loops / functions",
          duration: "22 min",
          status: "viewed",
        },
        {
          id: "I12",
          type: "pdf",
          title: "Python Basics Cheat Sheet",
          size: "290 KB",
          status: "not_started",
        },
        {
          id: "I13",
          type: "lab",
          title: "Lab 3: First Python Programs",
          duration: "90 min",
          status: "not_started",
        },
        {
          id: "I14",
          type: "assignment",
          title: "Assignment 2: Python Problem Set",
          due: "Mar 12, 2025",
          status: "not_started",
          marks: "— / 50",
        },
      ],
    },
    {
      id: "I_CH4",
      title: "Computer Organisation Basics",
      order: 4,
      unlocked: false,
      items: [
        {
          id: "I15",
          type: "video",
          title: "CPU, Memory & I/O",
          duration: "20 min",
          status: "locked",
        },
        {
          id: "I16",
          type: "video",
          title: "Machine Language & Assembly Overview",
          duration: "25 min",
          status: "locked",
        },
        {
          id: "I17",
          type: "pdf",
          title: "Computer Organisation Notes",
          size: "360 KB",
          status: "locked",
        },
        {
          id: "I18",
          type: "quiz",
          title: "Computer Organisation Quiz",
          questions: 12,
          status: "locked",
        },
      ],
    },
    {
      id: "I_CH5",
      title: "Operating Systems & Networks",
      order: 5,
      unlocked: false,
      items: [
        {
          id: "I19",
          type: "video",
          title: "OS Concepts: Processes, Memory, Files",
          duration: "28 min",
          status: "locked",
        },
        {
          id: "I20",
          type: "video",
          title: "Introduction to Computer Networks",
          duration: "22 min",
          status: "locked",
        },
        {
          id: "I21",
          type: "assignment",
          title: "Final Assignment: OS Case Study",
          due: "Apr 15, 2025",
          status: "locked",
          marks: "— / 60",
        },
      ],
    },
  ],

  // ── MA401 · Engineering Mathematics IV ────────────────────────────────────
  MA401: [
    {
      id: "M_CH1",
      title: "Fourier Series & Transforms",
      order: 1,
      unlocked: true,
      items: [
        {
          id: "M01",
          type: "video",
          title: "Fourier Series — Derivation & Examples",
          duration: "30 min",
          status: "completed",
        },
        {
          id: "M02",
          type: "video",
          title: "Fourier Transform & Inverse Transform",
          duration: "28 min",
          status: "completed",
        },
        {
          id: "M03",
          type: "pdf",
          title: "Fourier Formula Sheet",
          size: "200 KB",
          status: "completed",
        },
        {
          id: "M04",
          type: "quiz",
          title: "Fourier Series Quiz",
          questions: 10,
          status: "completed",
          score: 78,
        },
      ],
    },
    {
      id: "M_CH2",
      title: "Laplace Transforms",
      order: 2,
      unlocked: true,
      items: [
        {
          id: "M05",
          type: "video",
          title: "Laplace Transform — Definition & Properties",
          duration: "25 min",
          status: "completed",
        },
        {
          id: "M06",
          type: "video",
          title: "Inverse Laplace & Partial Fractions",
          duration: "30 min",
          status: "viewed",
        },
        {
          id: "M07",
          type: "pdf",
          title: "Laplace Table & Solved Examples",
          size: "340 KB",
          status: "not_started",
        },
        {
          id: "M08",
          type: "assignment",
          title: "Assignment 1: Laplace Problem Set",
          due: "Feb 22, 2025",
          status: "not_started",
          marks: "— / 40",
        },
      ],
    },
    {
      id: "M_CH3",
      title: "Complex Analysis",
      order: 3,
      unlocked: false,
      items: [
        {
          id: "M09",
          type: "video",
          title: "Complex Numbers & Functions",
          duration: "22 min",
          status: "locked",
        },
        {
          id: "M10",
          type: "video",
          title: "Cauchy-Riemann Equations",
          duration: "28 min",
          status: "locked",
        },
        {
          id: "M11",
          type: "pdf",
          title: "Complex Analysis Notes",
          size: "450 KB",
          status: "locked",
        },
        {
          id: "M12",
          type: "quiz",
          title: "Complex Analysis Quiz",
          questions: 12,
          status: "locked",
        },
      ],
    },
    {
      id: "M_CH4",
      title: "Numerical Methods",
      order: 4,
      unlocked: false,
      items: [
        {
          id: "M13",
          type: "video",
          title: "Newton-Raphson & Bisection Method",
          duration: "26 min",
          status: "locked",
        },
        {
          id: "M14",
          type: "video",
          title: "Numerical Integration: Simpson & Trapezoidal",
          duration: "24 min",
          status: "locked",
        },
        {
          id: "M15",
          type: "lab",
          title: "Lab 4: Numerical Methods in Python",
          duration: "120 min",
          status: "locked",
        },
        {
          id: "M16",
          type: "assignment",
          title: "Final Assignment: Numerical Analysis Report",
          due: "Apr 20, 2025",
          status: "locked",
          marks: "— / 60",
        },
      ],
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// GRADES  (keyed by course ID)
// Used by the Grades tab in CourseDetailPage
// ══════════════════════════════════════════════════════════════════════════════
export const GRADES = {
  CS201: {
    overall: "B+ (78%)",
    overallColor: "#2196f3",
    letterGrade: "B+",
    summary: [
      { label: "Assignments",       score: 92,  color: "#2196f3", weight: "30%" },
      { label: "Quizzes",           score: 85,  color: "#9c27b0", weight: "20%" },
      { label: "Lab Sessions",      score: 100, color: "#4caf50", weight: "20%" },
      { label: "Mid-Sem Exam",      score: 68,  color: "#ff9800", weight: "15%" },
      { label: "Overall Completion",score: 58,  color: "#607d8b", weight: "—"   },
    ],
    assignments: [
      { title: "Assignment 1: Linked List Implementation", marks: "48 / 50", grade: "A",  status: "graded",   due: "Feb 28" },
      { title: "Assignment 2: Stack-Based Calculator",     marks: "— / 40",  grade: "—",  status: "pending",  due: "Mar 10" },
      { title: "Assignment 3: Graph Traversal Project",    marks: "— / 60",  grade: "—",  status: "locked",   due: "Apr 2"  },
    ],
    quizzes: [
      { title: "Complexity Basics Quiz",   score: "85 / 100", status: "completed" },
      { title: "Stacks & Queues Quiz",     score: "— / 100",  status: "pending"   },
      { title: "Trees Assessment",         score: "— / 100",  status: "locked"    },
      { title: "Final Chapter Assessment", score: "— / 100",  status: "locked"    },
    ],
  },

  CS301: {
    overall: "A (91%)",
    overallColor: "#4caf50",
    letterGrade: "A",
    summary: [
      { label: "Assignments",       score: 96,  color: "#2196f3", weight: "30%" },
      { label: "Quizzes",           score: 90,  color: "#9c27b0", weight: "20%" },
      { label: "Lab Sessions",      score: 100, color: "#4caf50", weight: "20%" },
      { label: "End-Sem Exam",      score: 88,  color: "#ff9800", weight: "30%" },
      { label: "Overall Completion",score: 100, color: "#607d8b", weight: "—"   },
    ],
    assignments: [
      { title: "Assignment 1: Library DB Schema + Queries",     marks: "50 / 50", grade: "A+", status: "graded", due: "Jan 20" },
      { title: "Assignment 2: ER Design — University System",   marks: "47 / 50", grade: "A",  status: "graded", due: "Feb 10" },
      { title: "Assignment 3: Query Optimisation Report",        marks: "44 / 50", grade: "A-", status: "graded", due: "Mar 5"  },
    ],
    quizzes: [
      { title: "Intro Quiz",                   score: "100 / 100", status: "completed" },
      { title: "Normalisation Quiz",            score: "80 / 100",  status: "completed" },
      { title: "Transactions Quiz",             score: "92 / 100",  status: "completed" },
      { title: "Final Comprehensive Quiz",      score: "90 / 100",  status: "completed" },
    ],
  },

  CS101: {
    overall: "A- (87%)",
    overallColor: "#4caf50",
    letterGrade: "A-",
    summary: [
      { label: "Assignments",       score: 95,  color: "#2196f3", weight: "30%" },
      { label: "Quizzes",           score: 89,  color: "#9c27b0", weight: "20%" },
      { label: "Lab Sessions",      score: 0,   color: "#4caf50", weight: "20%" },
      { label: "Mid-Sem Exam",      score: 82,  color: "#ff9800", weight: "15%" },
      { label: "Overall Completion",score: 56,  color: "#607d8b", weight: "—"   },
    ],
    assignments: [
      { title: "Assignment 1: Number System Conversion Set", marks: "38 / 40", grade: "A-", status: "graded",  due: "Jan 25" },
      { title: "Assignment 2: Python Problem Set",           marks: "— / 50",  grade: "—",  status: "pending", due: "Mar 12" },
      { title: "Final Assignment: OS Case Study",            marks: "— / 60",  grade: "—",  status: "locked",  due: "Apr 15" },
    ],
    quizzes: [
      { title: "Intro Quiz",           score: "88 / 100", status: "completed" },
      { title: "Boolean Logic Quiz",   score: "90 / 100", status: "completed" },
      { title: "Computer Organisation Quiz", score: "— / 100", status: "locked" },
    ],
  },

  MA401: {
    overall: "C+ (64%)",
    overallColor: "#ff9800",
    letterGrade: "C+",
    summary: [
      { label: "Assignments",       score: 0,  color: "#2196f3", weight: "30%" },
      { label: "Quizzes",           score: 78, color: "#9c27b0", weight: "20%" },
      { label: "Lab Sessions",      score: 0,  color: "#4caf50", weight: "20%" },
      { label: "Mid-Sem Exam",      score: 55, color: "#ff9800", weight: "15%" },
      { label: "Overall Completion",score: 38, color: "#607d8b", weight: "—"   },
    ],
    assignments: [
      { title: "Assignment 1: Laplace Problem Set",         marks: "— / 40", grade: "—", status: "pending", due: "Feb 22" },
      { title: "Final Assignment: Numerical Analysis Report", marks: "— / 60", grade: "—", status: "locked",  due: "Apr 20" },
    ],
    quizzes: [
      { title: "Fourier Series Quiz",    score: "78 / 100", status: "completed" },
      { title: "Complex Analysis Quiz",  score: "— / 100",  status: "locked"    },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════

/** Returns 0–100 progress percentage for a course */
export const getProgress = (course) =>
  course.totalContent === 0
    ? 0
    : Math.round((course.completedContent / course.totalContent) * 100);

/** Human-readable status label */
export const getStatusLabel = (status) =>
  ({
    completed:   "Completed",
    in_progress: "In Progress",
    locked:      "Locked",
  }[status] || status);

/** Compute per-chapter done/total from items */
export const getChapterProgress = (chapter) => {
  const total = chapter.items.length;
  const done = chapter.items.filter(
    (i) => i.status === "completed" || i.status === "submitted"
  ).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
};

/** Flatten all assignments from chapters of a cours */
export const getAssignments = (courseId) =>
  (CHAPTERS[courseId] || []).flatMap((ch) =>
    ch.items.filter((i) => i.type === "assignment" || i.type === "quiz")
  );

/** Count completed items across all chapters */
export const getCourseItemStats = (courseId) => {
  const chapters = CHAPTERS[courseId] || [];
  const totalItems = chapters.reduce((s, ch) => s + ch.items.length, 0);
  const doneItems = chapters.reduce(
    (s, ch) =>
      s +
      ch.items.filter(
        (i) => i.status === "completed" || i.status === "submitted"
      ).length,
    0
  );
  return { totalItems, doneItems };
};