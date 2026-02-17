# 🧑‍💻 Profile Project — Gidy.ai Full-Stack Technical Challenge

> A full-stack developer profile application with real-time editing, skill endorsements, AI-powered bio generation, and dark mode — built with React, Node.js, Express, and Supabase.

---

## 🔗 Submission Links

| | Link |
|---|---|
| 🌐 **Live Demo** | https://profile-project-phi.vercel.app |
| 💻 **GitHub Repo** | https://github.com/Subramanian2004/profile-project |

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Setup Instructions](#-setup-instructions-local)
- [Innovation Features](#-innovation-features)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework with hooks |
| **Vite** | Fast build tool and dev server |
| **Framer Motion** | Smooth animations and transitions |
| **Axios** | HTTP client for API requests |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **Supabase JS** | Database client for PostgreSQL |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

### Database
| Technology | Purpose |
|---|---|
| **Supabase** | Cloud PostgreSQL database |
| **PostgreSQL** | Relational database (via Supabase) |

### Deployment
| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **Supabase** | Cloud database (always online) |

---

## ⚙️ Setup Instructions (Local)

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18 or higher → https://nodejs.org
- **npm** v8 or higher (comes with Node.js)
- A free **Supabase** account → https://supabase.com

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/Subramanian2004/profile-project.git
cd profile-project
```

---

### Step 2: Set Up Supabase Database

1. Go to https://supabase.com and sign in
2. Click **"New Project"** and create a project
3. Once ready, go to **SQL Editor** → **New Query**
4. Copy the entire contents of `database/schema.sql`
5. Paste into the SQL Editor and click **"Run"**
6. You should see: ✅ *Success. No rows returned*
7. Go to **Settings → API** and copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

---

### Step 3: Configure Backend

```bash
cd backend
npm install
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux
```

Open `backend/.env` and fill in your Supabase credentials:

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

---

### Step 4: Configure Frontend

```bash
cd ../frontend
npm install
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux
```

Open `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 5: Run the Application

Open **two separate terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
You should see:
```
Supabase client initialized
Server running on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
You should see:
```
Local: http://localhost:3000
```

---

### Step 6: Open in Browser

Go to **http://localhost:3000** 🎉

---

### ✅ Setup Checklist

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] `backend/.env` configured with Supabase credentials
- [ ] `frontend/.env` configured with API URL
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Profile page loads with data

---

## 💡 Innovation Features

### 1. 🏅 Skill Endorsement System

**What it does:**
A LinkedIn-style endorsement system that lets visitors publicly validate a developer's skills, transforming a static profile into a living, credibility-building platform.

**Why I built it:**
In today's hiring landscape, self-proclaimed skills carry less weight than peer validation. This feature provides real social proof — the same reason LinkedIn endorsements matter. For freelancers, job seekers, and consultants, having others vouch for your skills builds immediate trust with potential clients and employers.

**How it works:**
- Every skill card shows an endorsement counter
- Visitors click **"Endorse"** on any skill
- A modal form collects their name, email, and an optional message
- The endorsement is saved to the database with a timestamp
- The skill card updates in real time showing the new count
- Expand any skill to read all endorsement messages

**Technical implementation:**
- Nested PostgreSQL schema (`endorsements` table linked to `skills`)
- `POST /api/profiles/:id/skills/:skillId/endorse` endpoint
- Animated modal with form validation (Framer Motion)
- Optimistic UI update on submission
- Toast notifications for user feedback

---

### 2. 🌙 Dark Mode with Persistent Settings

**What it does:**
A full dark/light theme toggle that saves the user's preference to the database so it persists across sessions and devices.

**Why I built it:**
Most developers work at night. A dark mode is not just aesthetic — it reduces eye strain during long sessions. More importantly, saving the preference to the database (not just localStorage) means the theme follows the profile owner across every device they use.

**How it works:**
- Sun/Moon icon button in the profile header
- Clicking toggles between light and dark themes instantly
- The preference is saved via `PATCH /api/profiles/:id/theme`
- On next visit, the saved theme is loaded from the database
- CSS custom properties (variables) handle the full theme switch smoothly

---

### 3. 🤖 AI-Generated Bio from Profile Tags

**What it does:**
An AI-powered bio generator that reads the user's actual profile data (skills, interests, work experience, achievements) and generates a personalised, natural-sounding bio in 4 different tones.

**Why I built it:**
Writing a compelling bio is one of the hardest parts of building a profile. Most developers are great at code but struggle to market themselves in words. This feature solves that instantly — it reads what you've already entered and crafts a bio that sounds human, relevant, and professional. The 4 tone options (Professional, Creative, Casual, Technical) give full control over how you present yourself.

**How it works:**
- The user selects a tone: Professional / Creative / Casual / Technical
- Skill tags and interest tags are displayed showing exactly what data will be used
- Clicking **"Generate AI Bio"** sends the profile data to the backend
- The backend calls the Anthropic Claude API securely (no CORS issues)
- The generated bio appears with options to Copy, Regenerate, or **"Use This Bio"**
- "Use This Bio" saves it directly to the database and updates the profile instantly
- Smart fallback bios are generated from profile data even without an API key

**Technical implementation:**
- React frontend calls `POST /api/profiles/generate-bio` (backend route)
- Backend `aiController.js` calls the Anthropic Claude API server-side
- Prompt is dynamically built from the user's skills, interests, work history
- Graceful fallback if API key is not configured
- Framer Motion animated reveal of the generated bio card

---

## 📡 API Endpoints

```
GET    /api/profiles                              Get all profiles
GET    /api/profiles/:id                          Get profile by ID
POST   /api/profiles                              Create new profile
PUT    /api/profiles/:id                          Update profile
DELETE /api/profiles/:id                          Delete profile

POST   /api/profiles/:id/skills/:skillId/endorse  Add skill endorsement
GET    /api/profiles/:id/skills/:skillId/endorsements  Get endorsements

PATCH  /api/profiles/:id/theme                    Update theme preference
GET    /api/profiles/:id/stats                    Get profile statistics

POST   /api/profiles/generate-bio                 Generate AI bio
```

---

## 📁 Folder Structure

```
profile-project/
│
├── backend/
│   ├── config/
│   │   └── supabase.js          # Supabase client initialisation
│   ├── controllers/
│   │   ├── profileController.js # All profile CRUD logic
│   │   └── aiController.js      # AI bio generation logic
│   ├── routes/
│   │   └── profileRoutes.js     # All API route definitions
│   ├── .env.example             # Environment variable template
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileHeader.jsx        # Header, theme toggle, edit button
│   │   │   ├── AboutSection.jsx         # Bio display
│   │   │   ├── SkillsSection.jsx        # Skills + Endorsement system ⭐
│   │   │   ├── WorkExperience.jsx       # Interactive work timeline
│   │   │   ├── AdditionalSections.jsx   # Achievements, interests, social links
│   │   │   ├── EditProfile.jsx          # Edit mode form
│   │   │   └── AIBioGenerator.jsx       # AI bio generator ⭐
│   │   ├── services/
│   │   │   └── api.js                   # Axios API client
│   │   ├── App.jsx                      # Root component, state management
│   │   └── index.css                    # Global design system (CSS variables)
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
└── database/
    └── schema.sql               # Full PostgreSQL schema + sample data
```

---

## 🎨 Design Decisions

- **Editorial aesthetic** — Crimson Pro (display) + DM Mono (monospace) fonts give the profile a refined, magazine-like feel rather than a generic developer portfolio look
- **CSS custom properties** — All colours, spacing, and typography are driven by CSS variables, making dark mode a single attribute change on the root element
- **Component-per-feature** — Each section of the profile is its own self-contained component with its own CSS file, making the codebase easy to navigate and extend
- **Graceful fallbacks** — The AI bio generator works even without an API key; endorsements show empty states cleanly; images fall back to initials avatars

---

*Built with ❤️ for the Gidy.ai Full-Stack Technical Challenge*