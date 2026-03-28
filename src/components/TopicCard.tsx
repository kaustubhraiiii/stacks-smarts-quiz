import { Network, Database, Cpu, Star, Sparkles, BrainCircuit, Cloud, ShieldCheck, Code, Calculator } from 'lucide-react';
import { Topic } from '@/types/quiz';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

const topicInfo: Record<Topic, { title: string; description: string; icon: any; tag: string; bgColor: string }> = {
  networks: {
    title: 'Networks',
    description: 'Test your knowledge of networking concepts, protocols, and architectures',
    icon: Network,
    tag: 'INFRASTRUCTURE',
    bgColor: 'bg-card-yellow'
  },
  'operating-systems': {
    title: 'Operating Systems',
    description: 'Master process management, scheduling, memory, and file systems',
    icon: Cpu,
    tag: 'SYSTEMS',
    bgColor: 'bg-card-pink'
  },
  databases: {
    title: 'Databases',
    description: 'Challenge yourself on SQL, transactions, indexing, and normalization',
    icon: Database,
    tag: 'DATA',
    bgColor: 'bg-card-blue'
  },
  'generative-ai': {
    title: 'Generative AI',
    description: 'Explore LLMs, transformers, prompt engineering, RAG, and AI agents',
    icon: Sparkles,
    tag: 'AI',
    bgColor: 'bg-card-purple'
  },
  'machine-learning': {
    title: 'Machine Learning',
    description: 'Learn supervised and unsupervised learning, neural networks, and evaluation metrics',
    icon: BrainCircuit,
    tag: 'AI',
    bgColor: 'bg-card-pink'
  },
  'cloud-computing': {
    title: 'Cloud Computing',
    description: 'Master AWS, Azure, GCP services, containers, serverless, and cloud architecture',
    icon: Cloud,
    tag: 'INFRASTRUCTURE',
    bgColor: 'bg-card-blue'
  },
  cybersecurity: {
    title: 'Cybersecurity',
    description: 'Test your skills in network security, encryption, OWASP Top 10, and threat modeling',
    icon: ShieldCheck,
    tag: 'SECURITY',
    bgColor: 'bg-card-yellow'
  },
  'web-development': {
    title: 'Web Development',
    description: 'Challenge yourself on HTML, CSS, JavaScript, React, REST APIs, and accessibility',
    icon: Code,
    tag: 'DEVELOPMENT',
    bgColor: 'bg-card-purple'
  },
  mathematics: {
    title: 'Mathematics',
    description: 'Applied math for tech: linear algebra, calculus, and gradient descent for ML',
    icon: Calculator,
    tag: 'FOUNDATIONS',
    bgColor: 'bg-card-pink'
  }
};

export const TopicCard = ({ topic, onSelect }: TopicCardProps) => {
  const info = topicInfo[topic];
  const Icon = info.icon;

  return (
    <div
      className={`group ${info.bgColor} rounded-[32px] p-8 cursor-pointer transition-transform hover:-translate-y-2 relative overflow-hidden min-h-[320px] flex flex-col`}
      onClick={() => onSelect(topic)}
    >
      <div className="flex justify-between items-start mb-6 z-10">
        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
          {info.tag}
        </span>
      </div>

      <div className="z-10 mt-2 flex-1">
        <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
          {info.title}
        </h3>
        <p className="text-white/90 text-[15px] leading-relaxed max-w-[90%]">
          {info.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-white/80 mt-6 z-10 font-medium">
        <Star className="w-4 h-4" />
        <span className="text-sm">Popular</span>
      </div>

      {/* Decorative Icon */}
      <Icon className="absolute -bottom-6 -right-6 w-48 h-48 text-white opacity-10 group-hover:scale-110 transition-transform duration-500 ease-out" strokeWidth={1} />
    </div>
  );
};

export { topicInfo };
