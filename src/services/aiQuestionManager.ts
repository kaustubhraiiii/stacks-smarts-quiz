import { DatabaseService } from './database';
import { AIQuestionGenerator, AIGenerationOptions } from './aiQuestionGenerator';
import { Question, Topic, Difficulty } from '@/types/quiz';

export interface AIQuestionCache {
  topic: Topic;
  difficulty: Difficulty;
  questions: Question[];
  generatedAt: Date;
  tokensUsed: number;
}

export class AIQuestionManager {
  private static cache = new Map<string, AIQuestionCache>();
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private static getCacheKey(topic: Topic, difficulty: Difficulty): string {
    return `${topic}-${difficulty}`;
  }

  private static isCacheValid(cacheEntry: AIQuestionCache): boolean {
    const now = new Date();
    const cacheAge = now.getTime() - cacheEntry.generatedAt.getTime();
    return cacheAge < this.CACHE_DURATION && cacheEntry.questions.length > 0;
  }

  static async getQuestions(topic: Topic, difficulty: Difficulty): Promise<Question[]> {
    const cacheKey = this.getCacheKey(topic, difficulty);
    const cachedEntry = this.cache.get(cacheKey);

    // Check if we have valid cached questions
    if (cachedEntry && this.isCacheValid(cachedEntry)) {
      console.log('Using cached AI questions for:', topic, difficulty);
      return cachedEntry.questions;
    }

    // Try to get questions from database first
    try {
      const dbQuestions = await DatabaseService.getQuizQuestions(topic, difficulty);
      if (dbQuestions.length > 0) {
        console.log('Using database questions for:', topic, difficulty);
        
        // Cache the database questions
        this.cache.set(cacheKey, {
          topic,
          difficulty,
          questions: dbQuestions,
          generatedAt: new Date(),
          tokensUsed: 0
        });
        
        return dbQuestions;
      }
    } catch (error) {
      console.error('Error fetching questions from database:', error);
    }

    // Generate new AI questions if no cached or database questions available
    console.log('Generating new AI questions for:', topic, difficulty);
    const result = await AIQuestionGenerator.generateQuestions({
      topic,
      difficulty,
      count: 5 // Generate 5 questions by default
    });

    if (result.success && result.questions.length > 0) {
      // Cache the new questions
      this.cache.set(cacheKey, {
        topic,
        difficulty,
        questions: result.questions,
        generatedAt: new Date(),
        tokensUsed: result.tokensUsed || 0
      });

      // Save to database for future use
      try {
        for (const question of result.questions) {
          await DatabaseService.addQuizQuestion({
            topic: question.topic,
            difficulty: question.difficulty,
            question: question.question,
            options: question.options,
            correct_answer: question.correctAnswer,
            explanation: question.explanation
          });
        }
        console.log('AI questions saved to database');
      } catch (error) {
        console.error('Error saving AI questions to database:', error);
      }

      return result.questions;
    }

    console.error('Failed to generate AI questions:', result.error);
    return [];
  }

  static async generateCustomQuestions(
    topic: Topic,
    difficulty: Difficulty,
    count: number,
    customPrompt?: string
  ): Promise<Question[]> {
    const result = await AIQuestionGenerator.generateQuestions({
      topic,
      difficulty,
      count,
      customPrompt
    });

    if (result.success && result.questions.length > 0) {
      // Save custom questions to database
      try {
        for (const question of result.questions) {
          await DatabaseService.addQuizQuestion({
            topic: question.topic,
            difficulty: question.difficulty,
            question: question.question,
            options: question.options,
            correct_answer: question.correctAnswer,
            explanation: question.explanation
          });
        }
        console.log('Custom AI questions saved to database');
      } catch (error) {
        console.error('Error saving custom AI questions to database:', error);
      }

      return result.questions;
    }

    throw new Error(result.error || 'Failed to generate custom questions');
  }

  static async refreshQuestions(topic: Topic, difficulty: Difficulty): Promise<Question[]> {
    // Clear cache for this topic/difficulty
    const cacheKey = this.getCacheKey(topic, difficulty);
    this.cache.delete(cacheKey);

    // Generate fresh questions
    return this.getQuestions(topic, difficulty);
  }

  static async bulkGenerateQuestions(
    topics: Topic[],
    difficulties: Difficulty[],
    questionsPerCombination: number = 3
  ): Promise<{ success: boolean; error?: string; totalGenerated: number }> {
    try {
      console.log('Bulk generating questions for:', { topics, difficulties, questionsPerCombination });
      
      const result = await AIQuestionGenerator.generateQuestionBatch(
        topics,
        difficulties,
        questionsPerCombination
      );

      if (result.success) {
        // Save all questions to database
        for (const question of result.questions) {
          try {
            await DatabaseService.addQuizQuestion({
              topic: question.topic,
              difficulty: question.difficulty,
              question: question.question,
              options: question.options,
              correct_answer: question.correctAnswer,
              explanation: question.explanation
            });
          } catch (error) {
            console.error('Error saving question to database:', error);
          }
        }

        // Clear cache to force refresh
        for (const topic of topics) {
          for (const difficulty of difficulties) {
            const cacheKey = this.getCacheKey(topic, difficulty);
            this.cache.delete(cacheKey);
          }
        }

        return {
          success: true,
          totalGenerated: result.questions.length
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      console.error('Error in bulk question generation:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static getCacheStats(): { totalEntries: number; topics: string[] } {
    const topics = Array.from(this.cache.keys());
    return {
      totalEntries: this.cache.size,
      topics
    };
  }

  static clearCache(): void {
    this.cache.clear();
    console.log('AI question cache cleared');
  }

  static async preloadQuestions(topics: Topic[], difficulties: Difficulty[]): Promise<void> {
    console.log('Preloading AI questions for:', { topics, difficulties });
    
    const promises = [];
    for (const topic of topics) {
      for (const difficulty of difficulties) {
        promises.push(this.getQuestions(topic, difficulty));
      }
    }

    try {
      await Promise.all(promises);
      console.log('AI questions preloaded successfully');
    } catch (error) {
      console.error('Error preloading AI questions:', error);
    }
  }
}
