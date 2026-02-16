# Supabase Setup Guide - Profile Project

## 🎉 Why Supabase?

- ✅ **Free tier** with generous limits
- ✅ **No local installation** needed
- ✅ **Built-in database** (PostgreSQL)
- ✅ **Web dashboard** for easy management
- ✅ **Instant setup** - Ready in 5 minutes!

---

## 📋 Step-by-Step Setup (5 Minutes)

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email
4. You'll be redirected to your dashboard

### Step 2: Create New Project

1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `profile-project` (or any name you like)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Select **"Free"** tier
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete ⏳

### Step 3: Get Your Credentials

1. Once project is ready, go to **Project Settings** (gear icon)
2. Click on **"API"** in the left sidebar
3. You'll see:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public key**: A long key starting with `eyJ...`
4. **Copy both** - you'll need them soon!

### Step 4: Create Database Tables

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"+ New Query"**
3. Open the file `database/schema.sql` from this project
4. **Copy ALL the SQL code** from that file
5. **Paste it** into the Supabase SQL editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see "Success. No rows returned"
8. ✅ Your database is ready with sample data!

### Step 5: Configure Backend

1. Open terminal in the project folder
2. Navigate to backend:
   ```bash
   cd profile-project-supabase/backend
   ```

3. Copy the environment file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux use `cp` instead of `copy`)

4. Open `.env` file in any text editor
5. Replace with your Supabase credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

6. Save the file

### Step 6: Install & Run

**Backend:**
```bash
# Still in backend folder
npm install
npm run dev
```

You should see:
```
Server running on port 5000
Environment: development
Database: Supabase PostgreSQL
```

**Frontend** (Open new terminal):
```bash
cd profile-project-supabase/frontend
npm install
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

### Step 7: Test It! 🎉

1. Open browser to **http://localhost:3000**
2. You should see Jane Developer's profile
3. Try clicking **"Edit Profile"**
4. Try adding an endorsement to a skill
5. Toggle dark mode

---

## 🔍 Verify Database Setup

### Check Tables in Supabase Dashboard:

1. Go to **"Table Editor"** in Supabase dashboard
2. You should see these tables:
   - ✅ profiles (1 row - Jane Developer)
   - ✅ skills (6 rows)
   - ✅ endorsements (4 rows)
   - ✅ social_links (4 rows)
   - ✅ work_experience (2 rows)
   - ✅ work_achievements (6 rows)
   - ✅ achievements (4 rows)
   - ✅ interests (5 rows)

3. Click on **"profiles"** table
4. You should see Jane Developer's data

---

## 🎯 Common Issues & Solutions

### Issue: "Missing Supabase credentials" error

**Solution:**
- Make sure you copied `.env.example` to `.env`
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- No spaces around the `=` sign
- No quotes around the values

### Issue: SQL script failed to run

**Solution:**
- Make sure you copied the ENTIRE schema.sql content
- Run it in a fresh query (click "+ New Query")
- Check for any error messages in red
- If tables already exist, you can drop them first:
  ```sql
  DROP TABLE IF EXISTS endorsements CASCADE;
  DROP TABLE IF EXISTS skills CASCADE;
  DROP TABLE IF EXISTS social_links CASCADE;
  DROP TABLE IF EXISTS work_achievements CASCADE;
  DROP TABLE IF EXISTS work_experience CASCADE;
  DROP TABLE IF EXISTS achievements CASCADE;
  DROP TABLE IF EXISTS interests CASCADE;
  DROP TABLE IF EXISTS profiles CASCADE;
  ```
  Then run the full schema.sql again

### Issue: "Error fetching profile" in app

**Solution:**
1. Check backend terminal - is it running?
2. Test the API directly: http://localhost:5000/api/health
3. Should see: `{"status":"OK",...}`
4. Check Supabase credentials in `.env` are correct
5. Verify SQL script ran successfully

### Issue: Port 5000 already in use

**Solution:**
```bash
# Change port in backend/.env
PORT=5001

# Then restart backend
npm run dev
```

---

## 📊 Supabase Free Tier Limits

Perfect for this project:
- ✅ **500 MB Database** - More than enough
- ✅ **Unlimited API requests** - No limits!
- ✅ **50,000 monthly active users**
- ✅ **1 GB file storage**
- ✅ **2 GB bandwidth**

---

## 🚀 Next Steps

### View Your Data in Supabase

1. Go to **"Table Editor"**
2. Click on any table to view/edit data
3. You can manually add/edit/delete rows here

### Backup Your Data

1. Go to **"Database"** → **"Backups"**
2. Free tier gets daily backups for 7 days

### Deploy to Production

When you're ready:
1. Your Supabase database is already in the cloud!
2. Just deploy your backend and frontend (see DEPLOYMENT.md)
3. No database migration needed - it's already online!

---

## 💡 Why This is Better Than MongoDB

### No Installation
- MongoDB: Need to install locally or setup Atlas
- Supabase: Just signup and go!

### Built-in Dashboard
- MongoDB: Need MongoDB Compass or command line
- Supabase: Beautiful web dashboard included

### SQL Editor
- MongoDB: Complex query syntax
- Supabase: Simple SQL queries, with AI assistant!

### Free Tier
- MongoDB Atlas: 512 MB limit
- Supabase: 500 MB + more features

---

## 🆘 Still Having Issues?

1. **Check Supabase status**: https://status.supabase.com
2. **Verify credentials**: In Supabase → Settings → API
3. **Check backend logs**: Look for error messages
4. **Test API**: http://localhost:5000/api/health

### Support Resources:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- This project's TROUBLESHOOTING.md

---

## ✅ Setup Complete Checklist

- [ ] Supabase account created
- [ ] Project created in Supabase
- [ ] Got Project URL and API key
- [ ] Ran schema.sql in SQL Editor
- [ ] Configured backend/.env with credentials
- [ ] Backend npm install completed
- [ ] Frontend npm install completed
- [ ] Backend running (http://localhost:5000/api/health works)
- [ ] Frontend running (http://localhost:3000 works)
- [ ] Can see Jane Developer's profile
- [ ] Can edit profile and save
- [ ] Can add endorsements

If all checked ✅ - **Congratulations!** 🎉

---

**Total Setup Time**: 5-10 minutes

Much easier than MongoDB! 🚀
