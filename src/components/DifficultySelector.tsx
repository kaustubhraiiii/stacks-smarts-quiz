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
    colorClass: 'text-success',
    bgClass: 'bg-success/10'
  },
  medium: {
    title: 'Medium',
    description: '7 questions • 90 seconds',
    icon: Zap,
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10'
  },
  hard: {
    title: 'Hard',
    description: '5 questions • 75 seconds',
    icon: Flame,
    colorClass: 'text-destructive',
    bgClass: 'bg-destructive/10'
  }
};

export const DifficultySelector = ({ onSelect, onBack }: DifficultySelectorProps) => {
  return (
    <div className="w-full flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 text-foreground tracking-tight">
          Choose Your Challenge
        </h2>
        <p className="text-muted-foreground text-[15px]">Select the difficulty level that suits you best</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {(Object.keys(difficultyInfo) as Difficulty[]).map((difficulty) => {
          const info = difficultyInfo[difficulty];
          const Icon = info.icon;
          
          return (
            <div 
              key={difficulty}
              className="group bg-white border border-border rounded-3xl p-8 hover:shadow-main transition-all cursor-pointer text-center"
              onClick={() => onSelect(difficulty)}
            >
              <div className={`w-20 h-20 mx-auto rounded-full ${info.bgClass} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <Icon className={`w-10 h-10 ${info.colorClass}`} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{info.title}</h3>
              <p className="text-[15px] text-muted-foreground mb-8">{info.description}</p>
              
              <Button className="w-full rounded-full bg-secondary text-foreground hover:bg-secondary/80 font-semibold" variant="ghost">
                Select
              </Button>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground" onClick={onBack}>
          ← Back to Courses
        </Button>
      </div>
    </div>
  );
};
