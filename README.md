# Profile Project - Supabase Edition

A full-stack profile application with **Supabase (PostgreSQL)** - No MongoDB installation needed!

## 🎯 Perfect for Windows Users!

This version uses **Supabase** instead of MongoDB, which means:
- ✅ **No local database installation** required
- ✅ **Works instantly** on Windows, Mac, and Linux
- ✅ **Free cloud database** included
- ✅ **Web dashboard** for easy data management
- ✅ **Setup in 5 minutes**!

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Get Supabase Credentials

1. Go to https://supabase.com and sign up
2. Create a new project (takes 2 minutes)
3. Get your **Project URL** and **API Key** from Settings → API
4. **Run the SQL script** (see SUPABASE_SETUP.md for details)

### Step 2: Setup Project

```bash
# 1. Install backend
cd backend
npm install

# 2. Configure environment
copy .env.example .env
# Edit .env with your Supabase credentials

# 3. Start backend
npm run dev
```

```bash
# 4. Install frontend (new terminal)
cd frontend
npm install

# 5. Start frontend
npm run dev
```

### Step 3: Open Browser

Go to **http://localhost:3000** 🎉

---

## 📚 Complete Setup Guide

See **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** for detailed step-by-step instructions with screenshots!

---

## ✨ Features

### Core Features
- ✅ Full-stack profile management
- ✅ Edit mode with real-time updates
- ✅ Responsive design (mobile-first)
- ✅ Dark mode with persistence
- ✅ **Supabase PostgreSQL** database

### Innovation: Skill Endorsement System 🌟
- ✅ LinkedIn-style skill endorsements
- ✅ Public validation of expertise
- ✅ Endorser details with messages
- ✅ Real-time UI updates
- ✅ Social proof for professionals

---

## 🛠 Tech Stack

**Frontend:**
- React 18.2
- Vite
- Framer Motion (animations)
- Axios (API calls)

**Backend:**
- Node.js + Express
- Supabase (PostgreSQL)
- RESTful API

**Database:**
- Supabase (PostgreSQL cloud database)
- No local installation needed!

---

## 📁 Project Structure

```
profile-project-supabase/
├── backend/
│   ├── config/
│   │   └── supabase.js        # Supabase client
│   ├── controllers/
│   │   └── profileController.js
│   ├── routes/
│   │   └── profileRoutes.js
│   ├── .env.example           # Template
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API client
│   │   └── App.jsx
│   └── package.json
│
├── database/
│   └── schema.sql             # Database setup script
│
├── SUPABASE_SETUP.md         # ⭐ START HERE!
├── README.md                  # This file
├── FEATURES.md               # All features documented
└── DEPLOYMENT.md             # Hosting guide
```

---

## 🔑 Environment Variables

**Backend (.env):**
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

```
GET    /api/profiles              # Get all profiles
GET    /api/profiles/:id          # Get profile by ID
POST   /api/profiles              # Create profile
PUT    /api/profiles/:id          # Update profile

POST   /api/profiles/:id/skills/:skillId/endorse      # Add endorsement
GET    /api/profiles/:id/skills/:skillId/endorsements # Get endorsements

PATCH  /api/profiles/:id/theme    # Update theme
GET    /api/profiles/:id/stats    # Get statistics
```

---

## 🎨 Features

See **[FEATURES.md](FEATURES.md)** for the complete list of 40+ features!

Highlights:
- 🎨 Beautiful editorial design
- 🌙 Dark mode support
- 📱 Fully responsive
- ⚡ Real-time updates
- 🏆 Skill endorsements (innovation feature)
- 📊 Profile statistics
- 🔄 Edit mode
- 🎭 Smooth animations

---

## 🚀 Deployment

Your Supabase database is already in the cloud! Just deploy:

**Backend**: Railway, Render, or Heroku  
**Frontend**: Vercel or Netlify

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed instructions.

---

## 🆚 MongoDB vs Supabase

| Feature | MongoDB | Supabase |
|---------|---------|----------|
| Setup | Complex | 5 minutes |
| Local Install | Required | None needed |
| Dashboard | Compass (separate) | Built-in web UI |
| Free Tier | 512 MB | 500 MB + more |
| Windows Setup | Complicated | Easy |
| SQL Support | No | Yes |

**Winner for this project: Supabase!** ✅

---

## 🎓 Learning Resources

- **Supabase Docs**: https://supabase.com/docs
- **PostgreSQL Tutorial**: https://www.postgresql.org/docs/
- **React**: https://react.dev
- **Express**: https://expressjs.com

---

## 🐛 Troubleshooting

See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for common issues.

Quick fixes:
- ✅ Can't connect? Check `.env` credentials
- ✅ No data? Run the SQL script in Supabase dashboard
- ✅ Port error? Change PORT in `.env`
- ✅ Still stuck? Read SUPABASE_SETUP.md

---

## 📝 Documentation

1. **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - ⭐ Setup guide (START HERE!)
2. **[README.md](README.md)** - This file (overview)
3. **[FEATURES.md](FEATURES.md)** - All features documented
4. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment
5. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Problem solving

---

## 🎯 Why This Version?

**Original Version** (MongoDB):
- Requires MongoDB installation
- Complex Windows setup
- Local database management
- More configuration needed

**This Version** (Supabase):
- ✅ No installation needed
- ✅ Works instantly on Windows
- ✅ Cloud database included
- ✅ Web dashboard for management
- ✅ Same features, easier setup!

---

## 📊 Project Stats

- **Frontend**: 1,500+ lines of React code
- **Backend**: 600+ lines of Node.js code
- **Database**: PostgreSQL with 8 tables
- **Documentation**: 4 comprehensive guides
- **Features**: 40+ implemented features
- **Setup Time**: 5 minutes!

---

## 🙏 Credits

Built for **Gidy.ai Technical Challenge**

**Tech Stack:**
- React + Vite (Frontend)
- Node.js + Express (Backend)
- Supabase PostgreSQL (Database)
- Framer Motion (Animations)

---

## 📞 Support

Having issues? 

1. Read **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)**
2. Check **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**
3. Verify Supabase credentials
4. Test API: http://localhost:5000/api/health

---

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] SQL script executed successfully  
- [ ] Backend .env configured
- [ ] `npm install` completed for both
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Profile loads in browser
- [ ] Can edit and save profile
- [ ] Can add endorsements

All checked? **You're all set!** 🎉

---

**Powered by Supabase** 🚀  
**Built with ❤️ for Gidy.ai**
