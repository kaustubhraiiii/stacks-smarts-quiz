# StackSmarts - AI-Powered CS Quiz Platform

## Project Overview

StackSmarts is an interactive quiz platform for computer science students to master Networks, Operating Systems, and Databases through AI-generated questions and adaptive learning.

**Live URL**: https://stacks-smarts-quiz-game-94saw9jbg-kaustubh-rais-projects.vercel.app

## Features

- 🤖 **AI-Powered Question Generation** using OpenAI
- 🔐 **User Authentication** with Supabase (Email + Google OAuth)
- 📊 **Real-time Leaderboard** and progress tracking
- 🎯 **Adaptive Learning** with difficulty levels
- 💾 **Database Integration** for persistent user data
- 📱 **Responsive Design** for all devices

## How to Run Locally

**Prerequisites**: Node.js & npm installed

Follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/kaustubhraiiii/stacks-smarts-quiz.git

# Step 2: Navigate to the project directory
cd stacks-smarts-quiz

# Step 3: Install the necessary dependencies
npm install

# Step 4: Create environment variables
cp .env.example .env
# Edit .env with your API keys

# Step 5: Start the development server
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=your_supabase_url
VITE_OPENAI_API_KEY=your_openai_api_key
```

## Tech Stack

This project is built with:

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel

## Deployment

This project is deployed on Vercel. See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
