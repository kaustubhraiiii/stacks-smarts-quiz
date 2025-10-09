import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Users, Loader2 } from 'lucide-react';
import { DatabaseService, LeaderboardEntry } from '@/services/database';
import { useEffect, useState } from 'react';

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await DatabaseService.getLeaderboard(10);
        setLeaderboardData(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-warning" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-6 h-6 text-warning/70" />;
    return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No quiz attempts yet!</p>
            <p className="text-sm">Be the first to take a quiz and appear on the leaderboard.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-warning" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                index < 3 
                  ? 'bg-gradient-primary/10 border border-primary/20' 
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-center w-10">
                {getRankIcon(index + 1)}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.avatar_url || undefined} />
                <AvatarFallback>
                  {getUserInitials(entry.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="font-semibold">
                  {entry.full_name || 'Anonymous User'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {entry.total_quizzes} quizzes • {entry.average_score?.toFixed(1) || 0}% avg
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {entry.total_points || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.best_score?.toFixed(1) || 0}% best
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
