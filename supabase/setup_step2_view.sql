-- Step 2: Create the leaderboard view
-- Run this after Step 1

CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
    up.id,
    up.full_name,
    up.avatar_url,
    COUNT(qa.id) as total_quizzes,
    AVG(qa.score::float / qa.total_questions * 100) as average_score,
    MAX(qa.score::float / qa.total_questions * 100) as best_score,
    SUM(qa.score) as total_points
FROM public.user_profiles up
LEFT JOIN public.quiz_attempts qa ON up.id = qa.user_id
GROUP BY up.id, up.full_name, up.avatar_url
ORDER BY total_points DESC, average_score DESC;
