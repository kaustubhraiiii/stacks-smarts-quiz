import { useState, useEffect } from 'react';
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
import { GraduationCap, Trophy, LogIn, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { DatabaseService } from '@/services/database';
import heroImage from '@/assets/hero-bg.jpg';

type Screen = 'home' | 'difficulty' | 'quiz' | 'results';

const QUIZ_DURATIONS: Record<Difficulty, number> = {
  easy: 60,
  medium: 90,
  hard: 75
};

const Index = () => {
  const { user, userProfile, loading } = useAuth();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAIBrain, setShowAIBrain] = useState(false);
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
    if (!user || !selectedTopic || !selectedDifficulty) return;

    const timeTaken = QUIZ_DURATIONS[selectedDifficulty] - quizState.timeRemaining;
    
    try {
      await DatabaseService.saveQuizAttempt({
        user_id: user.id,
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
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (screen === 'quiz' && quizState.timeRemaining === 0 && !showFeedback) {
      handleTimeout();
    }
  }, [screen, quizState.timeRemaining, showFeedback]);

  const handleTopicSelect = (topic: Topic) => {
    console.log('Topic selected:', topic);
    setSelectedTopic(topic);
    setScreen('difficulty');
    console.log('Screen set to difficulty');
  };

  const handleDifficultySelect = async (difficulty: Difficulty) => {
    console.log('Difficulty selected:', difficulty, 'for topic:', selectedTopic);
    setSelectedDifficulty(difficulty);
    
    // Show loading state
    toast.loading('Loading questions...', {
      description: 'Fetching AI-generated questions...'
    });
    
    try {
      const quizQuestions = await getQuestionsByTopicAndDifficulty(selectedTopic!, difficulty);
      console.log('Quiz questions found:', quizQuestions.length);
      
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
      console.log('Screen set to quiz');
      toast.success('Quiz Started!', {
        description: `Answer ${quizQuestions.length} questions on ${selectedTopic}`
      });
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
      return {
        ...prev,
        answers: newAnswers,
        score: isCorrect ? prev.score + 1 : prev.score
      };
    });

    setShowFeedback(true);

    // Move to next question or results after delay
    setTimeout(() => {
      if (quizState.currentQuestion < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
        setShowFeedback(false);
      } else {
        setQuizState(prev => ({ ...prev, isComplete: true }));
        setScreen('results');
        // Save quiz attempt when quiz is completed
        if (user) {
          saveQuizAttempt();
        }
      }
    }, 2500);
  };

  const handleTimeout = () => {
    toast.error('Time\'s Up!', {
      description: 'The quiz has ended due to timeout'
    });
    setQuizState(prev => ({ ...prev, isComplete: true }));
    setScreen('results');
    // Save quiz attempt when quiz times out
    if (user) {
      saveQuizAttempt();
    }
  };

  const handleHintUsed = () => {
    setQuizState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
  };

  const handleRestart = () => {
    if (selectedTopic && selectedDifficulty) {
      handleDifficultySelect(selectedDifficulty);
    }
  };

  const handleBackToHome = () => {
    setScreen('home');
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setQuestions([]);
    setShowFeedback(false);
  };

  if (screen === 'results') {
    return (
      <QuizResults
        state={quizState}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (screen === 'quiz' && questions.length > 0) {
    return (
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
    );
  }

  if (screen === 'difficulty' && selectedTopic) {
    return (
      <DifficultySelector
        onSelect={handleDifficultySelect}
        onBack={() => setScreen('home')}
      />
    );
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    toast.success('Welcome to StackSmarts!');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    console.log('Opening auth modal:', mode);
    setAuthMode(mode);
    setShowAuthModal(true);
    console.log('Auth modal state set to:', true);
  };

  const handleAIQuizStart = (questions: Question[], topic: string, difficulty: string) => {
    console.log('Starting AI quiz with questions:', questions);
    
    if (questions.length === 0) {
      toast.error('No questions available to start quiz');
      return;
    }

    // Set the quiz state with AI-generated questions
    setQuestions(questions);
    setSelectedTopic(topic as Topic);
    setSelectedDifficulty(difficulty as Difficulty);
    
    // Calculate quiz duration based on difficulty
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
    setShowAIBrain(false); // Hide AI Brain and go to quiz
    setScreen('quiz');
    
    toast.success('AI Quiz Started!', {
      description: `Answer ${questions.length} AI-generated questions`
    });
  };

  // Debug logging
  console.log('Current screen:', screen);
  console.log('Selected topic:', selectedTopic);
  console.log('Questions length:', questions.length);
  console.log('User state:', { user: !!user, loading, userProfile: !!userProfile });
  console.log('Show leaderboard:', showLeaderboard);

  // Simplified auth button logic
  const showAuthButtons = !user;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">StackSmarts</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
            ) : user ? (
              <UserProfile />
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => openAuthModal('login')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => openAuthModal('signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Interactive Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                StackSmarts
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master computer science fundamentals through engaging quizzes. Track progress, compete with peers, and level up your knowledge!
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {user ? (
                <>
                  <Button size="lg" onClick={() => {
                    console.log('Start Learning clicked');
                    setShowLeaderboard(false);
                    // Scroll to topics section
                    const topicsSection = document.querySelector('.topics-section');
                    if (topicsSection) {
                      topicsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} className="group">
                    Start Learning
                    <GraduationCap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setShowLeaderboard(!showLeaderboard)}>
                    <Trophy className="w-5 h-5 mr-2" />
                    View Leaderboard
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setShowAIBrain(!showAIBrain)}>
                    <Brain className="w-5 h-5 mr-2" />
                    AI Brain
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => openAuthModal('signup')} className="group">
                    Get Started Free
                    <GraduationCap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setShowLeaderboard(!showLeaderboard)}>
                    <Trophy className="w-5 h-5 mr-2" />
                    View Leaderboard
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setShowAIBrain(!showAIBrain)}>
                    <Brain className="w-5 h-5 mr-2" />
                    AI Brain
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 topics-section">
        {showLeaderboard ? (
          <div className="max-w-3xl mx-auto animate-slide-up">
            <Leaderboard />
            <div className="text-center mt-6">
              <Button variant="ghost" onClick={() => setShowLeaderboard(false)}>
                Back to Topics
              </Button>
            </div>
          </div>
        ) : showAIBrain ? (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
                <Brain className="w-8 h-8 text-purple-500" />
                AI Question Generator
              </h2>
              <p className="text-muted-foreground">Generate unlimited quiz questions using AI</p>
            </div>
            <AIBrain 
              onStartQuiz={handleAIQuizStart}
              onQuestionsGenerated={(questions) => {
                console.log('AI questions generated:', questions);
              }}
            />
            <div className="text-center mt-6">
              <Button variant="ghost" onClick={() => setShowAIBrain(false)}>
                Back to Topics
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold mb-3">Choose Your Topic</h2>
              <p className="text-muted-foreground">Select a subject area to begin your quiz journey</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <TopicCard topic="networks" onSelect={handleTopicSelect} />
              <TopicCard topic="operating-systems" onSelect={handleTopicSelect} />
              <TopicCard topic="databases" onSelect={handleTopicSelect} />
            </div>

            {/* Features Section */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Why StackSmarts?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Compete & Win</h4>
                  <p className="text-sm text-muted-foreground">Challenge yourself and climb the leaderboard</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">Adaptive Learning</h4>
                  <p className="text-sm text-muted-foreground">Questions tailored to your skill level</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold mb-2">AI-Powered Questions</h4>
                  <p className="text-sm text-muted-foreground">Unlimited questions generated by AI</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Auth Modal */}
      {console.log('Rendering AuthModal with:', { isOpen: showAuthModal, mode: authMode })}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Closing auth modal');
          setShowAuthModal(false);
        }}
        defaultMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
