# Deployment Guide

## Quick Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Backend on Railway

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # In backend directory
   cd backend
   railway init
   railway up
   ```

3. **Add MongoDB**
   - In Railway dashboard, click "New"
   - Select "Database" → "MongoDB"
   - Copy connection string
   - Add to backend environment variables

4. **Set Environment Variables**
   - In Railway project settings
   - Add:
     - `PORT=5000`
     - `MONGODB_URI=<your-mongodb-uri>`
     - `NODE_ENV=production`

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`

#### Frontend on Vercel

1. **Create Vercel Account**
   - Visit https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # In frontend directory
   cd frontend
   vercel
   ```

3. **Configure**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variable**
   - In Vercel project settings
   - Add: `VITE_API_URL=https://your-backend.railway.app/api`

5. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Render (All-in-One)

#### Backend + Database

1. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

2. **Create MongoDB Instance**
   - New → MongoDB
   - Choose free tier
   - Save connection string

3. **Deploy Backend**
   - New → Web Service
   - Connect GitHub repository
   - Settings:
     - Name: profile-backend
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: production
   - Create Web Service

4. **Get Backend URL**
   - Render provides: `https://profile-backend.onrender.com`

#### Frontend

1. **Deploy Frontend**
   - New → Static Site
   - Connect GitHub repository
   - Settings:
     - Name: profile-frontend
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
   - Environment Variable:
     - `VITE_API_URL`: Your backend URL + `/api`
   - Create Static Site

### Option 3: Docker Deployment

#### Using Docker Compose (Local/VPS)

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

The app will be available at:
- Frontend: http://localhost
- Backend: http://localhost:5000
- MongoDB: localhost:27017

#### Individual Docker Containers

```bash
# Backend
cd backend
docker build -t profile-backend .
docker run -p 5000:5000 --env-file .env profile-backend

# Frontend
cd frontend
docker build -t profile-frontend .
docker run -p 80:80 profile-frontend
```

### Option 4: Heroku

#### Backend

```bash
cd backend

# Install Heroku CLI
# Create Heroku app
heroku create profile-backend-app

# Add MongoDB addon
heroku addons:create mongodb:sandbox

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git init
heroku git:remote -a profile-backend-app
git add .
git commit -m "Initial commit"
git push heroku main

# Run seed
heroku run npm run seed
```

#### Frontend

```bash
cd frontend

# Create Heroku app
heroku create profile-frontend-app

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Add environment variable
heroku config:set VITE_API_URL=https://profile-backend-app.herokuapp.com/api

# Create Procfile
echo "web: npm run preview" > Procfile

# Deploy
git init
heroku git:remote -a profile-frontend-app
git add .
git commit -m "Initial commit"
git push heroku main
```

## MongoDB Atlas Setup

1. **Create Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster**
   - Build a Database
   - Choose FREE tier (M0)
   - Select region closest to your deployment
   - Create cluster

3. **Database Access**
   - Database Access → Add New Database User
   - Choose password authentication
   - Save username and password
   - Set permissions: Read and write to any database

4. **Network Access**
   - Network Access → Add IP Address
   - For development: Allow access from anywhere (0.0.0.0/0)
   - For production: Add specific IPs

5. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `profile-db`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/profile-db?retryWrites=true&w=majority
```

## Environment Variables Checklist

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Post-Deployment Steps

1. **Test Backend**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Seed Database**
   - Via deployment platform CLI:
     ```bash
     railway run npm run seed  # Railway
     heroku run npm run seed   # Heroku
     ```
   - Or use MongoDB Compass/Atlas to insert sample data

3. **Test Frontend**
   - Visit your frontend URL
   - Check browser console for errors
   - Verify API calls in Network tab

4. **Verify CORS**
   - Ensure backend allows frontend origin
   - Update CORS settings if needed

## Troubleshooting

### Backend Issues
- **Cannot connect to MongoDB**: Check connection string and network access
- **Port already in use**: Change PORT in .env
- **Module not found**: Run `npm install`

### Frontend Issues
- **API calls failing**: Verify VITE_API_URL is correct
- **White screen**: Check browser console for errors
- **Build fails**: Clear node_modules and reinstall

### CORS Errors
- Add frontend URL to backend CORS configuration:
  ```javascript
  app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-url.com']
  }));
  ```

## Monitoring & Maintenance

### Railway
- View logs in dashboard
- Auto-deploys on git push
- Monitor usage in dashboard

### Render
- View logs in dashboard
- Set up notifications
- Auto-deploys on git push

### Vercel
- View deployment logs
- Analytics available
- Preview deployments for PRs

## Cost Optimization

- **Free Tiers Available**:
  - MongoDB Atlas: 512MB free forever
  - Railway: $5 free credits/month
  - Render: 750 hours free/month
  - Vercel: Unlimited deployments
  - Heroku: Eco dynos $5/month

- **Scaling**: All platforms support easy scaling as your app grows

## Security Best Practices

1. Use environment variables (never commit .env)
2. Enable HTTPS (provided by all platforms)
3. Restrict MongoDB network access
4. Use strong JWT secrets
5. Keep dependencies updated
6. Enable rate limiting in production
7. Regular security audits

---

For detailed platform-specific docs:
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Heroku: https://devcenter.heroku.com
