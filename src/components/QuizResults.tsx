import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Lightbulb, Clock } from 'lucide-react';
import { QuizState } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface QuizResultsProps {
  state: QuizState;
  totalQuestions: number;
  onRestart: () => void;
  onBackToHome: () => void;
}

export const QuizResults = ({ state, totalQuestions, onRestart, onBackToHome }: QuizResultsProps) => {
  const percentage = Math.round((state.score / totalQuestions) * 100);
  const passed = percentage >= 60;

  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-slide-up">
        <Card className="text-center">
          <CardHeader>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center animate-celebrate">
              <Trophy className="w-12 h-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-4xl mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </CardTitle>
            <p className="text-muted-foreground">
              {passed 
                ? 'You\'ve demonstrated excellent knowledge!' 
                : 'Practice makes perfect. Try again to improve your score!'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="relative">
              <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {percentage}%
              </div>
              <p className="text-muted-foreground mt-2">
                {state.score} out of {totalQuestions} correct
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Card className="bg-muted/50">
                <CardContent className="pt-6 pb-4 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold">{state.score}</p>
                  <p className="text-xs text-muted-foreground">Correct Answers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50">
                <CardContent className="pt-6 pb-4 text-center">
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-warning" />
                  <p className="text-2xl font-bold">{state.hintsUsed}</p>
                  <p className="text-xs text-muted-foreground">Hints Used</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Message */}
            <Card className={`${passed ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'}`}>
              <CardContent className="py-4">
                <p className="text-sm font-medium">
                  {percentage >= 90 ? '🌟 Outstanding! You\'re a master of this topic!' :
                   percentage >= 70 ? '🎯 Great job! You have a solid understanding!' :
                   percentage >= 60 ? '👍 Good work! Keep building on this foundation!' :
                   '💪 Don\'t give up! Review the material and try again!'}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button variant="outline" onClick={onBackToHome}>
                Back to Home
              </Button>
              <Button onClick={onRestart}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
