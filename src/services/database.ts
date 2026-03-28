import { supabase } from '@/integrations/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Tables, TablesInsert } from '@/integrations/supabase/types';

// User Profile Types
export type UserProfile = Tables<'user_profiles'>;
export type UserProfileInsert = TablesInsert<'user_profiles'>;

// Quiz Types
export type QuizAttempt = Tables<'quiz_attempts'>;
export type QuizAttemptInsert = TablesInsert<'quiz_attempts'>;
export type QuizQuestion = Tables<'quiz_questions'>;
export type LeaderboardEntry = Tables<'leaderboard'>;

type Client = SupabaseClient<Database>;

export class DatabaseService {
  // User Profile Methods
  static async getUserProfile(client: Client, userId: string): Promise<UserProfile | null> {
    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      if (error.code === 'PGRST116') {
        console.log('User profile not found');
        return null;
      }
      return null;
    }

    return data;
  }

  static async updateUserProfile(
    client: Client,
    userId: string,
    updates: Partial<UserProfileInsert>
  ): Promise<UserProfile | null> {
    const { data, error } = await client
      .from('user_profiles')
      .update(updates as any)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return data;
  }

  // Quiz Attempt Methods
  static async saveQuizAttempt(client: Client, attempt: QuizAttemptInsert): Promise<QuizAttempt | null> {
    const { data, error } = await client
      .from('quiz_attempts')
      .insert(attempt as any)
      .select()
      .single();

    if (error) {
      console.error('Error saving quiz attempt:', error);
      return null;
    }

    return data;
  }

  static async getUserQuizHistory(client: Client, userId: string): Promise<QuizAttempt[]> {
    const { data, error } = await client
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz history:', error);
      return [];
    }

    return data || [];
  }

  static async getUserStats(client: Client, userId: string): Promise<{
    totalQuizzes: number;
    averageScore: number;
    bestScore: number;
    totalPoints: number;
  }> {
    const { data, error } = await client
      .from('quiz_attempts')
      .select('score, total_questions')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalPoints: 0,
      };
    }

    const rows = (data || []) as { score: number; total_questions: number }[];

    if (rows.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalPoints: 0,
      };
    }

    const totalQuizzes = rows.length;
    const totalPoints = rows.reduce((sum, attempt) => sum + attempt.score, 0);
    const scores = rows.map(attempt => (attempt.score / attempt.total_questions) * 100);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const bestScore = Math.max(...scores);

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore * 100) / 100,
      bestScore: Math.round(bestScore * 100) / 100,
      totalPoints,
    };
  }

  // Leaderboard Methods — uses the unauthenticated (anon) Supabase client
  // since leaderboard is public data
  static async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('total_points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data || [];
  }

  // Quiz Questions Methods — uses the unauthenticated (anon) Supabase client
  // since quiz questions are public data
  static async getQuizQuestions(topic: string, difficulty: string): Promise<QuizQuestion[]> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('topic', topic)
      .eq('difficulty', difficulty)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quiz questions:', error);
      return [];
    }

    return data || [];
  }

  static async addQuizQuestion(question: TablesInsert<'quiz_questions'>): Promise<QuizQuestion | null> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(question as any)
      .select()
      .single();

    if (error) {
      console.error('Error adding quiz question:', error);
      return null;
    }

    return data;
  }
}
