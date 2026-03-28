import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/quiz';
import { Lightbulb, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  onAnswer: (answerIndex: number) => void;
  onHintUsed: () => void;
  selectedAnswer: number | null;
  showFeedback: boolean;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onAnswer,
  onHintUsed,
  selectedAnswer,
  showFeedback
}: QuizQuestionProps) => {
  const [showHint, setShowHint] = useState(false);
  
  const progress = (questionNumber / totalQuestions) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleHint = () => {
    setShowHint(true);
    onHintUsed();
    toast.info('Hint revealed!', {
      description: question.hint
    });
  };

  useEffect(() => {
    setShowHint(false);
  }, [question.id]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl animate-slide-up">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm text-muted-foreground">Question {questionNumber} of {totalQuestions}</span>
              <Progress value={progress} className="w-64 mt-2" />
            </div>
            <div className="flex items-center gap-2 text-warning">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold">{timeRemaining}s</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl flex-1">{question.question}</CardTitle>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  question.difficulty === 'easy' ? 'bg-success/20 text-success' :
                  question.difficulty === 'medium' ? 'bg-warning/20 text-warning' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {question.difficulty.toUpperCase()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              
              let buttonVariant: "outline" | "success" | "destructive" = "outline";
              if (showFeedback && isSelected) {
                buttonVariant = isCorrect ? "success" : "destructive";
              } else if (showFeedback && isCorrectAnswer) {
                buttonVariant = "success";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className="w-full justify-start text-left h-auto py-4 px-6 relative group rounded-2xl"
                  onClick={() => !showFeedback && onAnswer(index)}
                  disabled={showFeedback}
                >
                  <span className="flex-1">{option}</span>
                  {showFeedback && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 ml-2 text-success" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 ml-2 text-destructive" />
                  )}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Hint Section */}
        {!showHint && !showFeedback && (
          <div className="text-center mb-4">
            <Button variant="warning" onClick={handleHint}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Need a Hint?
            </Button>
          </div>
        )}

        {showHint && !showFeedback && (
          <Card className="bg-warning/10 border-warning animate-slide-up">
            <CardContent className="py-4">
              <div className="flex gap-2">
                <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm">{question.hint}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Explanation */}
        {showFeedback && (
          <Card className={`animate-slide-up ${isCorrect ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'}`}>
            <CardContent className="py-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    Incorrect
                  </>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
