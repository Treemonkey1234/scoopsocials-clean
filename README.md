# 🎯 ScoopSocials - Clean Deployment

A modern social platform focused on community reviews and trust-based networking, featuring an interactive walkthrough system for new users.

## 🚀 Features

### **Interactive Walkthrough System**
- 6-step guided tour for new users
- Social platform integration (Top 11 North American platforms)
- Phone contact import
- Trust score explanation and warnings

### **Core Platform**
- **Reviews-focused** social feed (not life updates)
- **Trust scores** based on community reviews
- **Event discovery** and networking
- **Search functionality** for people and locations
- **Friend management** with trust-based connections

### **Technical Stack**
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, CORS-enabled API
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Storage**: localStorage for user preferences and walkthrough state

## 📱 Quick Start

### **Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Production Deployment**
- **Frontend**: Deploy to Vercel from root directory (this directory)
- **Backend**: Deploy to Railway from `/backend` directory
- **Environment**: Set CORS_ORIGIN to Vercel URL

## 🎯 Walkthrough System

### **Triggers**
- New account creation only
- First-time user experience
- localStorage-based progress tracking

### **Social Platform Integration**
Top 11 North American platforms in popularity order:
1. Facebook, 2. YouTube, 3. Instagram, 4. TikTok, 5. Twitter/X
6. LinkedIn, 7. Snapchat, 8. Discord, 9. Reddit, 10. Twitch, 11. Pinterest
+ "Other" option for custom platforms

### **Trust Score Warnings**
- Red warning text on profile page
- Blocking popups for incomplete setup
- Participation restrictions until profile completion

## 🏗️ Project Structure

```
scoopsocials-clean/
├── pages/             # Next.js pages
├── src/               # React components and logic
├── public/            # Static assets
├── styles/            # CSS styles
├── backend/           # Node.js Express API
└── package.json       # Dependencies
```

## 📋 Navigation Order
1. **Home** - Reviews feed
2. **Events** - Event discovery and creation  
3. **Search** - People and location search
4. **Friends** - Network management
5. **Profile** - User profile and trust score

## 🔧 Development Tools
- **TestNewUser component** for walkthrough testing
- **Debug localStorage** state management
- **Environment-based** feature toggles

---

**🎯 Goal**: Clean, conflict-free deployment with complete feature set
**📅 Created**: December 2025  
**🔧 Status**: Production ready - Deploy from ROOT directory 