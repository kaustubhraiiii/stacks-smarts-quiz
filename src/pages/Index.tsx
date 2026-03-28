import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicCard } from '@/components/TopicCard';
import { DifficultySelector } from '@/components/DifficultySelector';
import { QuizQuestion } from '@/components/QuizQuestion';
import { QuizResults } from '@/components/QuizResults';
import { Leaderboard } from '@/components/Leaderboard';
import { AuthModal } from '@/components/auth/AuthModal';
import { UserProfile } from '@/components/auth/UserProfile';
import { AIBrain } from '@/components/ai/AIBrain';
import { Button } from '@/components/ui/button';
import { Topic, Difficulty, QuizState, Question } from '@/types/quiz';
import { getQuestionsByTopicAndDifficulty } from '@/data/questions';
import { Trophy, Brain, Search, Bell, LayoutGrid, BookOpen, Menu, X, Library } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';
import { DatabaseService } from '@/services/database';
import { Logo } from '@/components/ui/Logo';

type Screen = 'home' | 'difficulty' | 'quiz' | 'results';

const QUIZ_DURATIONS: Record<Difficulty, number> = {
  easy: 60,
  medium: 90,
  hard: 75
};

const ALL_TOPICS: Topic[] = [
  'networks', 'operating-systems', 'databases',
  'generative-ai', 'machine-learning', 'cloud-computing',
  'cybersecurity', 'web-development', 'mathematics'
];

const Index = () => {
  const navigate = useNavigate();
  const { userId, isSignedIn, isLoaded, supabaseClient } = useAuthContext();
  const [screen, setScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState<'topics' | 'leaderboard' | 'ai'>('topics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    hintsUsed: 0,
    timeRemaining: 0,
    isComplete: false
  });
  const [showFeedback, setShowFeedback] = useState(false);

  // Save quiz attempt to database
  const saveQuizAttempt = async () => {
    if (!userId || !selectedTopic || !selectedDifficulty) return;
    const timeTaken = QUIZ_DURATIONS[selectedDifficulty] - quizState.timeRemaining;
    try {
      await DatabaseService.saveQuizAttempt(supabaseClient, {
        user_id: userId,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        score: quizState.score,
        total_questions: questions.length,
        time_taken: timeTaken,
        hints_used: quizState.hintsUsed
      });
      toast.success('Quiz results saved!', {
        description: `You scored ${quizState.score}/${questions.length}`
      });
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      toast.error('Failed to save quiz results');
    }
  };

  // Timer effect
  useEffect(() => {
    if (screen === 'quiz' && quizState.timeRemaining > 0 && !showFeedback) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (screen === 'quiz' && quizState.timeRemaining === 0 && !showFeedback) {
      handleTimeout();
    }
  }, [screen, quizState.timeRemaining, showFeedback]);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setScreen('difficulty');
  };

  const handleDifficultySelect = async (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    toast.loading('Loading questions...', { description: 'Fetching AI-generated questions...' });

    try {
      const quizQuestions = await getQuestionsByTopicAndDifficulty(selectedTopic!, difficulty);
      if (quizQuestions.length === 0) {
        toast.error('No questions available for this topic and difficulty combination');
        return;
      }
      setQuestions(quizQuestions);
      setQuizState({
        currentQuestion: 0,
        score: 0,
        answers: new Array(quizQuestions.length).fill(null),
        hintsUsed: 0,
        timeRemaining: QUIZ_DURATIONS[difficulty],
        isComplete: false
      });
      setShowFeedback(false);
      setScreen('quiz');
      toast.success('Quiz Started!', { description: `Answer ${quizQuestions.length} questions on ${selectedTopic}` });
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Failed to load questions');
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[quizState.currentQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = answerIndex;
      return { ...prev, answers: newAnswers, score: isCorrect ? prev.score + 1 : prev.score };
    });
    setShowFeedback(true);

    setTimeout(() => {
      if (quizState.currentQuestion < questions.length - 1) {
        setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
        setShowFeedback(false);
      } else {
        setQuizState(prev => ({ ...prev, isComplete: true }));
        setScreen('results');
        if (userId) saveQuizAttempt();
      }
    }, 2500);
  };

  const handleTimeout = () => {
    toast.error('Time\'s Up!', { description: 'The quiz has ended due to timeout' });
    setQuizState(prev => ({ ...prev, isComplete: true }));
    setScreen('results');
    if (userId) saveQuizAttempt();
  };

  const handleHintUsed = () => setQuizState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));

  const handleRestart = () => {
    if (selectedTopic && selectedDifficulty) handleDifficultySelect(selectedDifficulty);
  };

  const handleBackToHome = () => {
    setScreen('home');
    setActiveTab('topics');
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setQuestions([]);
    setShowFeedback(false);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    toast.success('Welcome to StackSmarts!');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAIQuizStart = (questions: Question[], topic: string, difficulty: string) => {
    if (questions.length === 0) {
      toast.error('No questions available to start quiz');
      return;
    }
    setQuestions(questions);
    setSelectedTopic(topic as Topic);
    setSelectedDifficulty(difficulty as Difficulty);

    const duration = QUIZ_DURATIONS[difficulty as Difficulty] || 60;
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: new Array(questions.length).fill(null),
      hintsUsed: 0,
      timeRemaining: duration,
      isComplete: false
    });

    setShowFeedback(false);
    setScreen('quiz');
    toast.success('AI Quiz Started!', { description: `Answer ${questions.length} AI-generated questions` });
  };

  const changeTab = (tab: 'topics' | 'leaderboard' | 'ai') => {
    setActiveTab(tab);
    setScreen('home');
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans">
      {/* Main App Container */}
      <div className="w-full max-w-screen-2xl bg-card rounded-[32px] shadow-main border border-border flex flex-col md:flex-row min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] overflow-hidden relative">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
             <Logo className="w-8 h-8" />
             <span className="font-bold text-lg text-foreground tracking-tight">StackSmarts</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-muted-foreground hover:text-foreground">
            {isSidebarOpen ? <X/> : <Menu/>}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`absolute z-20 top-0 left-0 bg-card border-r border-border flex-col p-8 transition-transform duration-300 w-72 h-full flex md:relative md:w-64 lg:w-72 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Logo */}
          <div className="hidden md:flex items-center gap-3 mb-12">
            <Logo className="w-10 h-10" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">StackSmarts</h1>
          </div>

          {/* Navigation */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 ml-3">Learning Content</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => changeTab('topics')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'topics' && screen === 'home' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                  Topics
                </button>
                <button
                  onClick={() => changeTab('ai')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'ai' && screen === 'home' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}`}
                >
                  <Brain className="w-5 h-5" />
                  AI Generator
                </button>
                <button
                  onClick={() => navigate('/library')}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                >
                  <Library className="w-5 h-5" />
                  Library
                </button>
              </nav>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 ml-3">Community</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => changeTab('leaderboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'leaderboard' && screen === 'home' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}`}
                >
                  <Trophy className="w-5 h-5" />
                  Leaderboard
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Profile / Auth */}
          <div className="mt-8 pt-8 border-t border-border">
            {!isLoaded ? (
               <div className="w-10 h-10 animate-pulse bg-secondary rounded-full" />
            ) : isSignedIn ? (
               <UserProfile />
            ) : (
              <div className="space-y-3 p-4 bg-orange-50/50 rounded-3xl">
                <h3 className="text-sm font-semibold mb-1">Upgrade now</h3>
                <p className="text-xs text-muted-foreground mb-4">Create more quizzes and track progress.</p>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-medium" onClick={() => openAuthModal('signup')}>
                  Get Started
                </Button>
                <Button variant="ghost" className="w-full rounded-full text-foreground hover:bg-primary/10" onClick={() => openAuthModal('login')}>
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-10" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-card">
          {/* Top Header */}
          <header className="h-24 px-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
               {screen === 'home' && activeTab === 'topics' ? 'Courses' :
                screen === 'home' && activeTab === 'ai' ? 'AI Generator' :
                screen === 'home' && activeTab === 'leaderboard' ? 'Leaderboard' :
                screen === 'difficulty' ? 'Select Difficulty' :
                screen === 'quiz' ? 'Quiz in Progress' : 'Results'}
            </h2>
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-11 pr-4 py-3 bg-secondary rounded-full text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 w-72 text-foreground font-medium placeholder:font-normal"
                />
              </div>
              <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-10 pb-10">
            {screen === 'results' ? (
              <QuizResults
                state={quizState}
                totalQuestions={questions.length}
                onRestart={handleRestart}
                onBackToHome={handleBackToHome}
              />
            ) : screen === 'quiz' && questions.length > 0 ? (
              <div className="max-w-4xl mx-auto mt-4">
                <QuizQuestion
                  question={questions[quizState.currentQuestion]}
                  questionNumber={quizState.currentQuestion + 1}
                  totalQuestions={questions.length}
                  timeRemaining={quizState.timeRemaining}
                  onAnswer={handleAnswer}
                  onHintUsed={handleHintUsed}
                  selectedAnswer={quizState.answers[quizState.currentQuestion]}
                  showFeedback={showFeedback}
                />
              </div>
            ) : screen === 'difficulty' && selectedTopic ? (
              <div className="max-w-5xl mx-auto mt-8 animate-slide-up">
                <DifficultySelector
                  onSelect={handleDifficultySelect}
                  onBack={() => setScreen('home')}
                />
              </div>
            ) : screen === 'home' && activeTab === 'leaderboard' ? (
              <div className="max-w-4xl mx-auto mt-8 animate-slide-up"><Leaderboard /></div>
            ) : screen === 'home' && activeTab === 'ai' ? (
              <div className="max-w-4xl mx-auto mt-8 animate-slide-up">
                <div className="bg-card-purple/10 border-2 border-card-purple/20 p-8 rounded-3xl mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-card-purple">Generate Custom Quizzes</h3>
                  <p className="text-muted-foreground">Use our AI to instantly create adaptive questions on any topic.</p>
                </div>
                <AIBrain
                  onStartQuiz={handleAIQuizStart}
                  onQuestionsGenerated={(questions) => console.log('Generated', questions)}
                />
              </div>
            ) : (
              // Topics view
              <div className="animate-slide-up mt-4">
                {/* Filter Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-border">
                  <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-xl">
                      <LayoutGrid className="w-4 h-4 text-warning" />
                      <span>Sort by:</span>
                      <span className="text-foreground font-medium flex items-center gap-1 cursor-pointer">None <span className="text-xs">▼</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-xl">
                      <BookOpen className="w-4 h-4 text-success" />
                      <span>Type:</span>
                      <span className="text-foreground font-medium flex items-center gap-1 cursor-pointer">None <span className="text-xs">▼</span></span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-[15px] font-medium text-muted-foreground">
                    Published {ALL_TOPICS.length} courses
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                   {ALL_TOPICS.map((topic) => (
                     <TopicCard key={topic} topic={topic} onSelect={handleTopicSelect} />
                   ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
