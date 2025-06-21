# 🤖 GitHub Actions Deployment Setup

Since you've installed GitHub Actions, here's the **complete setup guide** for automated deployment!

## 🎯 Quick Setup Steps

### 1. 🔐 Add Repository Secrets

Go to your GitHub repository: **Settings → Secrets and variables → Actions**

#### Required Secrets for Vercel (Frontend):
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here  
VERCEL_PROJECT_ID=your_project_id_here
```

#### Required Secrets for Railway (Backend):
```
RAILWAY_TOKEN=your_railway_token_here
```

#### Environment URLs:
```
FRONTEND_URL=https://your-app.vercel.app
API_URL=https://your-backend.railway.app
```

### 2. 🔑 Get Your Tokens

#### Vercel Token:
```bash
# Install Vercel CLI
npm i -g vercel

# Login and get your tokens
vercel login
vercel whoami
vercel project ls

# Get project details
vercel project ls
# Copy the project ID from the output
```

#### Railway Token:
```bash
# Install Railway CLI  
npm i -g @railway/cli

# Login and get your token
railway login
railway whoami

# Get your project details
railway list
```

### 3. 🚀 Automatic Deployment

Once you've added the secrets, **every push to main branch** will automatically:

1. ✅ **Build and deploy frontend** to Vercel
2. ✅ **Build and deploy backend** to Railway  
3. ✅ **Run health checks** to verify everything works
4. ✅ **Notify you** of deployment status

## 📋 Detailed Token Setup

### Getting Vercel Tokens

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Create/Link Project**:
   ```bash
   cd frontend
   vercel
   # Follow prompts to create project
   ```

4. **Get Organization ID**:
   ```bash
   vercel teams ls
   # Copy your team/org ID
   ```

5. **Get Project ID**:
   ```bash
   vercel project ls
   # Copy your project ID
   ```

6. **Get Token**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Settings → Tokens
   - Create new token
   - Copy the token

### Getting Railway Tokens

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Create Project**:
   ```bash
   cd backend
   railway init
   # Follow prompts to create project
   ```

4. **Get Token**:
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Account Settings → Tokens
   - Create new token
   - Copy the token

## 🔧 Environment Variables Setup

### In Vercel Dashboard:
```
NEXT_PUBLIC_API_URL = https://your-backend.railway.app
```

### In Railway Dashboard:
```
NODE_ENV = production
CORS_ORIGIN = https://your-frontend.vercel.app
PORT = 3001
```

## 🎉 Testing Your Setup

### 1. Commit and Push:
```bash
git add .
git commit -m "🚀 Setup GitHub Actions deployment"
git push origin main
```

### 2. Watch the Magic:
- Go to **Actions** tab in your GitHub repository
- Watch the deployment workflow run
- See real-time logs of frontend and backend deployment

### 3. Verify Deployment:
- Frontend: Check your Vercel URL
- Backend: Check your Railway URL + `/health`
- Walkthrough: Test the new user flow

## 🚨 Troubleshooting

### Common Issues:

#### 1. **Vercel Token Issues**
```bash
# Verify token works
vercel whoami --token YOUR_TOKEN
```

#### 2. **Railway Token Issues**  
```bash
# Verify token works
railway login --token YOUR_TOKEN
railway whoami
```

#### 3. **Build Failures**
- Check the Actions logs in GitHub
- Verify all environment variables are set
- Check for any missing dependencies

#### 4. **CORS Errors After Deployment**
- Make sure `CORS_ORIGIN` in Railway matches your Vercel URL exactly
- No trailing slashes in URLs

## 📊 Deployment Status

Your GitHub Actions will show:

✅ **Frontend Build** - Next.js compilation  
✅ **Frontend Deploy** - Vercel deployment  
✅ **Backend Build** - Express.js setup  
✅ **Backend Deploy** - Railway deployment  
✅ **Health Checks** - Verify both services work  
✅ **Integration Test** - API connectivity test  

## 🎯 Success Indicators

### ✅ Deployment Successful When:
1. **GitHub Actions** shows all green checkmarks
2. **Vercel URL** loads your ScoopSocials app
3. **Railway URL/health** returns 200 OK
4. **Walkthrough triggers** for new users
5. **Trust score warnings** appear correctly
6. **API calls** work between frontend/backend

## 🔄 Continuous Deployment

Now every time you:
- **Push to main** → Automatic deployment
- **Create PR** → Preview deployment (Vercel)
- **Merge PR** → Production deployment

## 🎉 You're All Set!

Your ScoopSocials platform now has:
- ✅ **Automated deployment** via GitHub Actions
- ✅ **Frontend hosting** on Vercel  
- ✅ **Backend hosting** on Railway
- ✅ **Health monitoring** built-in
- ✅ **Zero-downtime deployments**

**Just push your code and watch it deploy automatically! 🚀**

---

### 🆘 Need Help?

If you run into issues:
1. Check the **Actions** tab for detailed logs
2. Verify all **secrets** are set correctly  
3. Test **tokens** work with CLI tools
4. Check **environment variables** in both platforms

**Your interactive walkthrough with trust score warnings is ready to go live! 🌟** 