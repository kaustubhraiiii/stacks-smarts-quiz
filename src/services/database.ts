import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

// User Profile Types
export type UserProfile = Tables<'user_profiles'>;
export type UserProfileInsert = TablesInsert<'user_profiles'>;

// Quiz Types
export type QuizAttempt = Tables<'quiz_attempts'>;
export type QuizAttemptInsert = TablesInsert<'quiz_attempts'>;
export type QuizQuestion = Tables<'quiz_questions'>;
export type LeaderboardEntry = Tables<'leaderboard'>;

export class DatabaseService {
  // User Profile Methods
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      // If profile doesn't exist, try to create it
      if (error.code === 'PGRST116') {
        console.log('User profile not found, attempting to create one...');
        return await this.createUserProfile(userId);
      }
      return null;
    }

    return data;
  }

  static async createUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.id !== userId) {
        console.error('User not found or ID mismatch');
        return null;
      }

      const profileData: UserProfileInsert = {
        id: userId,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return null;
      }

      console.log('User profile created successfully:', data);
      return data;
    } catch (err) {
      console.error('Exception creating user profile:', err);
      return null;
    }
  }

  static async updateUserProfile(
    userId: string, 
    updates: Partial<UserProfileInsert>
  ): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
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
  static async saveQuizAttempt(attempt: QuizAttemptInsert): Promise<QuizAttempt | null> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(attempt)
      .select()
      .single();

    if (error) {
      console.error('Error saving quiz attempt:', error);
      return null;
    }

    return data;
  }

  static async getUserQuizHistory(userId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
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

  static async getUserStats(userId: string): Promise<{
    totalQuizzes: number;
    averageScore: number;
    bestScore: number;
    totalPoints: number;
  }> {
    const { data, error } = await supabase
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

    if (!data || data.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalPoints: 0,
      };
    }

    const totalQuizzes = data.length;
    const totalPoints = data.reduce((sum, attempt) => sum + attempt.score, 0);
    const scores = data.map(attempt => (attempt.score / attempt.total_questions) * 100);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const bestScore = Math.max(...scores);

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore * 100) / 100,
      bestScore: Math.round(bestScore * 100) / 100,
      totalPoints,
    };
  }

  // Leaderboard Methods
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

  // Quiz Questions Methods
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
      .insert(question)
      .select()
      .single();

    if (error) {
      console.error('Error adding quiz question:', error);
      return null;
    }

    return data;
  }

  // Helper method to get current user's profile
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    return this.getUserProfile(user.id);
  }
}
