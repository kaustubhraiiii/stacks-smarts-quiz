import { Topic } from '@/types/quiz';

export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'documentation' | 'tool';
  description: string;
}

export interface SubjectResources {
  overview: string;
  resources: Resource[];
}

export const subjectResources: Record<Topic, SubjectResources> = {
  networks: {
    overview:
      'Computer networking is the backbone of modern communication. From the layered OSI model to real-world TCP/IP protocols, understanding how data moves between devices is essential for every engineer.',
    resources: [
      { title: 'Computer Networking Full Course – freeCodeCamp', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', type: 'video', description: 'Comprehensive beginner-to-intermediate networking course.' },
      { title: 'Networking Fundamentals – Cisco', url: 'https://www.netacad.com/courses/networking', type: 'course', description: 'Official Cisco Networking Academy introductory course.' },
      { title: 'Beej\'s Guide to Network Programming', url: 'https://beej.us/guide/bgnet/', type: 'article', description: 'Classic, practical guide to sockets and network programming in C.' },
      { title: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/', type: 'documentation', description: 'Clear explanations of DNS, CDN, DDoS, and web infrastructure.' },
      { title: 'Wireshark', url: 'https://www.wireshark.org/', type: 'tool', description: 'Industry-standard packet analyzer for hands-on network inspection.' },
    ],
  },
  'operating-systems': {
    overview:
      'Operating systems manage hardware resources and provide the foundation every application runs on. Key topics include process scheduling, memory management, file systems, and concurrency.',
    resources: [
      { title: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'article', description: 'Free, highly regarded OS textbook covering virtualization, concurrency, and persistence.' },
      { title: 'Nand2Tetris', url: 'https://www.nand2tetris.org/', type: 'course', description: 'Build a computer from first principles — gates through OS.' },
      { title: 'MIT 6.S081 Operating System Engineering', url: 'https://pdos.csail.mit.edu/6.S081/2023/', type: 'course', description: 'MIT\'s xv6-based OS course with labs.' },
      { title: 'Linux From Scratch', url: 'https://www.linuxfromscratch.org/', type: 'documentation', description: 'Step-by-step guide to building your own Linux system.' },
      { title: 'htop / btop', url: 'https://github.com/aristocratos/btop', type: 'tool', description: 'Interactive process viewer to observe OS scheduling live.' },
    ],
  },
  databases: {
    overview:
      'Databases are central to nearly every application. Understanding relational design, SQL optimization, transactions, and modern NoSQL systems is crucial for building reliable software.',
    resources: [
      { title: 'CMU Intro to Database Systems', url: 'https://15445.courses.cs.cmu.edu/', type: 'course', description: 'Andy Pavlo\'s renowned database systems course.' },
      { title: 'SQLBolt – Interactive SQL Lessons', url: 'https://sqlbolt.com/', type: 'course', description: 'Hands-on, step-by-step interactive SQL tutorial.' },
      { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'article', description: 'Deep dive into SQL indexing and query performance.' },
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/current/', type: 'documentation', description: 'Official Postgres docs — one of the best references in tech.' },
      { title: 'DB Fiddle', url: 'https://www.db-fiddle.com/', type: 'tool', description: 'Online SQL playground supporting multiple database engines.' },
    ],
  },
  'generative-ai': {
    overview:
      'Generative AI covers large language models, diffusion models, prompt engineering, and AI agents. This fast-moving field is transforming software development, content creation, and beyond.',
    resources: [
      { title: 'Andrej Karpathy – Let\'s Build GPT', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', type: 'video', description: 'Build a GPT from scratch to understand transformer internals.' },
      { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', type: 'article', description: 'Comprehensive guide to prompt engineering techniques.' },
      { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'course', description: 'Free course on transformers, fine-tuning, and NLP with Hugging Face.' },
      { title: 'Anthropic Documentation', url: 'https://docs.anthropic.com/', type: 'documentation', description: 'Official Claude API docs with best practices for building AI apps.' },
      { title: 'LangChain', url: 'https://www.langchain.com/', type: 'tool', description: 'Framework for building LLM-powered applications with chains and agents.' },
    ],
  },
  'machine-learning': {
    overview:
      'Machine learning enables systems to learn patterns from data. From classical algorithms like decision trees and SVMs to deep neural networks, ML is the foundation of modern AI.',
    resources: [
      { title: 'Andrew Ng – Machine Learning Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'course', description: 'The gold-standard ML course, updated for modern tools.' },
      { title: 'fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', type: 'course', description: 'Top-down, code-first deep learning course.' },
      { title: 'Distill.pub', url: 'https://distill.pub/', type: 'article', description: 'Beautiful interactive explanations of ML concepts.' },
      { title: 'scikit-learn Documentation', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'documentation', description: 'Comprehensive guide to classical ML algorithms in Python.' },
      { title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org/', type: 'tool', description: 'Visual, interactive neural network experimentation tool.' },
    ],
  },
  'cloud-computing': {
    overview:
      'Cloud computing provides on-demand infrastructure, platforms, and services. Mastering cloud architecture, containers, serverless, and DevOps practices is essential for modern engineering.',
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'course', description: 'Official AWS introductory course for cloud fundamentals.' },
      { title: 'The Cloud Resume Challenge', url: 'https://cloudresumechallenge.dev/', type: 'course', description: 'Hands-on project to learn cloud by building and deploying.' },
      { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', type: 'documentation', description: 'Official K8s docs covering container orchestration concepts.' },
      { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', type: 'documentation', description: 'Official Docker tutorial for containerization basics.' },
      { title: 'Terraform by HashiCorp', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'tool', description: 'Infrastructure as Code tool with excellent beginner tutorials.' },
    ],
  },
  cybersecurity: {
    overview:
      'Cybersecurity protects systems, networks, and data from threats. Topics range from encryption and authentication to penetration testing, incident response, and security frameworks.',
    resources: [
      { title: 'TryHackMe', url: 'https://tryhackme.com/', type: 'course', description: 'Gamified, hands-on cybersecurity learning platform.' },
      { title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', type: 'article', description: 'The definitive list of critical web application security risks.' },
      { title: 'Cybersecurity Full Course – freeCodeCamp', url: 'https://www.youtube.com/watch?v=U_P23SqJaDc', type: 'video', description: 'Beginner-friendly full cybersecurity course.' },
      { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework', type: 'documentation', description: 'Industry-standard framework for managing cybersecurity risk.' },
      { title: 'Burp Suite Community', url: 'https://portswigger.net/burp/communitydownload', type: 'tool', description: 'Leading web security testing tool for penetration testing.' },
    ],
  },
  'web-development': {
    overview:
      'Web development spans frontend UI, backend APIs, and everything in between. Modern web dev involves React, TypeScript, REST/GraphQL APIs, responsive design, and accessibility.',
    resources: [
      { title: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'course', description: 'Free, full-stack web development curriculum.' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'documentation', description: 'The authoritative reference for HTML, CSS, and JavaScript.' },
      { title: 'React Documentation', url: 'https://react.dev/', type: 'documentation', description: 'Official React docs with interactive examples and tutorials.' },
      { title: 'CSS Tricks', url: 'https://css-tricks.com/', type: 'article', description: 'Practical CSS guides, tips, and techniques.' },
      { title: 'CodePen', url: 'https://codepen.io/', type: 'tool', description: 'Online code editor for experimenting with HTML, CSS, and JS.' },
    ],
  },
  mathematics: {
    overview:
      'Mathematics for technology covers linear algebra, calculus, probability, and optimization — the building blocks behind machine learning, computer graphics, and algorithm design.',
    resources: [
      { title: '3Blue1Brown – Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'video', description: 'Stunning visual explanations of linear algebra concepts.' },
      { title: 'Khan Academy – Multivariable Calculus', url: 'https://www.khanacademy.org/math/multivariable-calculus', type: 'course', description: 'Free, comprehensive multivariable calculus course.' },
      { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'article', description: 'Free textbook bridging math fundamentals and ML applications.' },
      { title: 'Seeing Theory – Probability & Statistics', url: 'https://seeing-theory.brown.edu/', type: 'course', description: 'Beautiful visual introduction to probability and statistics.' },
      { title: 'Desmos Graphing Calculator', url: 'https://www.desmos.com/calculator', type: 'tool', description: 'Interactive graphing calculator for visualizing functions.' },
    ],
  },
};
