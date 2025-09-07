import { useState, useCallback, useEffect } from 'react';
import { GameState, Question, MathModule, GameMode } from '@/types/game';
import { generateQuestion } from '@/utils/questionGenerator';
import { useToast } from '@/hooks/use-toast';

const initialGameState: GameState = {
  currentMode: 'menu',
  currentModule: 'multiplication',
  score: 0,
  streak: 0,
  timeRemaining: 60,
  totalQuestions: 0,
  correctAnswers: 0,
  isGameActive: false,
  showResult: false,
  userXP: parseInt(localStorage.getItem('userXP') || '0'),
  userLevel: parseInt(localStorage.getItem('userLevel') || '1'),
  achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
};

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const { toast } = useToast();

  // Generate new question
  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(gameState.currentModule);
    setCurrentQuestion(question);
    setUserAnswer('');
  }, [gameState.currentModule]);

  // Start game
  const startGame = useCallback((mode: GameMode, module: MathModule) => {
    setGameState(prev => ({
      ...prev,
      currentMode: mode,
      currentModule: module,
      score: 0,
      streak: 0,
      timeRemaining: mode === 'blitz' ? 60 : 300,
      totalQuestions: 0,
      correctAnswers: 0,
      isGameActive: true,
      showResult: false,
    }));
    generateNewQuestion();
  }, [generateNewQuestion]);

  // Submit answer
  const submitAnswer = useCallback((answer: string) => {
    if (!currentQuestion || !gameState.isGameActive) return;

    const numAnswer = parseInt(answer);
    const isCorrect = numAnswer === currentQuestion.answer;

    setGameState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newScore = isCorrect ? prev.score + (10 * (newStreak + 1)) : prev.score;
      const newXP = isCorrect ? prev.userXP + 5 : prev.userXP;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      // Save to localStorage
      localStorage.setItem('userXP', newXP.toString());
      localStorage.setItem('userLevel', newLevel.toString());

      return {
        ...prev,
        score: newScore,
        streak: newStreak,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        userXP: newXP,
        userLevel: newLevel,
      };
    });

    // Show feedback
    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: `+${10 * (gameState.streak + 1)} points`,
        className: "bg-success text-success-foreground",
      });
    } else {
      toast({
        title: "Not quite right 🤔",
        description: `The answer was ${currentQuestion.answer}`,
        variant: "destructive",
      });
    }

    // Generate next question after delay
    setTimeout(() => {
      generateNewQuestion();
    }, 1500);
  }, [currentQuestion, gameState.isGameActive, gameState.streak, toast, generateNewQuestion]);

  // Timer effect
  useEffect(() => {
    if (!gameState.isGameActive || gameState.currentMode === 'study') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining <= 1) {
          return {
            ...prev,
            timeRemaining: 0,
            isGameActive: false,
            showResult: true,
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameActive, gameState.currentMode]);

  // End game
  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      showResult: true,
    }));
  }, []);

  // Return to menu
  const returnToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentMode: 'menu',
      isGameActive: false,
      showResult: false,
    }));
    setCurrentQuestion(null);
    setUserAnswer('');
  }, []);

  return {
    gameState,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    startGame,
    submitAnswer,
    endGame,
    returnToMenu,
    generateNewQuestion,
  };
};