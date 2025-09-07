import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Lightbulb, RotateCcw } from "lucide-react";

const StudyZoneCard = () => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Study Zone</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Flashcards */}
        <Card className="card-interactive p-6 cursor-pointer border-primary/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Flashcards</h4>
              <p className="text-muted-foreground text-sm">Interactive learning cards</p>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">17 × 8 = ?</div>
              <div className="text-muted-foreground text-sm">Tap to reveal answer</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <RotateCcw className="w-4 h-4" />
              Flip
            </Button>
            <Button variant="success" size="sm" className="flex-1">
              Next
            </Button>
          </div>
        </Card>

        {/* Spaced Repetition */}
        <Card className="card-interactive p-6 cursor-pointer border-accent/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Smart Review</h4>
              <p className="text-muted-foreground text-sm">AI-powered repetition</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span>Due for review:</span>
              <span className="font-semibold">23 cards</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Mastered:</span>
              <span className="font-semibold text-success">156 cards</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Learning:</span>
              <span className="font-semibold text-warning">34 cards</span>
            </div>
          </div>
          <Button variant="gradient" size="sm" className="w-full">
            Start Review
          </Button>
        </Card>

        {/* Quick Tricks */}
        <Card className="card-interactive p-6 cursor-pointer border-success/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-success" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Quick Tricks</h4>
              <p className="text-muted-foreground text-sm">Mental math shortcuts</p>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <div className="text-sm font-semibold mb-2">Multiply by 11 Trick:</div>
            <div className="text-xs text-muted-foreground">
              For 23 × 11: Split 2|3, add middle 2+3=5, result: 253
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Learn More Tricks
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default StudyZoneCard;