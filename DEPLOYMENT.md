# 🚀 ScoopSocials Deployment Guide

## 🔑 SSH Deploy Key Setup

### Step 1: Generate SSH Key Pair
```bash
# Generate deployment-specific SSH key
ssh-keygen -t ed25519 -C "scoopsocials-deploy-$(date +%Y%m%d)" -f ~/.ssh/scoopsocials_deploy

# Set proper permissions
chmod 600 ~/.ssh/scoopsocials_deploy
chmod 644 ~/.ssh/scoopsocials_deploy.pub
```

### Step 2: Add Public Key to GitHub
```bash
# Copy public key to clipboard
cat ~/.ssh/scoopsocials_deploy.pub

# Then add to GitHub:
# Repository → Settings → Deploy keys → Add deploy key
# Title: "ScoopSocials Production Deploy Key"
# ✅ Allow write access
```

### Step 3: Configure SSH
```bash
# Add to ~/.ssh/config
cat >> ~/.ssh/config << EOF
Host github-scoopsocials
    HostName github.com
    User git
    IdentityFile ~/.ssh/scoopsocials_deploy
    IdentitiesOnly yes
EOF
```

### Step 4: Test SSH Connection
```bash
# Test the connection
ssh -T github-scoopsocials

# Expected output: "Hi [username]! You've successfully authenticated..."
```

---

## 🤖 GitHub Actions Deployment (Recommended)

### Required Secrets
Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Vercel Secrets
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### Railway Secrets
```bash
RAILWAY_TOKEN=your_railway_token
```

#### Environment URLs
```bash
FRONTEND_URL=https://your-app.vercel.app
API_URL=https://your-backend.railway.app
```

### Getting Vercel Tokens
```bash
# Install Vercel CLI
npm i -g vercel

# Login and get tokens
vercel login
vercel project ls
vercel env ls
```

### Getting Railway Tokens
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and get tokens
railway login
railway list
railway status
```

---

## 🎯 Manual Deployment Options

### Option 1: Vercel CLI Deployment
```bash
# Frontend deployment
cd frontend
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
```

### Option 2: Railway CLI Deployment
```bash
# Backend deployment
cd backend
railway login
railway link
railway up
```

### Option 3: Git Push Deployment
```bash
# After setting up deploy keys
git remote add deploy github-scoopsocials:yourusername/scoopsocials-clean.git
git push deploy main
```

---

## 🔧 Environment Configuration

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_ENVIRONMENT=production
```

### Backend (.env)
```bash
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## 🏗️ Build Commands

### Frontend Build
```bash
cd frontend
npm install
npm run build
npm start
```

### Backend Build
```bash
cd backend
npm install
npm start
```

---

## 🔍 Health Checks

### Frontend Health Check
```bash
curl -f https://your-frontend.vercel.app/
```

### Backend Health Check
```bash
curl -f https://your-backend.railway.app/health
```

### API Endpoint Test
```bash
curl -f https://your-backend.railway.app/api/posts
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
```bash
# Check backend CORS_ORIGIN environment variable
# Should match your frontend URL exactly
```

#### 2. Build Failures
```bash
# Check Node.js version (should be 18+)
node --version

# Clear npm cache
npm cache clean --force
```

#### 3. SSH Key Issues
```bash
# Test SSH connection
ssh -T github-scoopsocials -v

# Check key permissions
ls -la ~/.ssh/scoopsocials_deploy*
```

#### 4. Environment Variables
```bash
# Verify all required environment variables are set
vercel env ls
railway variables
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] SSH keys generated and added to GitHub
- [ ] Environment variables configured
- [ ] Dependencies installed and tested locally
- [ ] Build process tested locally
- [ ] CORS configuration verified

### Deployment
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables set in production
- [ ] DNS/domain configuration (if applicable)
- [ ] SSL certificates configured

### Post-Deployment
- [ ] Health checks passing
- [ ] API endpoints responding
- [ ] Walkthrough system working
- [ ] Trust score warnings functional
- [ ] Social platform integration tested
- [ ] Mobile responsiveness verified

---

## 🎉 Success Indicators

### ✅ Deployment Successful When:
1. **Frontend loads** at your Vercel URL
2. **Backend health check** returns 200 OK
3. **API calls work** between frontend and backend
4. **Walkthrough triggers** for new users
5. **Trust score warnings** appear correctly
6. **Social platform integration** functions
7. **Phone contact import** button works
8. **All navigation** flows properly

---

## 🔐 Security Considerations

### SSH Key Security
- Keep private keys secure and never commit to repository
- Use different keys for different environments
- Rotate keys regularly
- Use key passphrases for additional security

### Environment Variables
- Never commit sensitive data to repository
- Use different values for development/production
- Regularly rotate API keys and tokens
- Monitor for exposed secrets

### CORS Configuration
- Restrict origins to only necessary domains
- Don't use wildcard (*) in production
- Regularly review and update allowed origins

---

## 📈 Monitoring & Maintenance

### Recommended Monitoring
- **Uptime monitoring** for both frontend and backend
- **Error tracking** (Sentry, LogRocket, etc.)
- **Performance monitoring** (Web Vitals, API response times)
- **User analytics** (walkthrough completion rates)

### Regular Maintenance
- **Dependency updates** (monthly)
- **Security patches** (as needed)
- **Performance optimization** (quarterly)
- **Backup verification** (weekly)

---

**🛡️ Your ScoopSocials platform is now ready for production deployment!**

*This guide covers all deployment scenarios from manual SSH to automated GitHub Actions. Choose the method that best fits your workflow and security requirements.* 