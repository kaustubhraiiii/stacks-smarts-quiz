# 🔒 Security Migration Guide

## ⚠️ CRITICAL: Your API keys have been compromised and need immediate action!

### Step 1: Update Your .env File (REQUIRED)

Your current `.env` file needs to be updated to use the new secure server-side configuration:

```bash
# Open your .env file and make these changes:

# 1. Change this line:
# VITE_OPENAI_API_KEY="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"

# 2. To this (remove VITE_ prefix):
OPENAI_API_KEY="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"
```

### Step 2: Generate New API Keys (CRITICAL)

**Your current API keys are exposed and must be regenerated immediately:**

#### OpenAI API Key:
1. Go to https://platform.openai.com/api-keys
2. Delete the compromised key: `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`
3. Create a new API key
4. Update your `.env` file with the new key

#### Supabase Keys:
1. Go to your Supabase dashboard
2. Navigate to Settings → API
3. Reset your keys if needed
4. Update your `.env` file

### Step 3: Update Deployment Environment Variables

Update your Vercel deployment with the new environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update these variables:
   - `OPENAI_API_KEY` (new server-side key, no VITE_ prefix)
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`

### Step 4: Remove Compromised Keys from Git History (CRITICAL)

If you've committed the .env file to git, you need to remove it from history:

```bash
# Remove .env from git tracking
git rm --cached .env

# Commit the removal
git commit -m "Remove .env from tracking"

# Optional: Clean git history (WARNING: This rewrites history)
# Only do this if the repository is private and you're the only contributor
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -- --all
```

### Step 5: Verify Security Fixes

✅ **Checklist:**
- [ ] .env file is in .gitignore
- [ ] New API keys generated and updated in .env
- [ ] Old API keys deleted from providers
- [ ] Vercel environment variables updated
- [ ] No API keys in documentation files
- [ ] Client-side OpenAI usage replaced with secure API route

## What We Fixed:

1. **Added .env to .gitignore** - Prevents future commits of sensitive data
2. **Removed API keys from documentation** - No more hardcoded secrets in MD files
3. **Created secure API route** - OpenAI requests now go through server-side API
4. **Updated environment variable structure** - Server-side vs client-side separation

## Security Best Practices Going Forward:

- ✅ Never commit API keys to version control
- ✅ Use server-side API routes for sensitive operations
- ✅ Regularly rotate API keys
- ✅ Use environment variables for all secrets
- ✅ Review code for hardcoded credentials before commits
