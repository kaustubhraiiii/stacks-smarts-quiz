# 🚀 SmartStacks MVP - Vercel Deployment Guide

This guide will walk you through deploying your SmartStacks MVP to Vercel with all features including AI Brain, authentication, and database integration.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Supabase project set up
- OpenAI API key

## 🛠️ Step 1: Prepare Your Repository

### 1.1 Push to GitHub (if not already done)
```bash
git push origin main
```

### 1.2 Verify Project Structure
Your project should have:
- `package.json` with proper scripts
- `.env` file with environment variables
- `src/` directory with all components
- `supabase/` directory with database setup

## 🌐 Step 2: Deploy to Vercel

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `smartstacks-mvp` repository

### 2.2 Configure Build Settings
Vercel will auto-detect these settings:
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Environment Variables
Add these environment variables in Vercel:

#### Required Variables:
```
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
VITE_OPENAI_API_KEY=your_openai_api_key
```

**⚠️ SECURITY NOTE:** Never commit actual API keys to version control. Use the values from your `.env` file.

#### How to Add Environment Variables:
1. In Vercel dashboard → Your Project → Settings
2. Go to "Environment Variables" tab
3. Add each variable with its value
4. Make sure to add them for all environments (Production, Preview, Development)

## 🔧 Step 3: Configure Supabase for Production

### 3.1 Update Supabase Settings
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Add your Vercel domain to allowed origins:
   - `https://your-project.vercel.app`
   - `https://your-project-git-main.vercel.app` (for preview deployments)

### 3.2 Configure OAuth (Google Sign-in)
1. In Supabase → Authentication → Providers
2. Enable Google provider
3. Add your Vercel domains to redirect URLs:
   - `https://your-project.vercel.app`
   - `https://your-project.vercel.app/`

## 🤖 Step 4: OpenAI Configuration

### 4.1 Verify API Key
- Ensure your OpenAI API key is valid and has sufficient credits
- The key should have access to GPT-3.5-turbo model

### 4.2 Usage Monitoring
- Monitor API usage in OpenAI dashboard
- Set up billing alerts if needed

## 🚀 Step 5: Deploy and Test

### 5.1 Initial Deployment
1. Click "Deploy" in Vercel
2. Wait for build to complete (2-3 minutes)
3. Vercel will provide you with a live URL

### 5.2 Test All Features
Test these features on your live site:

#### Authentication:
- [ ] Email signup/login
- [ ] Google OAuth sign-in
- [ ] User profile display
- [ ] Sign out functionality

#### Quiz System:
- [ ] Topic selection
- [ ] Difficulty selection
- [ ] Static question quizzes
- [ ] Quiz results and scoring

#### AI Brain:
- [ ] AI question generation
- [ ] Custom prompt generation
- [ ] Question preview
- [ ] Generate & Start Quiz
- [ ] Bulk question generation

#### Database:
- [ ] Quiz attempts saving
- [ ] Leaderboard functionality
- [ ] User profile creation

## 🔒 Step 6: Security Considerations

### 6.1 Environment Variables
- Never commit `.env` file to git
- All sensitive keys are now in Vercel environment variables
- API keys are client-side (this is expected for this architecture)

### 6.2 CORS and Origins
- Supabase automatically handles CORS for your domain
- OpenAI API calls are made from client-side (normal for this setup)

## 📊 Step 7: Monitoring and Analytics

### 7.1 Vercel Analytics (Optional)
- Enable Vercel Analytics in your dashboard
- Monitor performance and user behavior

### 7.2 Error Monitoring
- Check Vercel function logs for any errors
- Monitor browser console for client-side issues

## 🔄 Step 8: Continuous Deployment

### 8.1 Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests

### 8.2 Custom Domain (Optional)
1. Go to Vercel → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase allowed origins with new domain

## 🐛 Troubleshooting

### Common Issues:

#### Build Failures:
- Check that all dependencies are in `package.json`
- Ensure build command is `npm run build`
- Check for TypeScript errors

#### Environment Variables:
- Verify all variables are set in Vercel
- Check variable names match exactly
- Ensure no extra spaces in values

#### Authentication Issues:
- Verify Supabase URL and keys
- Check allowed origins in Supabase
- Ensure OAuth redirect URLs are correct

#### AI Generation Issues:
- Verify OpenAI API key is valid
- Check API usage limits
- Monitor network requests in browser

## 🎉 Success!

Your SmartStacks MVP is now live with:
- ✅ Full authentication system
- ✅ AI-powered question generation
- ✅ Real-time quiz functionality
- ✅ Database integration
- ✅ Leaderboard system
- ✅ Responsive design

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify all environment variables
4. Test each feature systematically

---

**Your live app URL will be:** `https://your-project-name.vercel.app`

Happy coding! 🚀
