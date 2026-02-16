# Troubleshooting Guide

## 🔧 Common Issues and Solutions

### Installation Issues

#### Issue: `npm install` fails with EACCES error
**Error Message:**
```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solution:**
```bash
# Option 1: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 2: Use sudo (not recommended)
sudo npm install

# Option 3: Use nvm (recommended)
# Install nvm first, then:
nvm install 18
nvm use 18
```

#### Issue: Node version too old
**Error Message:**
```
The engine "node" is incompatible with this module
```

**Solution:**
```bash
# Check current version
node --version

# Using nvm
nvm install 18
nvm use 18
nvm alias default 18

# Or download from nodejs.org
# https://nodejs.org/
```

---

### MongoDB Issues

#### Issue: MongoDB connection refused
**Error Message:**
```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

**1. Start MongoDB (if using local installation):**
```bash
# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Manual start
mongod --dbpath /path/to/data/directory
```

**2. Check if MongoDB is running:**
```bash
# Mac/Linux
ps aux | grep mongod

# Windows
tasklist | findstr mongod
```

**3. Use MongoDB Atlas (cloud database):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster (M0)
- Get connection string
- Update backend/.env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-db
```

#### Issue: Authentication failed
**Error Message:**
```
MongoServerError: Authentication failed
```

**Solution:**
```bash
# Check your connection string in .env
# Make sure username and password are correct
# Password should be URL encoded if it contains special characters

# Example with special characters:
# Password: p@ssw0rd!
# Encoded: p%40ssw0rd%21
```

#### Issue: Database not found
**Error Message:**
```
MongoError: Database does not exist
```

**Solution:**
```bash
# MongoDB creates databases automatically
# Just run the seed script:
cd backend
npm run seed

# This will create the database with sample data
```

---

### Port Issues

#### Issue: Port already in use
**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**1. Find and kill the process:**
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**2. Change the port:**
```bash
# Edit backend/.env
PORT=5001

# Or set environment variable
PORT=5001 npm run dev
```

**3. Check what's using the port:**
```bash
# Mac/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

---

### Frontend Issues

#### Issue: Blank white screen
**Symptoms:**
- Page loads but shows nothing
- No errors in terminal
- May have console errors

**Solutions:**

**1. Check browser console (F12):**
```javascript
// Look for errors like:
// - API connection errors
// - Module not found
// - CORS errors
```

**2. Verify API URL:**
```bash
# Check frontend/.env or create it:
VITE_API_URL=http://localhost:5000/api

# Make sure backend is running first!
```

**3. Clear cache and rebuild:**
```bash
cd frontend
rm -rf node_modules dist .vite
npm install
npm run dev
```

**4. Check if backend is accessible:**
```bash
# In browser or terminal:
curl http://localhost:5000/api/health

# Should return: {"status":"OK",...}
```

#### Issue: API calls failing (CORS errors)
**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

**1. Verify backend CORS configuration:**
```javascript
// In backend/server.js
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
```

**2. Check frontend API URL:**
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
# NOT https if backend is http
```

**3. Ensure backend is running:**
```bash
cd backend
npm run dev
# Should see: "Server running on port 5000"
```

#### Issue: Changes not reflecting
**Symptoms:**
- Made code changes but nothing updates
- Old code still running

**Solutions:**

**1. Hard refresh browser:**
```
Ctrl/Cmd + Shift + R
or
Ctrl/Cmd + F5
```

**2. Clear Vite cache:**
```bash
cd frontend
rm -rf .vite
npm run dev
```

**3. Check if file is saved:**
- Ensure changes are actually saved
- Check if you're editing the right file
- Look for syntax errors (check terminal)

---

### Backend Issues

#### Issue: Cannot find module
**Error Message:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Mongoose validation error
**Error Message:**
```
ValidationError: name: Path `name` is required
```

**Solution:**
```javascript
// Ensure required fields are provided
// Check your request body includes all required fields:
{
  "name": "Required",
  "email": "Required",
  // other fields...
}
```

#### Issue: Seed script fails
**Error Message:**
```
Error seeding database: ...
```

**Solutions:**

**1. Check MongoDB connection:**
```bash
# Make sure MongoDB is running
# Check connection string in .env
```

**2. Clear existing data:**
```bash
# In MongoDB shell or Compass
use profile-db
db.profiles.deleteMany({})
```

**3. Re-run seed:**
```bash
cd backend
npm run seed
```

---

### Environment Variable Issues

#### Issue: Environment variables not loading
**Symptoms:**
- undefined values for process.env variables
- Connection strings not working

**Solutions:**

**1. Ensure .env file exists:**
```bash
cd backend
ls -la | grep .env
# Should see .env file

# If not, copy from example:
cp .env.example .env
```

**2. Check .env format:**
```env
# NO SPACES around =
PORT=5000
# NOT: PORT = 5000

# NO QUOTES needed
MONGODB_URI=mongodb://localhost:27017/profile-db
# NOT: MONGODB_URI="mongodb://localhost:27017/profile-db"
```

**3. Restart server after .env changes:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**4. Check dotenv is loaded:**
```javascript
// In server.js
import dotenv from 'dotenv';
dotenv.config();

console.log('PORT:', process.env.PORT); // Should show value
```

---

### Build Issues

#### Issue: Build fails with memory error
**Error Message:**
```
FATAL ERROR: Reached heap limit Allocation failed
```

**Solution:**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
```

#### Issue: Import errors during build
**Error Message:**
```
Could not resolve './Component'
```

**Solutions:**

**1. Check file extensions:**
```javascript
// Include .jsx extension
import Component from './Component.jsx'
```

**2. Check case sensitivity:**
```javascript
// File: ProfileHeader.jsx
import ProfileHeader from './ProfileHeader' // Correct
import profileHeader from './profileHeader' // Wrong
```

---

### Deployment Issues

#### Issue: 404 on deployed site
**Symptoms:**
- Homepage works
- Refresh on any other page shows 404

**Solution:**
```nginx
# Add to nginx.conf or Vercel/Netlify settings
location / {
    try_files $uri $uri/ /index.html;
}

# For Vercel, add vercel.json:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### Issue: Environment variables not working in production
**Solutions:**

**1. Set variables in hosting platform:**
- Vercel: Project Settings → Environment Variables
- Railway: Variables tab in project
- Render: Environment section in service settings

**2. Check variable names:**
```bash
# Vite requires VITE_ prefix for frontend
VITE_API_URL=https://api.example.com

# Backend variables don't need prefix
MONGODB_URI=mongodb+srv://...
```

---

### Performance Issues

#### Issue: Slow page load
**Solutions:**

**1. Check network tab:**
- Large images? → Optimize or use CDN
- Many requests? → Implement lazy loading
- Slow API? → Add caching

**2. Optimize images:**
```javascript
// Use next-gen formats
// Compress images
// Implement lazy loading
```

**3. Enable production build:**
```bash
# Frontend
npm run build
npm run preview

# Backend
NODE_ENV=production npm start
```

---

## 🔍 Debugging Tips

### Check Logs
```bash
# Backend logs
cd backend
npm run dev
# Watch terminal for errors

# Frontend logs
# Open browser console (F12)
# Watch for red errors
```

### Test API Endpoints
```bash
# Using curl
curl http://localhost:5000/api/health
curl http://localhost:5000/api/profiles

# Using browser
# Just paste URLs in address bar
```

### Database Issues
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Connect to MongoDB
mongosh
use profile-db
db.profiles.find().pretty()
```

### Network Issues
```bash
# Check if ports are open
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Test connectivity
curl http://localhost:5000/api/health
```

---

## 🆘 Still Having Issues?

### Before Asking for Help

1. **Check error messages carefully** - They usually tell you exactly what's wrong
2. **Search the error** - Google or Stack Overflow likely has the answer
3. **Read the documentation** - Check README, QUICKSTART guides
4. **Try the basics** - Restart servers, clear cache, reinstall dependencies

### Information to Provide

When asking for help, include:
1. **Exact error message** - Copy full error, not screenshot
2. **What you tried** - Steps taken so far
3. **Environment** - OS, Node version, package versions
4. **Relevant code** - The code causing the issue
5. **Console logs** - Both terminal and browser console

### Getting Help

1. Create GitHub issue with detailed information
2. Check project documentation
3. Review similar issues in repo
4. Search Stack Overflow

---

## ✅ Prevention Tips

### Best Practices to Avoid Issues

1. **Keep dependencies updated** - Regularly run `npm update`
2. **Use .env files properly** - Never commit secrets
3. **Test locally first** - Before deploying
4. **Read error messages** - They're helpful
5. **Use git branches** - For experimental changes
6. **Document changes** - So you remember what you did
7. **Regular backups** - Of database data
8. **Monitor logs** - Check regularly for warnings

### Development Workflow

```bash
# 1. Start fresh each day
git pull origin main
npm install  # If package.json changed

# 2. Make changes
# Edit code...

# 3. Test locally
npm run dev

# 4. Commit when working
git add .
git commit -m "Description"

# 5. Deploy when stable
git push origin main
```

---

Remember: Most issues are simple to fix once you identify them. Take time to read error messages carefully - they're usually very helpful!
