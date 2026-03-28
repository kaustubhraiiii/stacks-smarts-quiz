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
  },

  // Generative AI - Easy
  { id: 'gai-easy-1', topic: 'generative-ai', difficulty: 'easy', question: 'What does LLM stand for?', options: ['Large Language Model', 'Linear Logic Machine', 'Layered Learning Module', 'Long Loop Memory'], correctAnswer: 0, hint: 'Think about AI models that process language.', explanation: 'LLM stands for Large Language Model — a neural network trained on vast text data to understand and generate language.' },
  { id: 'gai-easy-2', topic: 'generative-ai', difficulty: 'easy', question: 'What is prompt engineering?', options: ['Building hardware prompts', 'Crafting effective inputs for AI models', 'Programming alert systems', 'Designing UI notifications'], correctAnswer: 1, hint: 'Think about how you communicate with an AI.', explanation: 'Prompt engineering is the practice of designing effective inputs (prompts) to get desired outputs from AI models.' },
  { id: 'gai-easy-3', topic: 'generative-ai', difficulty: 'easy', question: 'Which architecture is the foundation of most modern LLMs?', options: ['CNN', 'RNN', 'Transformer', 'GAN'], correctAnswer: 2, hint: 'It was introduced in the paper "Attention Is All You Need".', explanation: 'The Transformer architecture, introduced in 2017, uses self-attention mechanisms and is the basis for GPT, BERT, and most modern LLMs.' },
  { id: 'gai-easy-4', topic: 'generative-ai', difficulty: 'easy', question: 'What does "generative" mean in generative AI?', options: ['It generates electricity', 'It creates new content', 'It classifies existing data', 'It compresses files'], correctAnswer: 1, hint: 'Think about what makes it different from analytical AI.', explanation: 'Generative AI creates new content (text, images, code, etc.) rather than just analyzing or classifying existing data.' },
  // Generative AI - Medium
  { id: 'gai-med-1', topic: 'generative-ai', difficulty: 'medium', question: 'What is RAG in the context of LLMs?', options: ['Random Access Generation', 'Retrieval-Augmented Generation', 'Recursive Algorithm Gateway', 'Reinforcement-Aligned Generation'], correctAnswer: 1, hint: 'It combines retrieval of external knowledge with generation.', explanation: 'RAG (Retrieval-Augmented Generation) enhances LLM outputs by retrieving relevant documents from a knowledge base before generating a response.' },
  { id: 'gai-med-2', topic: 'generative-ai', difficulty: 'medium', question: 'What is the purpose of fine-tuning a language model?', options: ['Making it run faster', 'Adapting it to a specific task or domain', 'Reducing its size', 'Converting it to a different language'], correctAnswer: 1, hint: 'Think about customization for a particular use case.', explanation: 'Fine-tuning trains a pre-trained model on task-specific data to improve its performance for that particular domain or use case.' },
  { id: 'gai-med-3', topic: 'generative-ai', difficulty: 'medium', question: 'What is a "hallucination" in AI?', options: ['When the GPU overheats', 'When the model generates plausible but incorrect information', 'When training data is corrupted', 'When the model crashes'], correctAnswer: 1, hint: 'It sounds confident but is making things up.', explanation: 'AI hallucination occurs when a model generates content that sounds plausible and confident but is factually incorrect or fabricated.' },
  // Generative AI - Hard
  { id: 'gai-hard-1', topic: 'generative-ai', difficulty: 'hard', question: 'What is the key mechanism in transformers that allows processing all tokens simultaneously?', options: ['Backpropagation', 'Self-attention', 'Pooling', 'Convolution'], correctAnswer: 1, hint: 'It computes relationships between all positions in a sequence.', explanation: 'Self-attention (scaled dot-product attention) allows each token to attend to all other tokens in parallel, enabling efficient long-range dependency modeling.' },
  { id: 'gai-hard-2', topic: 'generative-ai', difficulty: 'hard', question: 'What is RLHF used for in LLM training?', options: ['Optimizing inference speed', 'Aligning model outputs with human preferences', 'Reducing model parameters', 'Data augmentation'], correctAnswer: 1, hint: 'Think about how models learn what humans consider good responses.', explanation: 'RLHF (Reinforcement Learning from Human Feedback) fine-tunes models using human preference data to produce outputs that are more helpful, harmless, and honest.' },
  { id: 'gai-hard-3', topic: 'generative-ai', difficulty: 'hard', question: 'In diffusion models, what happens during the reverse process?', options: ['Noise is added to the image', 'The model learns to gradually denoise data', 'Features are extracted', 'Data is compressed'], correctAnswer: 1, hint: 'The forward process adds noise; the reverse does the opposite.', explanation: 'During the reverse diffusion process, the model learns to iteratively remove noise from corrupted data, gradually reconstructing a clean sample from pure noise.' },

  // Machine Learning - Easy
  { id: 'ml-easy-1', topic: 'machine-learning', difficulty: 'easy', question: 'What is supervised learning?', options: ['Learning without any data', 'Learning from labeled examples', 'Learning by trial and error', 'Learning from unlabeled data'], correctAnswer: 1, hint: 'The model has a "supervisor" providing correct answers.', explanation: 'Supervised learning trains models on labeled data where both input features and correct outputs are provided.' },
  { id: 'ml-easy-2', topic: 'machine-learning', difficulty: 'easy', question: 'Which is an example of a classification problem?', options: ['Predicting house prices', 'Spam email detection', 'Forecasting stock trends', 'Estimating temperature'], correctAnswer: 1, hint: 'Classification assigns categories, not continuous values.', explanation: 'Spam detection classifies emails into categories (spam or not spam), making it a classification problem.' },
  { id: 'ml-easy-3', topic: 'machine-learning', difficulty: 'easy', question: 'What is a neural network inspired by?', options: ['Computer circuits', 'The human brain', 'Database schemas', 'Internet protocols'], correctAnswer: 1, hint: 'Think about biological information processing.', explanation: 'Neural networks are inspired by the structure and function of biological neurons in the human brain.' },
  { id: 'ml-easy-4', topic: 'machine-learning', difficulty: 'easy', question: 'What is the goal of regression in ML?', options: ['Classify into categories', 'Predict a continuous numerical value', 'Cluster similar data', 'Reduce dimensions'], correctAnswer: 1, hint: 'Think about predicting numbers, not labels.', explanation: 'Regression predicts continuous values (like price, temperature, age) as opposed to classification which predicts categories.' },
  // Machine Learning - Medium
  { id: 'ml-med-1', topic: 'machine-learning', difficulty: 'medium', question: 'What is the bias-variance tradeoff?', options: ['Trading accuracy for speed', 'Balancing underfitting (bias) and overfitting (variance)', 'Choosing between CPU and GPU', 'Selecting between classification and regression'], correctAnswer: 1, hint: 'It is about model complexity and generalization.', explanation: 'The bias-variance tradeoff describes how increasing model complexity reduces bias (underfitting) but increases variance (overfitting), and vice versa.' },
  { id: 'ml-med-2', topic: 'machine-learning', difficulty: 'medium', question: 'What does cross-validation help with?', options: ['Data visualization', 'Estimating model performance on unseen data', 'Feature extraction', 'Data cleaning'], correctAnswer: 1, hint: 'It uses multiple train/test splits.', explanation: 'Cross-validation splits data into multiple folds and trains/tests on each combination to give a more reliable estimate of model performance.' },
  { id: 'ml-med-3', topic: 'machine-learning', difficulty: 'medium', question: 'What is the purpose of a loss function?', options: ['To delete bad data', 'To measure how wrong the model predictions are', 'To compress model weights', 'To speed up training'], correctAnswer: 1, hint: 'The model tries to minimize it during training.', explanation: 'A loss function quantifies how far the model predictions are from the actual values, guiding the optimization process during training.' },
  // Machine Learning - Hard
  { id: 'ml-hard-1', topic: 'machine-learning', difficulty: 'hard', question: 'What is the vanishing gradient problem?', options: ['Gradients become too large during training', 'Gradients approach zero in deep networks, preventing learning', 'Model weights become negative', 'Training data runs out'], correctAnswer: 1, hint: 'Think about what happens to gradients in very deep networks.', explanation: 'In deep networks, gradients can become extremely small as they are backpropagated through many layers, making early layers learn very slowly or not at all.' },
  { id: 'ml-hard-2', topic: 'machine-learning', difficulty: 'hard', question: 'What is the difference between L1 and L2 regularization?', options: ['L1 is faster than L2', 'L1 promotes sparsity, L2 distributes weights evenly', 'L2 is for classification only', 'They are identical'], correctAnswer: 1, hint: 'Consider what each does to the weight values.', explanation: 'L1 (Lasso) adds absolute weight values to the loss, driving some to exactly zero (feature selection). L2 (Ridge) adds squared weights, shrinking them uniformly without zeroing.' },
  { id: 'ml-hard-3', topic: 'machine-learning', difficulty: 'hard', question: 'What is an ensemble method in machine learning?', options: ['Using a single powerful model', 'Combining multiple models to improve predictions', 'Training on a single data point', 'Using only unsupervised learning'], correctAnswer: 1, hint: 'Think about the wisdom of crowds.', explanation: 'Ensemble methods combine predictions from multiple models (bagging, boosting, stacking) to achieve better performance than any individual model.' },

  // Cloud Computing - Easy
  { id: 'cc-easy-1', topic: 'cloud-computing', difficulty: 'easy', question: 'What does IaaS stand for?', options: ['Internet as a Service', 'Infrastructure as a Service', 'Integration as a System', 'Information as a Solution'], correctAnswer: 1, hint: 'Think about virtualized computing resources.', explanation: 'IaaS (Infrastructure as a Service) provides virtualized computing resources like servers, storage, and networking over the internet.' },
  { id: 'cc-easy-2', topic: 'cloud-computing', difficulty: 'easy', question: 'Which of these is a major cloud provider?', options: ['Oracle Forms', 'AWS', 'MySQL', 'Linux'], correctAnswer: 1, hint: 'It is a subsidiary of Amazon.', explanation: 'AWS (Amazon Web Services) is one of the three major cloud providers, alongside Microsoft Azure and Google Cloud Platform.' },
  { id: 'cc-easy-3', topic: 'cloud-computing', difficulty: 'easy', question: 'What is SaaS?', options: ['Storage as a Service', 'Software as a Service', 'Security as a System', 'Server as a Solution'], correctAnswer: 1, hint: 'Think about using software through a web browser.', explanation: 'SaaS (Software as a Service) delivers applications over the internet on a subscription basis — like Gmail, Slack, or Salesforce.' },
  { id: 'cc-easy-4', topic: 'cloud-computing', difficulty: 'easy', question: 'What is the main benefit of cloud computing?', options: ['Requires no internet', 'Pay only for what you use with on-demand scaling', 'Eliminates all security risks', 'Faster than local hardware always'], correctAnswer: 1, hint: 'Think about elasticity and cost.', explanation: 'Cloud computing allows on-demand scaling and pay-as-you-go pricing, eliminating the need for upfront hardware investment.' },
  // Cloud Computing - Medium
  { id: 'cc-med-1', topic: 'cloud-computing', difficulty: 'medium', question: 'What is a container in cloud computing?', options: ['A physical server rack', 'A lightweight, portable package for running applications', 'A type of database', 'A network switch'], correctAnswer: 1, hint: 'Think about Docker.', explanation: 'A container packages an application and its dependencies into a standardized unit that runs consistently across any environment.' },
  { id: 'cc-med-2', topic: 'cloud-computing', difficulty: 'medium', question: 'What is serverless computing?', options: ['Computing without any servers', 'A model where the cloud provider manages server infrastructure', 'Running code on local machines', 'A type of bare-metal hosting'], correctAnswer: 1, hint: 'Servers still exist, but you do not manage them.', explanation: 'Serverless computing lets developers run code without provisioning servers — the provider handles scaling, patching, and capacity management.' },
  { id: 'cc-med-3', topic: 'cloud-computing', difficulty: 'medium', question: 'What is a VPC?', options: ['Virtual Private Computer', 'Virtual Private Cloud', 'Verified Public Connection', 'Variable Processing Cluster'], correctAnswer: 1, hint: 'It creates an isolated network in the cloud.', explanation: 'A VPC (Virtual Private Cloud) provides a logically isolated section of the cloud where you can launch resources in a virtual network you define.' },
  // Cloud Computing - Hard
  { id: 'cc-hard-1', topic: 'cloud-computing', difficulty: 'hard', question: 'What is the difference between horizontal and vertical scaling?', options: ['Horizontal is cheaper', 'Horizontal adds more machines, vertical adds more power to existing machines', 'Vertical is always better', 'They are the same'], correctAnswer: 1, hint: 'Think about scaling out vs scaling up.', explanation: 'Horizontal scaling (scale out) adds more machines to distribute load. Vertical scaling (scale up) adds more CPU/RAM to a single machine.' },
  { id: 'cc-hard-2', topic: 'cloud-computing', difficulty: 'hard', question: 'What is Kubernetes primarily used for?', options: ['Database management', 'Container orchestration at scale', 'Email delivery', 'Code compilation'], correctAnswer: 1, hint: 'Think about managing many containers across clusters.', explanation: 'Kubernetes orchestrates containerized applications across clusters, handling deployment, scaling, load balancing, and self-healing.' },
  { id: 'cc-hard-3', topic: 'cloud-computing', difficulty: 'hard', question: 'What is a multi-region architecture used for?', options: ['Reducing costs', 'High availability and disaster recovery across geographic regions', 'Simplifying code', 'Avoiding encryption'], correctAnswer: 1, hint: 'Think about what happens if an entire data center goes down.', explanation: 'Multi-region architectures replicate services across geographic regions to ensure high availability, lower latency, and disaster recovery.' },

  // Cybersecurity - Easy
  { id: 'cs-easy-1', topic: 'cybersecurity', difficulty: 'easy', question: 'What is a firewall?', options: ['A physical wall in a data center', 'A system that monitors and controls network traffic', 'A type of virus', 'A backup device'], correctAnswer: 1, hint: 'Think about filtering traffic between networks.', explanation: 'A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predetermined rules.' },
  { id: 'cs-easy-2', topic: 'cybersecurity', difficulty: 'easy', question: 'What does phishing mean in cybersecurity?', options: ['Catching fish online', 'Tricking people into revealing sensitive information', 'Scanning for open ports', 'Encrypting files'], correctAnswer: 1, hint: 'Think about deceptive emails or messages.', explanation: 'Phishing is a social engineering attack that tricks victims into revealing passwords, credit card numbers, or other sensitive data through deceptive communications.' },
  { id: 'cs-easy-3', topic: 'cybersecurity', difficulty: 'easy', question: 'What is encryption?', options: ['Deleting data permanently', 'Converting data into a coded format to prevent unauthorized access', 'Compressing files', 'Backing up data'], correctAnswer: 1, hint: 'Think about making data unreadable without a key.', explanation: 'Encryption converts readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and key, protecting it from unauthorized access.' },
  { id: 'cs-easy-4', topic: 'cybersecurity', difficulty: 'easy', question: 'What is two-factor authentication (2FA)?', options: ['Using two passwords', 'Requiring two different types of verification', 'Logging in from two devices', 'Encrypting data twice'], correctAnswer: 1, hint: 'Something you know AND something you have.', explanation: '2FA requires two different forms of identification (e.g., password + phone code) to verify identity, adding a second layer of security.' },
  // Cybersecurity - Medium
  { id: 'cs-med-1', topic: 'cybersecurity', difficulty: 'medium', question: 'What is SQL injection?', options: ['A database optimization technique', 'Inserting malicious SQL code through user input', 'A type of encryption', 'A backup method'], correctAnswer: 1, hint: 'Think about manipulating database queries through untrusted input.', explanation: 'SQL injection is an attack where malicious SQL statements are inserted into input fields to manipulate the database, potentially exposing or destroying data.' },
  { id: 'cs-med-2', topic: 'cybersecurity', difficulty: 'medium', question: 'What is the difference between symmetric and asymmetric encryption?', options: ['Symmetric is newer', 'Symmetric uses one key, asymmetric uses a public/private key pair', 'Asymmetric is always faster', 'They are the same'], correctAnswer: 1, hint: 'Think about how many keys are involved.', explanation: 'Symmetric encryption uses the same key for encryption and decryption. Asymmetric uses a key pair: a public key for encryption and a private key for decryption.' },
  { id: 'cs-med-3', topic: 'cybersecurity', difficulty: 'medium', question: 'What is a zero-day vulnerability?', options: ['A bug fixed on day zero', 'A security flaw unknown to the vendor with no available patch', 'A vulnerability with zero impact', 'An outdated system'], correctAnswer: 1, hint: 'The vendor has had "zero days" to fix it.', explanation: 'A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no patch available, making it especially dangerous.' },
  // Cybersecurity - Hard
  { id: 'cs-hard-1', topic: 'cybersecurity', difficulty: 'hard', question: 'What is the OWASP Top 10?', options: ['A list of top programming languages', 'A standard awareness document for web application security risks', 'A ranking of antivirus software', 'A certification program'], correctAnswer: 1, hint: 'It is a widely-referenced web security standard.', explanation: 'The OWASP Top 10 is a standard awareness document listing the ten most critical web application security risks, updated periodically by the Open Web Application Security Project.' },
  { id: 'cs-hard-2', topic: 'cybersecurity', difficulty: 'hard', question: 'What is a man-in-the-middle (MITM) attack?', options: ['Hacking the central server', 'Intercepting and potentially altering communications between two parties', 'Brute-forcing passwords', 'Social engineering via phone'], correctAnswer: 1, hint: 'The attacker secretly relays messages between two parties.', explanation: 'In a MITM attack, the attacker secretly intercepts and possibly alters communication between two parties who believe they are communicating directly with each other.' },
  { id: 'cs-hard-3', topic: 'cybersecurity', difficulty: 'hard', question: 'What is the principle of least privilege?', options: ['Using the simplest password possible', 'Granting users only the minimum access needed to perform their job', 'Limiting server uptime', 'Restricting network bandwidth'], correctAnswer: 1, hint: 'Minimize access rights for users and processes.', explanation: 'The principle of least privilege states that users, processes, and systems should have only the minimum access rights necessary to perform their functions, reducing the attack surface.' },

  // Web Development - Easy
  { id: 'wd-easy-1', topic: 'web-development', difficulty: 'easy', question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Management Link', 'Hyper Transfer Mode Layout'], correctAnswer: 0, hint: 'It is the standard markup language for web pages.', explanation: 'HTML stands for HyperText Markup Language, the standard language for creating and structuring content on the web.' },
  { id: 'wd-easy-2', topic: 'web-development', difficulty: 'easy', question: 'What is CSS used for?', options: ['Server-side logic', 'Styling and layout of web pages', 'Database queries', 'Network configuration'], correctAnswer: 1, hint: 'Think about colors, fonts, and layout.', explanation: 'CSS (Cascading Style Sheets) is used to style HTML elements, controlling layout, colors, fonts, spacing, and responsive design.' },
  { id: 'wd-easy-3', topic: 'web-development', difficulty: 'easy', question: 'What is JavaScript primarily used for in web development?', options: ['Styling web pages', 'Making web pages interactive', 'Creating databases', 'Sending emails'], correctAnswer: 1, hint: 'Think about dynamic behavior in the browser.', explanation: 'JavaScript adds interactivity to web pages — handling user events, manipulating the DOM, making API calls, and enabling dynamic content updates.' },
  { id: 'wd-easy-4', topic: 'web-development', difficulty: 'easy', question: 'What does API stand for?', options: ['Application Programming Interface', 'Automated Process Integration', 'Advanced Programming Instruction', 'Application Protocol Index'], correctAnswer: 0, hint: 'It defines how software components communicate.', explanation: 'API (Application Programming Interface) defines the methods and data formats for communication between software components.' },
  // Web Development - Medium
  { id: 'wd-med-1', topic: 'web-development', difficulty: 'medium', question: 'What is the Virtual DOM in React?', options: ['A separate browser window', 'A lightweight copy of the real DOM for efficient updates', 'A CSS framework', 'A testing tool'], correctAnswer: 1, hint: 'React uses it to minimize expensive real DOM operations.', explanation: 'The Virtual DOM is an in-memory representation of the real DOM. React diffs changes against it and batch-updates only what changed in the actual DOM.' },
  { id: 'wd-med-2', topic: 'web-development', difficulty: 'medium', question: 'What HTTP method is used to update an existing resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correctAnswer: 2, hint: 'Think about replacing a resource at a specific URL.', explanation: 'PUT is the HTTP method used to update or replace an existing resource at a specified URL.' },
  { id: 'wd-med-3', topic: 'web-development', difficulty: 'medium', question: 'What is responsive design?', options: ['Fast-loading websites', 'Designing websites that adapt to different screen sizes', 'Using only JavaScript', 'Server-side rendering'], correctAnswer: 1, hint: 'Think about mobile, tablet, and desktop layouts.', explanation: 'Responsive design uses flexible layouts, media queries, and fluid grids to make websites look good on any device or screen size.' },
  // Web Development - Hard
  { id: 'wd-hard-1', topic: 'web-development', difficulty: 'hard', question: 'What is the purpose of a service worker?', options: ['Managing database connections', 'Enabling offline functionality and background sync in web apps', 'Compiling JavaScript', 'Running CSS animations'], correctAnswer: 1, hint: 'Think about Progressive Web Apps (PWAs).', explanation: 'Service workers are JavaScript files that run in the background, enabling offline caching, push notifications, and background sync for Progressive Web Apps.' },
  { id: 'wd-hard-2', topic: 'web-development', difficulty: 'hard', question: 'What is tree shaking in JavaScript bundling?', options: ['Randomizing code order', 'Removing unused code from the final bundle', 'Compressing images', 'Minifying HTML'], correctAnswer: 1, hint: 'Think about dead code elimination.', explanation: 'Tree shaking is a dead code elimination technique that removes unused exports from JavaScript bundles, reducing file size and improving load times.' },
  { id: 'wd-hard-3', topic: 'web-development', difficulty: 'hard', question: 'What is CORS and why is it needed?', options: ['A CSS framework', 'A browser security mechanism that controls cross-origin HTTP requests', 'A JavaScript runtime', 'A database protocol'], correctAnswer: 1, hint: 'It controls which domains can access resources from another domain.', explanation: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making HTTP requests to a different domain than the one serving the page, unless the server explicitly allows it.' },

  // Mathematics - Easy
  { id: 'math-easy-1', topic: 'mathematics', difficulty: 'easy', question: 'What is a vector?', options: ['A type of database', 'A quantity with both magnitude and direction', 'A programming language', 'A network protocol'], correctAnswer: 1, hint: 'Think about arrows pointing in a direction.', explanation: 'A vector is a mathematical object that has both magnitude (length) and direction, commonly represented as an array of numbers.' },
  { id: 'math-easy-2', topic: 'mathematics', difficulty: 'easy', question: 'What is a matrix?', options: ['A single number', 'A rectangular array of numbers arranged in rows and columns', 'A graph type', 'A statistical test'], correctAnswer: 1, hint: 'Think about a grid of numbers.', explanation: 'A matrix is a rectangular array of numbers arranged in rows and columns, used extensively in linear algebra, ML, and computer graphics.' },
  { id: 'math-easy-3', topic: 'mathematics', difficulty: 'easy', question: 'What is the derivative of a function?', options: ['Its integral', 'Its rate of change at a given point', 'Its average value', 'Its maximum'], correctAnswer: 1, hint: 'Think about slope and how fast something changes.', explanation: 'The derivative measures the instantaneous rate of change of a function — geometrically, it is the slope of the tangent line at a point.' },
  { id: 'math-easy-4', topic: 'mathematics', difficulty: 'easy', question: 'What is the dot product of two vectors?', options: ['A vector result', 'A scalar result from multiplying corresponding elements and summing', 'A matrix', 'An angle'], correctAnswer: 1, hint: 'The result is a single number, not a vector.', explanation: 'The dot product multiplies corresponding elements of two vectors and sums them, resulting in a scalar that measures similarity and projection.' },
  // Mathematics - Medium
  { id: 'math-med-1', topic: 'mathematics', difficulty: 'medium', question: 'What are eigenvalues of a matrix?', options: ['The diagonal elements', 'Scalars that indicate how a transformation scales eigenvectors', 'The inverse values', 'Row sums'], correctAnswer: 1, hint: 'They describe how a linear transformation stretches or compresses.', explanation: 'Eigenvalues are scalars λ such that Av = λv for some non-zero vector v (eigenvector), indicating how a transformation scales space along certain directions.' },
  { id: 'math-med-2', topic: 'mathematics', difficulty: 'medium', question: 'What is gradient descent?', options: ['A sorting algorithm', 'An optimization algorithm that iteratively moves toward a minimum', 'A data structure', 'A search technique'], correctAnswer: 1, hint: 'Think about walking downhill to find the lowest point.', explanation: 'Gradient descent is an iterative optimization algorithm that adjusts parameters in the direction of steepest descent of the loss function to find a minimum.' },
  { id: 'math-med-3', topic: 'mathematics', difficulty: 'medium', question: 'What is the chain rule in calculus?', options: ['A method for adding derivatives', 'A rule for computing the derivative of composed functions', 'A technique for integration', 'A matrix operation'], correctAnswer: 1, hint: 'It is essential for backpropagation in neural networks.', explanation: 'The chain rule states that the derivative of f(g(x)) equals f\'(g(x)) · g\'(x), allowing derivatives of composed functions. It is the mathematical basis of backpropagation.' },
  // Mathematics - Hard
  { id: 'math-hard-1', topic: 'mathematics', difficulty: 'hard', question: 'What is Singular Value Decomposition (SVD)?', options: ['A type of sorting', 'A matrix factorization into U·Σ·Vᵀ revealing structure and rank', 'A graph algorithm', 'A probability distribution'], correctAnswer: 1, hint: 'It decomposes any matrix into three matrices.', explanation: 'SVD factorizes any m×n matrix A into U·Σ·Vᵀ, where U and V are orthogonal matrices and Σ is diagonal with singular values. It is used in PCA, recommender systems, and data compression.' },
  { id: 'math-hard-2', topic: 'mathematics', difficulty: 'hard', question: 'Why is the Jacobian matrix important in deep learning?', options: ['It stores training data', 'It represents all partial derivatives of a vector-valued function', 'It compresses models', 'It generates random numbers'], correctAnswer: 1, hint: 'Think about extending gradients to multi-output functions.', explanation: 'The Jacobian matrix contains all first-order partial derivatives of a vector-valued function, generalizing the gradient to multi-input, multi-output functions — critical for backpropagation through layers.' },
  { id: 'math-hard-3', topic: 'mathematics', difficulty: 'hard', question: 'What is the purpose of the softmax function?', options: ['Sorting values', 'Converting a vector of real numbers into a probability distribution', 'Matrix inversion', 'Feature extraction'], correctAnswer: 1, hint: 'It is used in the output layer of classification networks.', explanation: 'Softmax converts a vector of arbitrary real numbers into a probability distribution where all values are between 0 and 1 and sum to 1, commonly used for multi-class classification output.' }
];

export const getQuestionsByTopicAndDifficulty = async (
  topic: Question['topic'],
  difficulty: Question['difficulty'],
  useAI: boolean = true
): Promise<Question[]> => {
  // If AI is enabled, try to get AI-generated questions first
  if (useAI) {
    try {
      const { AIQuestionManager } = await import('@/services/aiQuestionManager');
      const aiQuestions = await AIQuestionManager.getQuestions(topic, difficulty);
      
      if (aiQuestions.length > 0) {
        console.log(`Using ${aiQuestions.length} AI questions for ${topic} - ${difficulty}`);
        return aiQuestions;
      }
    } catch (error) {
      console.error('Error fetching AI questions, falling back to static questions:', error);
    }
  }

  // Fallback to static questions
  console.log(`Using static questions for ${topic} - ${difficulty}`);
  return questions.filter(q => q.topic === topic && q.difficulty === difficulty);
};

// Keep the synchronous version for backward compatibility
export const getStaticQuestionsByTopicAndDifficulty = (
  topic: Question['topic'],
  difficulty: Question['difficulty']
): Question[] => {
  return questions.filter(q => q.topic === topic && q.difficulty === difficulty);
};
