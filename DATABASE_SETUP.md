# Database Setup Guide

## Supabase Database Setup

Your new Supabase project credentials have been updated in the `.env` file. Now you need to set up the database tables.

### Step 1: Run the Database Setup (Run in Order)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `btbosehnsjzohdhoinhz`
3. Go to the **SQL Editor** tab
4. **Run each step in order:**

   **Step 1:** Copy and paste the contents of `supabase/setup_step1_tables.sql`
   - Click **Run** to create the basic tables
   
   **Step 2:** Copy and paste the contents of `supabase/setup_step2_view.sql`
   - Click **Run** to create the leaderboard view
   
   **Step 3:** Copy and paste the contents of `supabase/setup_step3_security.sql`
   - Click **Run** to enable security policies
   
   **Step 4:** Copy and paste the contents of `supabase/setup_step4_functions.sql`
   - Click **Run** to create functions and triggers

### Step 2: Verify Tables Created

After running the migration, you should see these tables in the **Table Editor**:
- `user_profiles` - Stores user profile information
- `quiz_attempts` - Tracks all quiz attempts and scores
- `quiz_questions` - Stores custom quiz questions (optional)

And this view:
- `leaderboard` - Aggregated leaderboard data

### Step 3: Enable Authentication Providers (Optional)

If you want to enable Google OAuth:

1. Go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials

### Step 4: Configure Authentication Settings

1. Go to **Authentication** > **Settings**
2. Under **Redirect URLs**, add:
   - `http://localhost:8083` (your current dev server)
   - `http://localhost:3000` (alternative port)
   - Your production domain (when ready)

### Step 5: Test the Application

1. Your app should be running on: `http://localhost:8083`
2. Try creating a new account
3. Take a quiz to test the data saving
4. Check the leaderboard

## Database Schema Overview

### Tables Created:

**user_profiles**
- `id` (UUID, Primary Key) - Links to auth.users
- `full_name` (TEXT) - User's display name
- `avatar_url` (TEXT) - Profile picture URL
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**quiz_attempts**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key) - Links to user_profiles
- `topic` (TEXT) - Quiz topic (networks, databases, etc.)
- `difficulty` (TEXT) - Quiz difficulty (easy, medium, hard)
- `score` (INTEGER) - Number of correct answers
- `total_questions` (INTEGER) - Total questions in quiz
- `time_taken` (INTEGER) - Time taken in seconds
- `hints_used` (INTEGER) - Number of hints used
- `completed_at` (TIMESTAMP)

**quiz_questions** (Optional - for custom questions)
- `id` (UUID, Primary Key)
- `topic` (TEXT)
- `difficulty` (TEXT)
- `question` (TEXT)
- `options` (JSONB) - Array of answer options
- `correct_answer` (INTEGER) - Index of correct answer
- `explanation` (TEXT)
- `created_at` (TIMESTAMP)

### Views Created:

**leaderboard**
- Aggregated data showing:
  - User information
  - Total quizzes taken
  - Average score
  - Best score
  - Total points

### Security Features:

- Row Level Security (RLS) enabled on all tables
- Users can only update their own profiles
- Users can insert their own quiz attempts
- All users can view leaderboard and quiz data

### Automatic Features:

- User profiles are automatically created when a user signs up
- Updated timestamps are automatically managed
- Database triggers handle profile creation

## Troubleshooting

If you encounter issues:

1. **Check Supabase Dashboard** - Verify tables were created
2. **Check Browser Console** - Look for any JavaScript errors
3. **Check Network Tab** - Verify API calls are working
4. **Check Supabase Logs** - Look for database errors

## Next Steps

Once the database is set up:
1. Test user registration and login
2. Take a quiz to verify data saving
3. Check the leaderboard updates
4. Consider adding more quiz questions to the database
