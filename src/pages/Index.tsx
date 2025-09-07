import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Zap, Target, BookOpen, Star, TrendingUp } from "lucide-react";
import GameModeCard from "@/components/GameModeCard";
import LearningModuleCard from "@/components/LearningModuleCard";
import StudyZoneCard from "@/components/StudyZoneCard";

const Index = () => {
  const gameModes = [
    {
      id: "climb",
      title: "Climb Mode",
      description: "Progress through topics step by step",
      icon: Target,
      color: "primary" as const,
      progress: 67
    },
    {
      id: "blitz", 
      title: "Blitz Mode",
      description: "60-second rapid-fire challenges",
      icon: Zap,
      color: "warning" as const,
      progress: 45
    },
    {
      id: "marathon",
      title: "Marathon Mode", 
      description: "Perfect accuracy required",
      icon: Trophy,
      color: "success" as const,
      progress: 23
    }
  ];

  const learningModules = [
    { name: "Multiplication Tables", level: 15, progress: 78 },
    { name: "Squares & Cubes", level: 8, progress: 45 },
    { name: "Fractions to %", level: 12, progress: 89 },
    { name: "Mental Math Tricks", level: 5, progress: 34 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Mind Ascent</h1>
              <p className="text-sm text-muted-foreground">Level 23 • 2,847 XP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-warning">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">1,234</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Trophy className="w-4 h-4" />
              Rank #156
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Master Math Through
            <span className="block gradient-text">Interactive Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your mathematical abilities with gamified learning, spaced repetition, and instant feedback.
          </p>
        </section>

        {/* Game Modes */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Choose Your Challenge</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {gameModes.map((mode) => (
              <GameModeCard key={mode.id} {...mode} />
            ))}
          </div>
        </section>

        {/* Learning Modules */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Learning Modules</h3>
            <Button variant="outline" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Study Zone
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {learningModules.map((module, index) => (
              <LearningModuleCard key={index} {...module} />
            ))}
          </div>
        </section>

        {/* Study Zone */}
        <StudyZoneCard />

        {/* Daily Challenge */}
        <section>
          <Card className="card-interactive p-6 border-primary/30 glow-primary">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center float">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Daily Challenge</h3>
                <p className="text-muted-foreground mb-3">Complete 15 multiplication problems in under 2 minutes</p>
                <div className="flex items-center gap-4">
                  <Progress value={73} className="flex-1 h-3" />
                  <span className="text-sm font-semibold">11/15</span>
                </div>
              </div>
              <Button variant="gradient" className="pulse-glow">
                Continue
              </Button>
            </div>
          </Card>
        </section>

        {/* Quick Stats */}
        <section>
          <h3 className="text-2xl font-bold mb-6">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-success">7</div>
              <div className="text-muted-foreground text-sm">Day Streak</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-muted-foreground text-sm">Accuracy</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">2.1s</div>
              <div className="text-muted-foreground text-sm">Avg Speed</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-muted-foreground text-sm">Problems Solved</div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;