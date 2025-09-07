import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Target, Zap, Trophy, Lightbulb } from 'lucide-react';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GameMode, MathModule } from '@/types/game';

interface GameScreenProps {
  mode: GameMode;
  module: MathModule;
  onBack: () => void;
}

const GameScreen = ({ mode, module, onBack }: GameScreenProps) => {
  const { 
    gameState, 
    currentQuestion, 
    userAnswer, 
    setUserAnswer, 
    startGame, 
    submitAnswer, 
    returnToMenu 
  } = useGameEngine();
  
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    startGame(mode, module);
  }, [mode, module, startGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      submitAnswer(userAnswer);
      setShowHint(false);
    }
  };

  const handleBack = () => {
    returnToMenu();
    onBack();
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'climb': return <Target className="w-6 h-6" />;
      case 'blitz': return <Zap className="w-6 h-6" />;
      case 'marathon': return <Trophy className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'climb': return 'Climb Mode';
      case 'blitz': return 'Blitz Mode';
      case 'marathon': return 'Marathon Mode';
      case 'custom': return 'Custom Practice';
      default: return 'Practice Mode';
    }
  };

  const getModuleTitle = () => {
    switch (module) {
      case 'multiplication': return 'Multiplication Tables';
      case 'squares': return 'Squares';
      case 'cubes': return 'Cubes';
      case 'fractions': return 'Fractions to %';
      case 'powers': return 'Powers';
      default: return 'Math Practice';
    }
  };

  if (gameState.showResult) {
    const accuracy = gameState.totalQuestions > 0 ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 text-center card-interactive">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2 gradient-text">Game Complete!</h2>
            <p className="text-muted-foreground mb-8">Great job on your {getModeTitle().toLowerCase()} session!</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{gameState.score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{gameState.streak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{gameState.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={() => startGame(mode, module)} variant="gradient" size="lg">
                Play Again
              </Button>
              <Button onClick={handleBack} variant="outline" size="lg">
                Back to Menu
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button onClick={handleBack} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getModeIcon()}
            <span>{getModeTitle()}</span>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{gameState.score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{gameState.streak}</div>
            <div className="text-sm text-muted-foreground">Streak</div>
          </Card>
          
          <Card className="p-4 text-center flex flex-col items-center">
            <div className="flex items-center gap-1 text-lg font-bold text-warning">
              <Clock className="w-4 h-4" />
              {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground">Time</div>
          </Card>
        </div>

        {/* Progress Bar */}
        {mode === 'climb' && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{gameState.totalQuestions}/20</span>
            </div>
            <Progress value={(gameState.totalQuestions / 20) * 100} className="h-3" />
          </div>
        )}

        {/* Question Card */}
        <Card className="p-8 mb-6 card-interactive text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">{getModuleTitle()}</h3>
          </div>
          
          <div className="text-6xl font-bold mb-8 gradient-text">
            {currentQuestion.question}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="text-center text-2xl h-16 text-lg"
              autoFocus
            />
            
            <div className="flex gap-3 justify-center">
              <Button type="submit" variant="gradient" size="lg" className="px-8">
                Submit Answer
              </Button>
              
              {currentQuestion.hint && (
                <Button 
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </Button>
              )}
            </div>
          </form>
          
          {showHint && currentQuestion.hint && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-warning" />
                <span className="font-semibold text-sm">Hint:</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentQuestion.hint}</p>
            </div>
          )}
        </Card>

        {/* Level & XP */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Level {gameState.userLevel}</span>
            <span className="text-sm text-muted-foreground">{gameState.userXP} XP</span>
          </div>
          <Progress value={(gameState.userXP % 100)} className="h-2" />
        </Card>
      </div>
    </div>
  );
};

export default GameScreen;