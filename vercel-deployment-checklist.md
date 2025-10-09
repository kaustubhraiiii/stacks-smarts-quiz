# ✅ Vercel Deployment Checklist

## Pre-Deployment
- [ ] All code committed and pushed to GitHub
- [ ] Environment variables documented
- [ ] Build tested locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] All features working in development

## Vercel Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported from GitHub
- [ ] Build settings verified (auto-detected)

## Environment Variables (Add in Vercel Dashboard)
- [ ] `VITE_SUPABASE_PROJECT_ID=btbosehnsjzohdhoinhz`
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0Ym9zZWhuc2p6b2hkaG9pbmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NTA5NjYsImV4cCI6MjA3NTUyNjk2Nn0.OYPLOBz6vR-di7gL_I0P5YC5fdveK92pzx9Xjkr5-js`
- [ ] `VITE_SUPABASE_URL=https://btbosehnsjzohdhoinhz.supabase.co`
- [ ] `VITE_OPENAI_API_KEY=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`

## Supabase Configuration
- [ ] Add Vercel domain to allowed origins
- [ ] Configure Google OAuth redirect URLs
- [ ] Test database connection

## Deployment
- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Note the live URL

## Post-Deployment Testing
- [ ] Homepage loads correctly
- [ ] Authentication works (signup/login)
- [ ] Google OAuth works
- [ ] Topic selection works
- [ ] Static quiz questions work
- [ ] AI Brain generates questions
- [ ] AI quiz integration works
- [ ] Leaderboard displays
- [ ] User profiles work
- [ ] All responsive design works

## Optional Enhancements
- [ ] Custom domain setup
- [ ] Vercel Analytics enabled
- [ ] Error monitoring configured
- [ ] Performance optimization

---

**Your live URL:** `https://your-project-name.vercel.app`
