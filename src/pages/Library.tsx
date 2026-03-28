import { useNavigate } from 'react-router-dom';
import { Topic } from '@/types/quiz';
import { topicInfo } from '@/components/TopicCard';
import { ArrowLeft, BookOpen } from 'lucide-react';

const ALL_TOPICS: Topic[] = [
  'networks', 'operating-systems', 'databases',
  'generative-ai', 'machine-learning', 'cloud-computing',
  'cybersecurity', 'web-development', 'mathematics',
];

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Learning Library</h1>
            <p className="text-muted-foreground mt-1">Explore study resources and summaries for every subject.</p>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ALL_TOPICS.map((topic) => {
            const info = topicInfo[topic];
            const Icon = info.icon;
            return (
              <div
                key={topic}
                onClick={() => navigate(`/library/${topic}`)}
                className={`group ${info.bgColor} rounded-[28px] p-7 cursor-pointer transition-transform hover:-translate-y-1 relative overflow-hidden min-h-[200px] flex flex-col`}
              >
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider self-start mb-4">
                  {info.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed flex-1">{info.description}</p>
                <div className="flex items-center gap-2 text-white/70 mt-4 text-sm font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>View Resources</span>
                </div>
                <Icon className="absolute -bottom-4 -right-4 w-36 h-36 text-white opacity-10 group-hover:scale-110 transition-transform duration-500 ease-out" strokeWidth={1} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
