import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Topic } from '@/types/quiz';
import { topicInfo } from '@/components/TopicCard';
import { subjectResources, Resource } from '@/data/resources';
import { ArrowLeft, ExternalLink, Loader2, Video, FileText, GraduationCap, BookOpen, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resourceTypeIcon: Record<Resource['type'], React.ElementType> = {
  video: Video,
  article: FileText,
  course: GraduationCap,
  documentation: BookOpen,
  tool: Wrench,
};

const resourceTypeColor: Record<Resource['type'], string> = {
  video: 'bg-red-100 text-red-700',
  article: 'bg-blue-100 text-blue-700',
  course: 'bg-green-100 text-green-700',
  documentation: 'bg-amber-100 text-amber-700',
  tool: 'bg-purple-100 text-purple-700',
};

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const topic = subjectId as Topic;
  const info = topicInfo[topic];
  const data = subjectResources[topic];

  if (!info || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <Button onClick={() => navigate('/library')}>Back to Library</Button>
        </div>
      </div>
    );
  }

  const Icon = info.icon;

  const generateAISummary = async () => {
    setIsLoadingSummary(true);
    setSummaryError(null);
    try {
      const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!openaiKey) {
        throw new Error('OpenAI API key not configured');
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert educator. Write concise, engaging study summaries.',
            },
            {
              role: 'user',
              content: `Write a study guide summary for "${info.title}" (computer science / technology topic). Cover the key concepts a student should know, organized into 3-4 sections with clear headings. Keep it under 400 words. Use markdown formatting with ## headings and bullet points.`,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate summary');
      }

      const json = await res.json();
      setAiSummary(json.choices?.[0]?.message?.content || 'No summary generated.');
    } catch (err) {
      setSummaryError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-screen-lg mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/library')}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Hero */}
        <div className={`${info.bgColor} rounded-[28px] p-8 md:p-10 relative overflow-hidden mb-10`}>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider">
            {info.tag}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">{info.title}</h1>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">{data.overview}</p>
          <Icon className="absolute -bottom-6 -right-6 w-48 h-48 text-white opacity-10" strokeWidth={1} />
        </div>

        {/* AI Study Summary */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              AI Study Summary
            </h2>
            {!aiSummary && !isLoadingSummary && (
              <Button onClick={generateAISummary} variant="outline" size="sm" className="rounded-full">
                Generate Summary
              </Button>
            )}
          </div>

          {isLoadingSummary && (
            <div className="flex items-center gap-3 p-6 bg-secondary/30 rounded-2xl">
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              <span className="text-muted-foreground">Generating AI study summary...</span>
            </div>
          )}

          {summaryError && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-700 text-sm">{summaryError}</p>
              <Button onClick={generateAISummary} variant="outline" size="sm" className="mt-3 rounded-full">
                Retry
              </Button>
            </div>
          )}

          {aiSummary && (
            <div className="p-6 bg-secondary/30 rounded-2xl prose prose-sm max-w-none">
              {aiSummary.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-foreground">{line.replace('## ', '')}</h3>;
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return <p key={i} className="text-sm text-muted-foreground ml-4 mb-1">• {line.slice(2)}</p>;
                }
                if (line.trim() === '') return null;
                return <p key={i} className="text-sm text-muted-foreground mb-2">{line}</p>;
              })}
            </div>
          )}
        </section>

        {/* External Resources */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Learning Resources
          </h2>
          <div className="grid gap-4">
            {data.resources.map((resource, idx) => {
              const TypeIcon = resourceTypeIcon[resource.type];
              const colorClass = resourceTypeColor[resource.type];
              return (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                        {resource.title}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${colorClass}`}>
                    {resource.type}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Start Quiz CTA */}
        <div className="mt-10 p-6 bg-secondary/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-foreground">Ready to test your knowledge?</h3>
            <p className="text-sm text-muted-foreground">Take a quiz on {info.title} to see how much you've learned.</p>
          </div>
          <Button onClick={() => navigate('/')} className="rounded-full shrink-0">
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
