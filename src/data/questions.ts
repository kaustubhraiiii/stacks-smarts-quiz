import { Question } from '@/types/quiz';

export const questions: Question[] = [
  // Networks - Easy
  {
    id: 'net-easy-1',
    topic: 'networks',
    difficulty: 'easy',
    question: 'What does IP stand for in networking?',
    options: ['Internet Protocol', 'Internal Program', 'Integrated Process', 'Input Port'],
    correctAnswer: 0,
    hint: 'Think about the protocol used for addressing devices on the internet.',
    explanation: 'IP stands for Internet Protocol, which is used for addressing and routing packets across networks.'
  },
  {
    id: 'net-easy-2',
    topic: 'networks',
    difficulty: 'easy',
    question: 'Which layer of the OSI model is responsible for routing?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    correctAnswer: 2,
    hint: 'This layer deals with logical addressing and path determination.',
    explanation: 'The Network Layer (Layer 3) handles routing and forwarding of packets between networks.'
  },
  
  // Networks - Medium
  {
    id: 'net-med-1',
    topic: 'networks',
    difficulty: 'medium',
    question: 'What is the maximum segment size in TCP called?',
    options: ['MTU', 'MSS', 'MRU', 'MDU'],
    correctAnswer: 1,
    hint: 'It\'s related to the maximum amount of data in a single TCP segment.',
    explanation: 'MSS (Maximum Segment Size) defines the largest amount of data that can be received in a single TCP segment.'
  },
  {
    id: 'net-med-2',
    topic: 'networks',
    difficulty: 'medium',
    question: 'Which protocol uses port 443 by default?',
    options: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
    correctAnswer: 1,
    hint: 'Think about secure web browsing.',
    explanation: 'HTTPS (HTTP Secure) uses port 443 for encrypted web communications.'
  },
  
  // Networks - Hard
  {
    id: 'net-hard-1',
    topic: 'networks',
    difficulty: 'hard',
    question: 'In BGP, what is the purpose of the AS_PATH attribute?',
    options: [
      'To define routing policies',
      'To prevent routing loops',
      'To measure link bandwidth',
      'To authenticate peers'
    ],
    correctAnswer: 1,
    hint: 'Consider how BGP prevents packets from circulating endlessly.',
    explanation: 'The AS_PATH attribute lists all autonomous systems a route has traversed, preventing routing loops by rejecting routes that contain the local AS number.'
  },
  
  // Operating Systems - Easy
  {
    id: 'os-easy-1',
    topic: 'operating-systems',
    difficulty: 'easy',
    question: 'What does OS stand for?',
    options: ['Open Source', 'Operating System', 'Optical Sensor', 'Output Stream'],
    correctAnswer: 1,
    hint: 'It\'s the software that manages computer hardware and software resources.',
    explanation: 'OS stands for Operating System, which manages hardware resources and provides services for programs.'
  },
  {
    id: 'os-easy-2',
    topic: 'operating-systems',
    difficulty: 'easy',
    question: 'Which of these is NOT a process state?',
    options: ['Running', 'Ready', 'Waiting', 'Sleeping'],
    correctAnswer: 3,
    hint: 'Think about the standard process state models.',
    explanation: 'While "Sleeping" might be used informally, the standard process states are Running, Ready, and Waiting (or Blocked).'
  },
  
  // Operating Systems - Medium
  {
    id: 'os-med-1',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What scheduling algorithm can lead to starvation?',
    options: ['Round Robin', 'First Come First Serve', 'Priority Scheduling', 'Shortest Job First'],
    correctAnswer: 2,
    hint: 'Consider which algorithm might never execute low-priority processes.',
    explanation: 'Priority Scheduling can cause starvation when high-priority processes continuously arrive, preventing low-priority processes from executing.'
  },
  {
    id: 'os-med-2',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is a page fault?',
    options: [
      'A hardware error in RAM',
      'An access to a page not in physical memory',
      'A corrupted disk sector',
      'A network connection failure'
    ],
    correctAnswer: 1,
    hint: 'Think about virtual memory management.',
    explanation: 'A page fault occurs when a program accesses a page that is mapped in the virtual address space but not loaded in physical memory.'
  },
  
  // Operating Systems - Hard
  {
    id: 'os-hard-1',
    topic: 'operating-systems',
    difficulty: 'hard',
    question: 'Which condition is NOT necessary for deadlock to occur?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Priority Inversion',
      'Circular Wait'
    ],
    correctAnswer: 2,
    hint: 'Remember the four Coffman conditions for deadlock.',
    explanation: 'The four necessary conditions for deadlock are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Priority Inversion is a different concurrency problem.'
  },
  
  // Databases - Easy
  {
    id: 'db-easy-1',
    topic: 'databases',
    difficulty: 'easy',
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Question Language',
      'System Quality Level',
      'Standard Queue List'
    ],
    correctAnswer: 0,
    hint: 'It\'s the language used to communicate with databases.',
    explanation: 'SQL stands for Structured Query Language, used for managing and querying relational databases.'
  },
  {
    id: 'db-easy-2',
    topic: 'databases',
    difficulty: 'easy',
    question: 'Which SQL command is used to retrieve data?',
    options: ['GET', 'SELECT', 'RETRIEVE', 'FETCH'],
    correctAnswer: 1,
    hint: 'It\'s one of the most common SQL commands.',
    explanation: 'SELECT is the SQL command used to query and retrieve data from database tables.'
  },
  
  // Databases - Medium
  {
    id: 'db-med-1',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is a foreign key?',
    options: [
      'A key from another database',
      'A unique identifier for a table',
      'A field that references a primary key in another table',
      'An encrypted key for security'
    ],
    correctAnswer: 2,
    hint: 'Think about how tables are related to each other.',
    explanation: 'A foreign key is a field that creates a link between two tables by referencing the primary key of another table.'
  },
  {
    id: 'db-med-2',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What does ACID stand for in database transactions?',
    options: [
      'Atomic, Consistent, Isolated, Durable',
      'Automated, Centralized, Integrated, Distributed',
      'Aligned, Compressed, Indexed, Documented',
      'Active, Complete, Independent, Dynamic'
    ],
    correctAnswer: 0,
    hint: 'These are the four key properties of reliable database transactions.',
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - the four properties that guarantee reliable transaction processing.'
  },
  
  // Databases - Hard
  {
    id: 'db-hard-1',
    topic: 'databases',
    difficulty: 'hard',
    question: 'What is the main advantage of using B+ trees over B trees in databases?',
    options: [
      'Better space efficiency',
      'Faster insertion operations',
      'Sequential access is more efficient',
      'Simpler implementation'
    ],
    correctAnswer: 2,
    hint: 'Consider how data is stored in leaf nodes and how range queries work.',
    explanation: 'B+ trees store all data in leaf nodes with links between them, making sequential access and range queries more efficient than B trees.'
  }
];

export const getQuestionsByTopicAndDifficulty = (
  topic: Question['topic'],
  difficulty: Question['difficulty']
): Question[] => {
  return questions.filter(q => q.topic === topic && q.difficulty === difficulty);
};
