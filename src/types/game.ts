export interface GameState {
  currentMode: GameMode;
  currentModule: MathModule;
  score: number;
  streak: number;
  timeRemaining: number;
  totalQuestions: number;
  correctAnswers: number;
  isGameActive: boolean;
  showResult: boolean;
  userXP: number;
  userLevel: number;
  achievements: Achievement[];
}

export interface Question {
  id: string;
  question: string;
  answer: number;
  options?: number[];
  difficulty: number;
  module: MathModule;
  hint?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export type GameMode = 'menu' | 'climb' | 'blitz' | 'marathon' | 'custom' | 'study';

export type MathModule = 
  | 'multiplication' 
  | 'squares' 
  | 'cubes' 
  | 'fractions' 
  | 'powers' 
  | 'square-roots' 
  | 'cube-roots' 
  | 'percentages' 
  | 'divisibility';

export interface UserProgress {
  module: MathModule;
  level: number;
  progress: number;
  bestTime: number;
  accuracy: number;
  streakRecord: number;
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  module: MathModule;
  difficulty: number;
  lastReviewed?: Date;
  timesCorrect: number;
  timesIncorrect: number;
  nextReview?: Date;
}

export interface MentalMathTrick {
  id: string;
  title: string;
  description: string;
  example: string;
  steps: string[];
  category: MathModule;
}