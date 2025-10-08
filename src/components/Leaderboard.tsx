import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';
import { LeaderboardEntry } from '@/types/quiz';

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Johnson', score: 95, topic: 'networks', difficulty: 'hard', date: '2025-10-07' },
  { rank: 2, name: 'Sarah Chen', score: 92, topic: 'databases', difficulty: 'hard', date: '2025-10-07' },
  { rank: 3, name: 'Marcus Williams', score: 90, topic: 'operating-systems', difficulty: 'hard', date: '2025-10-06' },
  { rank: 4, name: 'Emily Davis', score: 88, topic: 'networks', difficulty: 'medium', date: '2025-10-06' },
  { rank: 5, name: 'James Miller', score: 85, topic: 'databases', difficulty: 'hard', date: '2025-10-05' },
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-warning" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-6 h-6 text-warning/70" />;
    return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
  };

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
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                entry.rank <= 3 
                  ? 'bg-gradient-primary/10 border border-primary/20' 
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-center w-10">
                {getRankIcon(entry.rank)}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {entry.topic.replace('-', ' ')} • {entry.difficulty}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{entry.score}%</p>
                <p className="text-xs text-muted-foreground">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
