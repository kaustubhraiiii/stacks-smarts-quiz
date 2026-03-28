import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Brain, Zap, RefreshCw, Database, Sparkles } from 'lucide-react';
import { Topic, Difficulty } from '@/types/quiz';
import { AIQuestionManager } from '@/services/aiQuestionManager';
import { toast } from 'sonner';

interface AIBrainProps {
  onQuestionsGenerated?: (questions: any[]) => void;
  onStartQuiz?: (questions: any[], topic: string, difficulty: string) => void;
}

export const AIBrain: React.FC<AIBrainProps> = ({ onQuestionsGenerated, onStartQuiz }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>('networks');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [cacheStats, setCacheStats] = useState({ totalEntries: 0, topics: [] });
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [showGeneratedQuestions, setShowGeneratedQuestions] = useState(false);

  const topics: Topic[] = ['networks', 'operating-systems', 'databases', 'generative-ai', 'machine-learning', 'cloud-computing', 'cybersecurity', 'web-development', 'mathematics'];
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      console.log('Generating AI questions...');
      
      const questions = await AIQuestionManager.getQuestions(selectedTopic, selectedDifficulty);
      
      if (questions.length > 0) {
        setGeneratedQuestions(questions);
        setShowGeneratedQuestions(true);
        toast.success(`Generated ${questions.length} AI questions!`, {
          description: `${selectedTopic} - ${selectedDifficulty} level`
        });
        onQuestionsGenerated?.(questions);
      } else {
        toast.error('Failed to generate questions');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast.error('Failed to generate questions');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGeneration = async () => {
    if (!customPrompt.trim()) {
      toast.error('Please enter a custom prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const questions = await AIQuestionManager.generateCustomQuestions(
        selectedTopic,
        selectedDifficulty,
        questionCount,
        customPrompt
      );

      setGeneratedQuestions(questions);
      setShowGeneratedQuestions(true);
      toast.success(`Generated ${questions.length} custom questions!`);
      onQuestionsGenerated?.(questions);
    } catch (error) {
      console.error('Error generating custom questions:', error);
      toast.error('Failed to generate custom questions');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGeneration = async () => {
    setIsBulkGenerating(true);
    try {
      const result = await AIQuestionManager.bulkGenerateQuestions(
        topics,
        difficulties,
        3 // 3 questions per combination
      );

      if (result.success) {
        toast.success(`Bulk generation complete! Generated ${result.totalGenerated} questions.`);

        // Load questions for the currently selected topic/difficulty so user can play
        const questions = await AIQuestionManager.getQuestions(selectedTopic, selectedDifficulty);
        if (questions.length > 0) {
          setGeneratedQuestions(questions);
          setShowGeneratedQuestions(true);
        }
      } else {
        toast.error(`Bulk generation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error in bulk generation:', error);
      toast.error('Bulk generation failed');
    } finally {
      setIsBulkGenerating(false);
    }
  };

  const handleRefreshQuestions = async () => {
    setIsGenerating(true);
    try {
      const questions = await AIQuestionManager.refreshQuestions(selectedTopic, selectedDifficulty);
      
      if (questions.length > 0) {
        setGeneratedQuestions(questions);
        setShowGeneratedQuestions(true);
        toast.success(`Refreshed ${questions.length} questions!`);
        onQuestionsGenerated?.(questions);
      }
    } catch (error) {
      console.error('Error refreshing questions:', error);
      toast.error('Failed to refresh questions');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateCacheStats = () => {
    const stats = AIQuestionManager.getCacheStats();
    setCacheStats(stats);
  };

  const clearCache = () => {
    AIQuestionManager.clearCache();
    updateCacheStats();
    toast.success('Cache cleared successfully');
  };

  const handleStartQuiz = () => {
    if (generatedQuestions.length > 0 && onStartQuiz) {
      onStartQuiz(generatedQuestions, selectedTopic, selectedDifficulty);
    }
  };

  React.useEffect(() => {
    updateCacheStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Main Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            AI Question Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Topic and Difficulty Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={selectedTopic} onValueChange={(value) => setSelectedTopic(value as Topic)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as Difficulty)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Question Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleGenerateQuestions} 
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Generate Questions
            </Button>

            <Button 
              onClick={async () => {
                setIsGenerating(true);
                try {
                  console.log('Generating questions for immediate quiz start...');
                  
                  const questions = await AIQuestionManager.getQuestions(selectedTopic, selectedDifficulty);
                  
                  if (questions.length > 0) {
                    setGeneratedQuestions(questions);
                    toast.success(`Generated ${questions.length} AI questions!`, {
                      description: `Starting quiz with ${selectedTopic} - ${selectedDifficulty} level`
                    });
                    
                    // Start quiz immediately
                    setTimeout(() => {
                      if (onStartQuiz) {
                        onStartQuiz(questions, selectedTopic, selectedDifficulty);
                      }
                    }, 500);
                  } else {
                    toast.error('Failed to generate questions');
                  }
                } catch (error) {
                  console.error('Error generating questions for quiz:', error);
                  toast.error('Failed to generate questions');
                } finally {
                  setIsGenerating(false);
                }
              }}
              disabled={isGenerating}
              variant="default"
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              Generate & Start Quiz
            </Button>

            <Button 
              variant="outline" 
              onClick={handleRefreshQuestions} 
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Questions Preview */}
      {showGeneratedQuestions && generatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              Generated Questions ({generatedQuestions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {generatedQuestions.map((question, index) => (
                <div key={question.id || index} className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">Question {index + 1}</h4>
                    <Badge variant="outline" className="text-xs">
                      {question.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3">{question.question}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {question.options.map((option: string, optIndex: number) => (
                      <div 
                        key={optIndex} 
                        className={`p-2 rounded ${
                          optIndex === question.correctAnswer 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-gray-100'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleStartQuiz} className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Quiz with These Questions
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowGeneratedQuestions(false)}
              >
                Close Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Prompt Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Custom Question Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Prompt</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Enter a custom prompt to generate specific types of questions..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleCustomGeneration} 
            disabled={isGenerating || !customPrompt.trim()}
            variant="outline"
            className="w-full"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            Generate Custom Questions
          </Button>
        </CardContent>
      </Card>

      {/* Bulk Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            Bulk Question Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              This will generate 3 questions for each combination of topic and difficulty level.
              It may take a few minutes to complete.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={handleBulkGeneration} 
            disabled={isBulkGenerating}
            variant="outline"
            className="w-full"
          >
            {isBulkGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Database className="w-4 h-4 mr-2" />
            )}
            Generate All Question Sets
          </Button>
        </CardContent>
      </Card>

      {/* Cache Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cached Question Sets</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">{cacheStats.totalEntries} entries</Badge>
                {cacheStats.topics.map((topic) => (
                  <Badge key={topic} variant="outline">{topic}</Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearCache}>
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
