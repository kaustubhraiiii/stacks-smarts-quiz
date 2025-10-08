import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Difficulty } from '@/types/quiz';
import { Flame, Zap, Target } from 'lucide-react';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficultyInfo = {
  easy: {
    title: 'Easy',
    description: '5 questions • 60 seconds',
    icon: Target,
    color: 'text-success'
  },
  medium: {
    title: 'Medium',
    description: '7 questions • 90 seconds',
    icon: Zap,
    color: 'text-warning'
  },
  hard: {
    title: 'Hard',
    description: '5 questions • 75 seconds',
    icon: Flame,
    color: 'text-destructive'
  }
};

export const DifficultySelector = ({ onSelect, onBack }: DifficultySelectorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Challenge
          </h2>
          <p className="text-muted-foreground">Select the difficulty level that suits you best</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {(Object.keys(difficultyInfo) as Difficulty[]).map((difficulty) => {
            const info = difficultyInfo[difficulty];
            const Icon = info.icon;
            
            return (
              <Card 
                key={difficulty}
                className="group hover:scale-105 transition-all cursor-pointer"
                onClick={() => onSelect(difficulty)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-4 group-hover:animate-pulse-glow`}>
                    <Icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{info.title}</CardTitle>
                  <CardDescription className="text-base">{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Select
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Topics
          </Button>
        </div>
      </div>
    </div>
  );
};
