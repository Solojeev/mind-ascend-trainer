import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, BookOpen, Brain, Lightbulb } from 'lucide-react';
import { FlashCard, MentalMathTrick } from '@/types/game';

interface StudyZoneScreenProps {
  onBack: () => void;
}

const flashCards: FlashCard[] = [
  { id: '1', question: '7 × 8', answer: '56', module: 'multiplication', difficulty: 1, timesCorrect: 0, timesIncorrect: 0 },
  { id: '2', question: '9 × 6', answer: '54', module: 'multiplication', difficulty: 1, timesCorrect: 0, timesIncorrect: 0 },
  { id: '3', question: '12²', answer: '144', module: 'squares', difficulty: 2, timesCorrect: 0, timesIncorrect: 0 },
  { id: '4', question: '15²', answer: '225', module: 'squares', difficulty: 3, timesCorrect: 0, timesIncorrect: 0 },
  { id: '5', question: '3³', answer: '27', module: 'cubes', difficulty: 1, timesCorrect: 0, timesIncorrect: 0 },
];

const mentalMathTricks: MentalMathTrick[] = [
  {
    id: '1',
    title: 'Multiply by 11',
    description: 'Quick trick for multiplying any 2-digit number by 11',
    example: '23 × 11 = 253',
    steps: [
      'Take the two digits: 2 and 3',
      'Add them together: 2 + 3 = 5',
      'Place the sum between the digits: 2-5-3',
      'Result: 253'
    ],
    category: 'multiplication'
  },
  {
    id: '2',
    title: 'Square Numbers Ending in 5',
    description: 'Fast way to square any number ending in 5',
    example: '25² = 625',
    steps: [
      'Take the first digit: 2',
      'Multiply by the next number: 2 × 3 = 6',
      'Append 25 to the result: 625',
      'Works for any number ending in 5!'
    ],
    category: 'squares'
  },
  {
    id: '3',
    title: 'Percentage of 100',
    description: 'Quick percentage calculations',
    example: '15% of 200 = 30',
    steps: [
      'Move decimal point left by 2: 15% = 0.15',
      'Multiply: 0.15 × 200',
      'Or think: 15% = 15/100, so 15 × 2 = 30',
      'Result: 30'
    ],
    category: 'percentages'
  }
];

const StudyZoneScreen = ({ onBack }: StudyZoneScreenProps) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'tricks'>('flashcards');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashCards[currentCardIndex];
  const currentTrick = mentalMathTricks[currentTrickIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashCards.length) % flashCards.length);
    setIsFlipped(false);
  };

  const nextTrick = () => {
    setCurrentTrickIndex((prev) => (prev + 1) % mentalMathTricks.length);
  };

  const prevTrick = () => {
    setCurrentTrickIndex((prev) => (prev - 1 + mentalMathTricks.length) % mentalMathTricks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button onClick={onBack} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className="text-2xl font-bold gradient-text">Study Zone</h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted/50 rounded-lg p-1 flex">
            <Button
              onClick={() => setActiveTab('flashcards')}
              variant={activeTab === 'flashcards' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Flashcards
            </Button>
            <Button
              onClick={() => setActiveTab('tricks')}
              variant={activeTab === 'tricks' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Mental Math Tricks
            </Button>
          </div>
        </div>

        {/* Flashcards Tab */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                Card {currentCardIndex + 1} of {flashCards.length}
              </p>
            </div>

            {/* Flashcard */}
            <div className="flex justify-center mb-8">
              <Card 
                className="w-80 h-64 cursor-pointer card-interactive flex items-center justify-center relative overflow-hidden"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-4 gradient-text">
                      {currentCard.question}
                    </div>
                    <p className="text-muted-foreground">Tap to reveal answer</p>
                  </div>
                </div>
                
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'}`}>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-4 text-success">
                      {currentCard.answer}
                    </div>
                    <p className="text-muted-foreground">Tap to see question</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Flashcard Controls */}
            <div className="flex justify-center gap-4">
              <Button onClick={prevCard} variant="outline" size="lg" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button onClick={() => setIsFlipped(!isFlipped)} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Flip Card
              </Button>
              
              <Button onClick={nextCard} variant="gradient" size="lg" className="gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Spaced Repetition Info */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Smart Review System</h3>
                  <p className="text-sm text-muted-foreground">AI-powered spaced repetition</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-success">156</div>
                  <div className="text-sm text-muted-foreground">Mastered</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-warning">34</div>
                  <div className="text-sm text-muted-foreground">Learning</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">23</div>
                  <div className="text-sm text-muted-foreground">Due for Review</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Mental Math Tricks Tab */}
        {activeTab === 'tricks' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                Trick {currentTrickIndex + 1} of {mentalMathTricks.length}
              </p>
            </div>

            {/* Trick Card */}
            <Card className="p-8 card-interactive">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 gradient-text">{currentTrick.title}</h2>
                <p className="text-muted-foreground">{currentTrick.description}</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm font-semibold mb-2">Example:</div>
                  <div className="text-2xl font-bold text-primary">{currentTrick.example}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-4">Step-by-step:</h3>
                {currentTrick.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm flex-1 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trick Navigation */}
            <div className="flex justify-center gap-4">
              <Button onClick={prevTrick} variant="outline" size="lg" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous Trick
              </Button>
              
              <Button onClick={nextTrick} variant="gradient" size="lg" className="gap-2">
                Next Trick
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyZoneScreen;