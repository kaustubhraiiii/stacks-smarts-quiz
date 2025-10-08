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
  {
    id: 'net-easy-3',
    topic: 'networks',
    difficulty: 'easy',
    question: 'What is the standard port number for HTTP?',
    options: ['80', '443', '8080', '3000'],
    correctAnswer: 0,
    hint: 'This is the default port for unencrypted web traffic.',
    explanation: 'Port 80 is the standard port for HTTP (Hypertext Transfer Protocol) traffic.'
  },
  {
    id: 'net-easy-4',
    topic: 'networks',
    difficulty: 'easy',
    question: 'What does DNS stand for?',
    options: ['Domain Name System', 'Data Network Service', 'Digital Network Server', 'Direct Name Space'],
    correctAnswer: 0,
    hint: 'It translates human-readable website names into IP addresses.',
    explanation: 'DNS (Domain Name System) resolves domain names like google.com into IP addresses.'
  },
  {
    id: 'net-easy-5',
    topic: 'networks',
    difficulty: 'easy',
    question: 'Which protocol is used for sending email?',
    options: ['FTP', 'SMTP', 'POP3', 'IMAP'],
    correctAnswer: 1,
    hint: 'The name literally says "Simple Mail Transfer".',
    explanation: 'SMTP (Simple Mail Transfer Protocol) is used for sending emails between servers.'
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
  {
    id: 'net-med-3',
    topic: 'networks',
    difficulty: 'medium',
    question: 'What is the purpose of ARP (Address Resolution Protocol)?',
    options: [
      'Map IP addresses to MAC addresses',
      'Encrypt network traffic',
      'Route packets between networks',
      'Compress data for transmission'
    ],
    correctAnswer: 0,
    hint: 'Think about how devices find each other on a local network.',
    explanation: 'ARP resolves IP addresses to MAC addresses, enabling communication on a local network.'
  },
  {
    id: 'net-med-4',
    topic: 'networks',
    difficulty: 'medium',
    question: 'In the TCP three-way handshake, what is the correct order of flags?',
    options: ['SYN, ACK, SYN-ACK', 'SYN, SYN-ACK, ACK', 'ACK, SYN, SYN-ACK', 'SYN-ACK, SYN, ACK'],
    correctAnswer: 1,
    hint: 'The client initiates, server responds, then client acknowledges.',
    explanation: 'The TCP handshake follows: Client sends SYN, Server responds with SYN-ACK, Client sends ACK.'
  },
  {
    id: 'net-med-5',
    topic: 'networks',
    difficulty: 'medium',
    question: 'What is the main difference between TCP and UDP?',
    options: [
      'TCP is faster than UDP',
      'TCP provides reliable delivery, UDP does not',
      'UDP encrypts data, TCP does not',
      'TCP works only on LANs'
    ],
    correctAnswer: 1,
    hint: 'Think about guarantees of data delivery.',
    explanation: 'TCP provides reliable, ordered delivery with error checking, while UDP is connectionless and does not guarantee delivery.'
  },
  {
    id: 'net-med-6',
    topic: 'networks',
    difficulty: 'medium',
    question: 'What does NAT stand for and what is its primary purpose?',
    options: [
      'Network Access Token - for authentication',
      'Network Address Translation - to map private IPs to public IPs',
      'Node Allocation Table - for routing',
      'Network Authorization Tool - for security'
    ],
    correctAnswer: 1,
    hint: 'It helps conserve public IP addresses.',
    explanation: 'NAT (Network Address Translation) allows multiple devices on a private network to share a single public IP address.'
  },
  {
    id: 'net-med-7',
    topic: 'networks',
    difficulty: 'medium',
    question: 'What is the purpose of a subnet mask?',
    options: [
      'To encrypt network traffic',
      'To divide an IP address into network and host portions',
      'To filter malicious packets',
      'To prioritize network traffic'
    ],
    correctAnswer: 1,
    hint: 'It helps determine which part of an IP belongs to the network vs the host.',
    explanation: 'A subnet mask divides an IP address into network and host portions, enabling network segmentation.'
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
  {
    id: 'net-hard-2',
    topic: 'networks',
    difficulty: 'hard',
    question: 'What is the purpose of TCP window scaling?',
    options: [
      'To compress data before transmission',
      'To allow TCP window sizes larger than 64KB',
      'To prioritize certain packets',
      'To encrypt the TCP header'
    ],
    correctAnswer: 1,
    hint: 'Think about high-bandwidth, high-latency networks.',
    explanation: 'Window scaling extends the TCP window size beyond the original 16-bit limit (64KB), enabling better performance on high-speed networks.'
  },
  {
    id: 'net-hard-3',
    topic: 'networks',
    difficulty: 'hard',
    question: 'In OSPF, what is the purpose of a Designated Router (DR)?',
    options: [
      'To encrypt routing updates',
      'To reduce the number of adjacencies on multi-access networks',
      'To provide backup routing paths',
      'To translate between different routing protocols'
    ],
    correctAnswer: 1,
    hint: 'Think about efficiency in broadcast networks.',
    explanation: 'The DR reduces routing protocol overhead by centralizing adjacency formation on multi-access networks like Ethernet.'
  },
  {
    id: 'net-hard-4',
    topic: 'networks',
    difficulty: 'hard',
    question: 'What is the main advantage of using MPLS over traditional IP routing?',
    options: [
      'Better encryption',
      'Traffic engineering and QoS through label-based forwarding',
      'Lower cost',
      'Simpler configuration'
    ],
    correctAnswer: 1,
    hint: 'Think about how labels enable flexible path selection.',
    explanation: 'MPLS uses labels for fast forwarding decisions and enables sophisticated traffic engineering and QoS policies.'
  },
  {
    id: 'net-hard-5',
    topic: 'networks',
    difficulty: 'hard',
    question: 'What is TCP congestion avoidance and when does it occur?',
    options: [
      'A method to encrypt congested traffic',
      'An algorithm that reduces transmission rate after detecting congestion',
      'A protocol to reroute traffic around congested areas',
      'A technique to compress data during high traffic'
    ],
    correctAnswer: 1,
    hint: 'Consider how TCP responds when it detects packet loss.',
    explanation: 'TCP congestion avoidance reduces the sending rate when packet loss is detected, using algorithms like slow start, congestion avoidance, fast retransmit, and fast recovery.'
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
  {
    id: 'os-easy-3',
    topic: 'operating-systems',
    difficulty: 'easy',
    question: 'What is virtual memory?',
    options: [
      'Memory that doesn\'t exist',
      'A technique that uses disk space as an extension of RAM',
      'Encrypted memory',
      'Memory reserved for the OS'
    ],
    correctAnswer: 1,
    hint: 'Think about how systems handle more data than physical RAM.',
    explanation: 'Virtual memory uses disk storage to extend RAM, allowing systems to run larger programs.'
  },
  {
    id: 'os-easy-4',
    topic: 'operating-systems',
    difficulty: 'easy',
    question: 'What is the main purpose of an operating system?',
    options: [
      'To provide internet connectivity',
      'To manage hardware and software resources',
      'To create documents',
      'To prevent viruses'
    ],
    correctAnswer: 1,
    hint: 'Think about the core role of system software.',
    explanation: 'An OS manages computer hardware and software resources, providing common services for programs.'
  },
  {
    id: 'os-easy-5',
    topic: 'operating-systems',
    difficulty: 'easy',
    question: 'What is multitasking in an operating system?',
    options: [
      'Running multiple processors',
      'Executing multiple programs concurrently',
      'Having multiple users',
      'Using multiple monitors'
    ],
    correctAnswer: 1,
    hint: 'Think about running several applications at the same time.',
    explanation: 'Multitasking allows an OS to execute multiple programs concurrently by rapidly switching between them.'
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
  {
    id: 'os-med-3',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is thrashing in an operating system?',
    options: [
      'When a disk fails',
      'When the system spends more time paging than executing',
      'When a process crashes repeatedly',
      'When network traffic is too high'
    ],
    correctAnswer: 1,
    hint: 'Think about excessive page swapping.',
    explanation: 'Thrashing occurs when a system spends most of its time swapping pages in and out of memory rather than executing processes.'
  },
  {
    id: 'os-med-4',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is a semaphore used for?',
    options: [
      'Memory allocation',
      'Process synchronization',
      'File compression',
      'Network communication'
    ],
    correctAnswer: 1,
    hint: 'Think about coordinating access to shared resources.',
    explanation: 'A semaphore is a synchronization tool used to control access to shared resources and coordinate processes.'
  },
  {
    id: 'os-med-5',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is the difference between internal and external fragmentation?',
    options: [
      'Internal is in RAM, external is on disk',
      'Internal wastes space within allocated blocks, external wastes space between blocks',
      'Internal affects files, external affects processes',
      'Internal is fixable, external is not'
    ],
    correctAnswer: 1,
    hint: 'Think about where the wasted space occurs.',
    explanation: 'Internal fragmentation wastes space within allocated memory blocks, while external fragmentation wastes space between allocated blocks.'
  },
  {
    id: 'os-med-6',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is context switching?',
    options: [
      'Switching between user and kernel mode',
      'Saving and loading process state when switching between processes',
      'Changing file systems',
      'Updating system settings'
    ],
    correctAnswer: 1,
    hint: 'Think about what happens when the CPU switches from one process to another.',
    explanation: 'Context switching is the process of storing and restoring the state of a process so execution can resume from the same point later.'
  },
  {
    id: 'os-med-7',
    topic: 'operating-systems',
    difficulty: 'medium',
    question: 'What is the purpose of the TLB (Translation Lookaside Buffer)?',
    options: [
      'To cache frequently used files',
      'To speed up virtual-to-physical address translation',
      'To buffer network packets',
      'To store process scheduling information'
    ],
    correctAnswer: 1,
    hint: 'Think about speeding up memory access in virtual memory systems.',
    explanation: 'The TLB caches recent virtual-to-physical address translations, significantly speeding up memory access.'
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
  {
    id: 'os-hard-2',
    topic: 'operating-systems',
    difficulty: 'hard',
    question: 'What is the difference between a microkernel and a monolithic kernel?',
    options: [
      'Microkernel is smaller in size',
      'Microkernel runs most services in user space, monolithic runs them in kernel space',
      'Microkernel is faster',
      'Microkernel supports fewer devices'
    ],
    correctAnswer: 1,
    hint: 'Think about where services like device drivers and file systems run.',
    explanation: 'Microkernels run minimal services in kernel space (IPC, scheduling) with most services in user space, while monolithic kernels run all OS services in kernel space.'
  },
  {
    id: 'os-hard-3',
    topic: 'operating-systems',
    difficulty: 'hard',
    question: 'What is the optimal page replacement algorithm and why is it not practical?',
    options: [
      'LRU - requires too much memory',
      'FIFO - too slow',
      'Optimal - requires future knowledge',
      'Clock - too complex'
    ],
    correctAnswer: 2,
    hint: 'Think about what information would be needed to make perfect decisions.',
    explanation: 'The optimal algorithm replaces the page that won\'t be used for the longest time, but it requires knowing future page references, making it impractical.'
  },
  {
    id: 'os-hard-4',
    topic: 'operating-systems',
    difficulty: 'hard',
    question: 'What is the working set model in memory management?',
    options: [
      'The total memory used by all processes',
      'The set of pages a process needs in memory to avoid thrashing',
      'The available free memory',
      'The cache size'
    ],
    correctAnswer: 1,
    hint: 'Consider what pages a process actively needs to run efficiently.',
    explanation: 'The working set is the set of pages a process has referenced recently and needs in memory to execute efficiently without excessive page faults.'
  },
  {
    id: 'os-hard-5',
    topic: 'operating-systems',
    difficulty: 'hard',
    question: 'What is the difference between preemptive and non-preemptive scheduling?',
    options: [
      'Preemptive is faster',
      'Preemptive can interrupt running processes, non-preemptive cannot',
      'Preemptive uses less memory',
      'Preemptive only works on multi-core systems'
    ],
    correctAnswer: 1,
    hint: 'Think about whether the OS can forcibly take the CPU away from a process.',
    explanation: 'Preemptive scheduling allows the OS to interrupt a running process to schedule another, while non-preemptive waits for the process to voluntarily yield.'
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
  {
    id: 'db-easy-3',
    topic: 'databases',
    difficulty: 'easy',
    question: 'What is a primary key?',
    options: [
      'The first column in a table',
      'A unique identifier for each row',
      'An encrypted password',
      'The most important data'
    ],
    correctAnswer: 1,
    hint: 'Think about what uniquely identifies each record.',
    explanation: 'A primary key is a unique identifier that distinguishes each row in a table.'
  },
  {
    id: 'db-easy-4',
    topic: 'databases',
    difficulty: 'easy',
    question: 'Which SQL command is used to add new data?',
    options: ['ADD', 'INSERT', 'PUT', 'CREATE'],
    correctAnswer: 1,
    hint: 'Think about putting new records into a table.',
    explanation: 'INSERT is used to add new rows of data into database tables.'
  },
  {
    id: 'db-easy-5',
    topic: 'databases',
    difficulty: 'easy',
    question: 'What does CRUD stand for?',
    options: [
      'Create, Read, Update, Delete',
      'Copy, Run, Upload, Download',
      'Connect, Retrieve, Use, Drop',
      'Collect, Review, Utilize, Dispose'
    ],
    correctAnswer: 0,
    hint: 'These are the four basic database operations.',
    explanation: 'CRUD represents the four basic operations: Create, Read, Update, and Delete.'
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
  {
    id: 'db-med-3',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is database normalization?',
    options: [
      'Making data the same format',
      'Organizing data to reduce redundancy',
      'Encrypting sensitive information',
      'Backing up the database'
    ],
    correctAnswer: 1,
    hint: 'Think about eliminating duplicate data.',
    explanation: 'Normalization is the process of organizing database tables to minimize redundancy and dependency.'
  },
  {
    id: 'db-med-4',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is an index in a database?',
    options: [
      'The first page of documentation',
      'A data structure that improves query speed',
      'A list of all tables',
      'A backup copy'
    ],
    correctAnswer: 1,
    hint: 'Think about speeding up data retrieval.',
    explanation: 'An index is a data structure that improves the speed of data retrieval operations on a database table.'
  },
  {
    id: 'db-med-5',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      'INNER JOIN is faster',
      'INNER JOIN returns only matching rows, LEFT JOIN returns all left table rows',
      'LEFT JOIN is for text data',
      'They are the same'
    ],
    correctAnswer: 1,
    hint: 'Consider what happens to non-matching rows.',
    explanation: 'INNER JOIN returns only rows with matches in both tables, while LEFT JOIN returns all rows from the left table plus matching rows from the right.'
  },
  {
    id: 'db-med-6',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is a transaction in databases?',
    options: [
      'A financial record',
      'A sequence of operations treated as a single unit',
      'A type of table',
      'A backup operation'
    ],
    correctAnswer: 1,
    hint: 'Think about operations that must either fully succeed or fully fail.',
    explanation: 'A transaction is a sequence of database operations that are executed as a single logical unit of work, following ACID properties.'
  },
  {
    id: 'db-med-7',
    topic: 'databases',
    difficulty: 'medium',
    question: 'What is the purpose of the GROUP BY clause?',
    options: [
      'To sort results',
      'To combine multiple tables',
      'To aggregate data by grouping rows with the same values',
      'To filter results'
    ],
    correctAnswer: 2,
    hint: 'Think about summarizing data by categories.',
    explanation: 'GROUP BY groups rows that have the same values in specified columns, often used with aggregate functions like COUNT, SUM, AVG.'
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
  },
  {
    id: 'db-hard-2',
    topic: 'databases',
    difficulty: 'hard',
    question: 'What is the CAP theorem?',
    options: [
      'A database optimization technique',
      'You can only guarantee 2 of: Consistency, Availability, Partition tolerance',
      'A method for data encryption',
      'A backup strategy'
    ],
    correctAnswer: 1,
    hint: 'Think about trade-offs in distributed systems.',
    explanation: 'The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency, Availability, and Partition tolerance.'
  },
  {
    id: 'db-hard-3',
    topic: 'databases',
    difficulty: 'hard',
    question: 'What is denormalization and when should it be used?',
    options: [
      'Removing all indexes',
      'Adding redundancy to improve read performance',
      'Deleting old data',
      'Encrypting the database'
    ],
    correctAnswer: 1,
    hint: 'Consider trading normalization for query speed.',
    explanation: 'Denormalization adds redundancy to normalized tables to improve read performance, trading storage and update complexity for faster queries.'
  },
  {
    id: 'db-hard-4',
    topic: 'databases',
    difficulty: 'hard',
    question: 'What is the difference between optimistic and pessimistic locking?',
    options: [
      'Optimistic is faster',
      'Optimistic assumes conflicts are rare, pessimistic locks immediately',
      'Pessimistic uses more memory',
      'They are the same'
    ],
    correctAnswer: 1,
    hint: 'Think about when locks are acquired.',
    explanation: 'Optimistic locking assumes conflicts are rare and checks for conflicts at commit time, while pessimistic locking acquires locks immediately and holds them until commit.'
  },
  {
    id: 'db-hard-5',
    topic: 'databases',
    difficulty: 'hard',
    question: 'What is the purpose of MVCC (Multi-Version Concurrency Control)?',
    options: [
      'To backup multiple versions',
      'To allow concurrent transactions without locking by maintaining multiple data versions',
      'To compress data',
      'To replicate across servers'
    ],
    correctAnswer: 1,
    hint: 'Think about how to avoid locking for reads.',
    explanation: 'MVCC allows multiple transactions to access the same data concurrently by maintaining multiple versions of data, eliminating the need for read locks.'
  }
];

export const getQuestionsByTopicAndDifficulty = (
  topic: Question['topic'],
  difficulty: Question['difficulty']
): Question[] => {
  return questions.filter(q => q.topic === topic && q.difficulty === difficulty);
};
