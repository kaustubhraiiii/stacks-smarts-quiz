import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Database, Cpu, ArrowRight } from 'lucide-react';
import { Topic } from '@/types/quiz';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

const topicInfo = {
  networks: {
    title: 'Networks',
    description: 'Test your knowledge of networking concepts, protocols, and architectures',
    icon: Network,
    gradient: 'from-blue-500 to-cyan-500'
  },
  'operating-systems': {
    title: 'Operating Systems',
    description: 'Master process management, scheduling, memory, and file systems',
    icon: Cpu,
    gradient: 'from-purple-500 to-pink-500'
  },
  databases: {
    title: 'Databases',
    description: 'Challenge yourself on SQL, transactions, indexing, and normalization',
    icon: Database,
    gradient: 'from-green-500 to-emerald-500'
  }
};

export const TopicCard = ({ topic, onSelect }: TopicCardProps) => {
  const info = topicInfo[topic];
  const Icon = info.icon;

  return (
    <Card 
      className="group hover:scale-105 transition-all cursor-pointer animate-slide-up overflow-hidden relative"
      onClick={() => {
        console.log('TopicCard clicked:', topic);
        onSelect(topic);
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl">{info.title}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            console.log('Start Quiz button clicked:', topic);
            onSelect(topic);
          }} 
          className="w-full group/btn"
          variant="outline"
        >
          Start Quiz
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};
