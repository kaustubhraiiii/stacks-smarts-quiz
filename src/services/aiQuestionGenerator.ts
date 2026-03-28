import OpenAI from 'openai';
import { Question, Topic, Difficulty } from '@/types/quiz';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});

export interface AIGenerationOptions {
  topic: Topic;
  difficulty: Difficulty;
  count: number;
  customPrompt?: string;
}

export interface AIGenerationResult {
  questions: Question[];
  success: boolean;
  error?: string;
  tokensUsed?: number;
}

export class AIQuestionGenerator {
  private static getTopicContext(topic: Topic): string {
    const contexts = {
      networks: `Computer Networks and Internet Protocols:
      - TCP/IP, HTTP/HTTPS, DNS, DHCP
      - Network layers (OSI model, TCP/IP model)
      - Routing protocols (RIP, OSPF, BGP)
      - Network security (VPN, Firewall, SSL/TLS)
      - Wireless networks (WiFi, Bluetooth)
      - Network troubleshooting and monitoring`,
      
      'operating-systems': `Operating Systems Fundamentals:
      - Process management and scheduling
      - Memory management (virtual memory, paging, segmentation)
      - File systems and storage
      - I/O systems and device drivers
      - Inter-process communication
      - Security and protection mechanisms
      - System calls and kernel architecture`,
      
      databases: `Database Systems and Management:
      - Relational database design and normalization
      - SQL queries and optimization
      - Database transactions and ACID properties
      - Indexing strategies and performance
      - Database security and backup
      - NoSQL databases (MongoDB, Redis)
      - Data warehousing and analytics`,

      'generative-ai': `Generative AI and Large Language Models:
      - Transformer architecture and attention mechanisms
      - Large Language Models (GPT, Claude, LLaMA)
      - Prompt engineering techniques and best practices
      - Retrieval-Augmented Generation (RAG)
      - Fine-tuning and transfer learning
      - Diffusion models for image generation
      - AI agents and tool use
      - Ethical considerations and AI safety`,

      'machine-learning': `Machine Learning Fundamentals:
      - Supervised learning (regression, classification)
      - Unsupervised learning (clustering, dimensionality reduction)
      - Neural networks and deep learning
      - Decision trees, random forests, SVMs
      - Evaluation metrics (accuracy, precision, recall, F1, AUC)
      - Bias-variance tradeoff and regularization
      - Feature engineering and selection
      - Cross-validation and hyperparameter tuning`,

      'cloud-computing': `Cloud Computing and Infrastructure:
      - AWS, Azure, GCP core services
      - IaaS, PaaS, SaaS models
      - Containerization (Docker, Kubernetes)
      - Serverless computing (Lambda, Cloud Functions)
      - Cloud networking (VPC, load balancers, CDN)
      - IAM and cloud security
      - Cost optimization and scaling strategies
      - CI/CD and DevOps in the cloud`,

      cybersecurity: `Cybersecurity Fundamentals:
      - Network security (firewalls, IDS/IPS, VPN)
      - Encryption and cryptography (symmetric, asymmetric, hashing)
      - Authentication and authorization mechanisms
      - OWASP Top 10 web vulnerabilities
      - Penetration testing methodology
      - Incident response and forensics
      - Security frameworks (NIST, ISO 27001)
      - Threat modeling and risk assessment`,

      'web-development': `Web Development:
      - HTML5, CSS3, and modern JavaScript (ES6+)
      - React fundamentals (components, hooks, state management)
      - REST API design and HTTP methods
      - Database integration and ORMs
      - Responsive design and CSS frameworks
      - Performance optimization (lazy loading, caching)
      - Web accessibility (WCAG, ARIA)
      - Version control with Git`,

      mathematics: `Mathematics for Technology and ML:
      - Linear algebra: vectors, matrices, eigenvalues, transformations
      - Matrix operations and decompositions (SVD, PCA)
      - Calculus: limits, derivatives, integrals
      - Multivariable calculus and partial derivatives
      - Gradient descent and optimization
      - Probability and statistics fundamentals
      - Chain rule and backpropagation
      - Applied math in machine learning contexts`
    };

    return contexts[topic] || '';
  }

  private static getDifficultyInstructions(difficulty: Difficulty): string {
    const instructions = {
      easy: `Difficulty Level: EASY
      - Focus on basic concepts and definitions
      - Use simple, straightforward questions
      - Avoid complex scenarios or multi-step problems
      - Target beginner-level understanding
      - Questions should be answerable with basic knowledge`,
      
      medium: `Difficulty Level: MEDIUM
      - Include practical applications and scenarios
      - Mix conceptual and procedural knowledge
      - Require some analysis and reasoning
      - Include common implementation details
      - Target intermediate-level understanding`,
      
      hard: `Difficulty Level: HARD
      - Focus on advanced concepts and edge cases
      - Include complex scenarios and troubleshooting
      - Require deep understanding and analysis
      - Include performance optimization topics
      - Target expert-level understanding`
    };
    
    return instructions[difficulty];
  }

  static async generateQuestions(options: AIGenerationOptions): Promise<AIGenerationResult> {
    try {
      console.log('Generating AI questions for:', options);
      
      const topicContext = this.getTopicContext(options.topic);
      const difficultyInstructions = this.getDifficultyInstructions(options.difficulty);
      
      const baseInstructions = `
Requirements:
1. Each question must have exactly 4 answer options (A, B, C, D)
2. Include exactly 1 correct answer and 3 plausible but incorrect distractors
3. Provide a clear, educational explanation for the correct answer
4. Include a helpful hint that guides without giving away the answer
5. Questions should be practical and relevant to real-world scenarios
6. Avoid overly technical jargon unless appropriate for the difficulty level
7. Ensure questions test understanding, not just memorization

Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "hint": "Helpful hint that guides the student",
      "explanation": "Detailed explanation of why this answer is correct and what makes other options wrong"
    }
  ]
}

Make sure the JSON is valid and properly formatted.`;

      const prompt = options.customPrompt
        ? `You are an expert educator. Generate ${options.count} high-quality quiz questions about ${options.topic} (${options.difficulty} difficulty).

Custom instructions: ${options.customPrompt}

${baseInstructions}`
        : `You are an expert computer science educator. Generate ${options.count} high-quality quiz questions about ${options.topic}.

Topic Context:
${topicContext}

${difficultyInstructions}

${baseInstructions}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert computer science educator who creates high-quality, educational quiz questions. Always respond with valid JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error('No response from OpenAI');
      }

      console.log('OpenAI response:', responseText);
      
      const parsedResponse = JSON.parse(responseText);
      const aiQuestions = parsedResponse.questions || [];
      
      // Convert AI questions to our Question format
      const questions: Question[] = aiQuestions.map((q: any, index: number) => ({
        id: `ai-${options.topic}-${options.difficulty}-${Date.now()}-${index}`,
        topic: options.topic,
        difficulty: options.difficulty,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        hint: q.hint,
        explanation: q.explanation
      }));

      console.log('Generated questions:', questions);

      return {
        questions,
        success: true,
        tokensUsed: completion.usage?.total_tokens
      };

    } catch (error) {
      console.error('Error generating AI questions:', error);
      
      let errorMessage = 'Failed to generate questions';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        questions: [],
        success: false,
        error: errorMessage
      };
    }
  }

  static async generateCustomQuestions(
    topic: string, 
    difficulty: Difficulty, 
    count: number, 
    customPrompt: string
  ): Promise<AIGenerationResult> {
    return this.generateQuestions({
      topic: topic as Topic,
      difficulty,
      count,
      customPrompt
    });
  }

  static async generateQuestionBatch(
    topics: Topic[], 
    difficulties: Difficulty[], 
    questionsPerCombination: number = 2
  ): Promise<AIGenerationResult> {
    const allQuestions: Question[] = [];
    let totalTokensUsed = 0;
    let hasErrors = false;
    let lastError = '';

    for (const topic of topics) {
      for (const difficulty of difficulties) {
        try {
          const result = await this.generateQuestions({
            topic,
            difficulty,
            count: questionsPerCombination
          });

          if (result.success) {
            allQuestions.push(...result.questions);
            totalTokensUsed += result.tokensUsed || 0;
          } else {
            hasErrors = true;
            lastError = result.error || 'Unknown error';
          }
        } catch (error) {
          hasErrors = true;
          lastError = error instanceof Error ? error.message : 'Unknown error';
        }
      }
    }

    return {
      questions: allQuestions,
      success: !hasErrors,
      error: hasErrors ? lastError : undefined,
      tokensUsed: totalTokensUsed
    };
  }
}
