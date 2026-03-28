export type Difficulty = 'easy' | 'medium' | 'hard';

export type Topic = 'networks' | 'operating-systems' | 'databases' | 'generative-ai' | 'machine-learning' | 'cloud-computing' | 'cybersecurity' | 'web-development' | 'mathematics';

export interface Question {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: (number | null)[];
  hintsUsed: number;
  timeRemaining: number;
  isComplete: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  topic: Topic;
  difficulty: Difficulty;
  date: string;
}
