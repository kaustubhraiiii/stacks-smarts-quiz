import { Question, Topic, Difficulty } from '@/types/quiz';

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
  private static readonly API_BASE_URL = '/api';

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
      - Data warehousing and analytics`
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
      
      const prompt = options.customPrompt || `
You are an expert computer science educator. Generate ${options.count} high-quality quiz questions about ${options.topic}.

Topic Context:
${topicContext}

${difficultyInstructions}

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

      // Make secure API call to backend instead of direct OpenAI call
      const response = await fetch(`${this.API_BASE_URL}/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          topic: options.topic,
          difficulty: options.difficulty,
          count: options.count
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      const aiQuestions = data.questions || [];
      
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
        tokensUsed: data.tokensUsed
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
