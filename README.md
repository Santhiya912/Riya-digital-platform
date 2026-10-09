# Riyadvi Software Technologies: Website Revamp

A premium, multi-page corporate website for **Riyadvi Software Technologies**, combining interactive 3D, scroll-based storytelling, a data-driven page architecture and a full-stack backend with lead management.

- **Live site:** https://riya-digital-platform.vercel.app
- **Live API:** https://riya-digital-platform.onrender.com/api/health
- **Repository:** https://github.com/Santhiya912/Riya-digital-platform

> The API runs on Render's free tier. The first request after inactivity can take 30-50 seconds while the instance wakes up.

---

## Features

- **Interactive 3D hero** (React Three Fiber): a connected-node sphere that reacts to cursor movement
- **Scroll-based storytelling** (GSAP ScrollTrigger + Lenis): Business Challenge to Growth journey
- **Interactive services showcase**: animated visual per service (Motion)
- **3D technology ecosystem**: draggable sphere of technologies (R3F + Drei)
- **Dynamic service pages**: one reusable template, six services, driven by data
- **Portfolio and case studies**: one reusable template; one case study uses a 3D presentation
- **Business Health Checkup**: 5-step form with validation, stored in MongoDB
- **Lead magnet**: Software Project Planning Guide, lead captured before download
- **Contact page**: validated form, WhatsApp link, Calendly placeholder
- **Careers**: department / designation / experience filters, dynamic job pages, application form
- **Backend API** with validation, error handling and MongoDB storage

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | GSAP + ScrollTrigger, Lenis, Motion |
| Backend | Node.js, Express 5 |
| Validation | Zod |
| Database | MongoDB Atlas (Mongoose) |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
Riya-digital-platform/
├── frontend/
│   ├── public/guides/            # downloadable lead-magnet PDF
│   └── src/
│       ├── app/                  # routes (services/[slug], portfolio/[slug], careers/[slug], ...)
│       ├── components/
│       │   ├── layout/           # Navbar, Footer, SmoothScroll
│       │   ├── sections/         # Hero, Transformation, forms, lists
│       │   └── three/            # R3F scenes
│       ├── data/                 # services.ts, portfolio.ts, jobs.ts
│       └── lib/api.ts            # shared API helper
└── backend/
    ├── server.js
    ├── models/index.js           # Mongoose models
    └── routes/forms.js           # validated form endpoints
```

## Dynamic Content Architecture

Pages are generated from data files, not hardcoded:

```
data/services.ts  -> /services/[slug]  (one template, six pages)
data/portfolio.ts -> /portfolio/[slug] (one case-study template)
data/jobs.ts      -> /careers/[slug]   (one job template)
```

**To add a new service, project or job, add one entry to the matching data file.** The list pages, detail pages, filters and static routes update automatically. The data shapes are typed, so they can be swapped for a CMS (Strapi, Sanity, WordPress) or a database API later without changing the templates.

## Installation

**Prerequisites:** Node.js 20+, Git, a MongoDB Atlas cluster.

```bash
git clone https://github.com/Santhiya912/Riya-digital-platform.git
cd Riya-digital-platform

# Backend
cd backend
npm install
npm run dev          # http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev          # http://localhost:3000
```

## Environment Variables

**`backend/.env`**

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/riyadvi?appName=Cluster0
FRONTEND_URL=http://localhost:3000
```

**`frontend/.env.local`**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

`.env` files are git-ignored. Never commit real credentials.

## Database Setup

1. Create a free **M0** cluster on MongoDB Atlas.
2. Create a database user (**Database Access**).
3. Allow your IP under **Network Access** (`0.0.0.0/0` for deployment).
4. Put the connection string in `backend/.env`, with the database name `riyadvi` after `.net/`.

Collections are created automatically on first insert:
`contacts`, `consultations`, `healthcheckups`, `leadmagnets`, `applications`.

## API Endpoints

All endpoints accept JSON `POST` requests and validate input with Zod.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Contact enquiry |
| POST | `/api/consultation` | Consultation request |
| POST | `/api/health-checkup` | Business Health Checkup lead |
| POST | `/api/lead-magnet` | Lead magnet download lead |
| POST | `/api/applications` | Career application |

**Success (201):** `{ "success": true, "message": "Submitted successfully", "id": "..." }`

**Validation error (400):** `{ "success": false, "message": "Validation failed", "errors": [{ "field": "email", "message": "Invalid email" }] }`

**Server error (500):** `{ "success": false, "message": "Something went wrong" }`

## Deployment

**Backend (Render)**
- Root directory: `backend`, build: `npm install`, start: `npm start`
- Env vars: `MONGODB_URI`, `FRONTEND_URL` (the Vercel URL, no trailing slash)

**Frontend (Vercel)**
- Root directory: `frontend`
- Env var: `NEXT_PUBLIC_API_URL` (the Render URL, no trailing slash)

## AI Tools Used

### 1. Claude
**Purpose:** Architecture planning, folder structure, code generation, debugging.

**Example prompt:**
> Set up a Next.js App Router monorepo with /frontend and /backend. Create a reusable service page template driven by a services.ts data file, with a Tailwind theme using gold #D4AF37 and black, and Lenis smooth scrolling.

**What was generated:** Project structure, the typed `services.ts` data model, the dynamic `[slug]` page template, the R3F hero scene, Express routes and Zod schemas.

**What I changed manually:**
- Replaced drei `Html` tags in the tech sphere with `Text` + `Billboard` after hitting a React 19 error ("Attempted to synchronously unmount a root while React was already rendering")
- Fixed the MongoDB connection string (database name must come before `?`)
- Fixed missing `zod` dependency and missing npm scripts in `backend/package.json`
- Debugged Atlas IP-whitelist and Render environment-variable issues during deployment
- Replaced placeholder content with Riyadvi-specific content

**Why selected:** Strong at multi-file reasoning and explaining generated code, which helped me understand and own it.

### 2. <Add other tools you actually used>
**Purpose:**
**Example prompt:**
**What was generated:**
**What I changed manually:**
**Why selected:**

> Only list tools you really used (for example ChatGPT, Cursor, v0, Midjourney). Be specific and honest.

## 3D Libraries Used

- **Three.js**: rendering engine
- **React Three Fiber**: Three.js in React
- **Drei**: `OrbitControls`, `Float`, `Text`, `Billboard`

## Animation Libraries Used

- **GSAP + ScrollTrigger**: pinned scroll storytelling
- **Lenis**: smooth scrolling, synced with ScrollTrigger
- **Motion**: micro-interactions, service visuals, form step transitions

## Third-Party Assets

- Fonts: Inter, Poppins (Google Fonts via `next/font`)
- All 3D visuals are generated in code. No external 3D models are used.
- Portfolio and job content is placeholder content based on the existing Riyadvi website.

## Performance Optimization

- 3D scenes are lazy-loaded with `next/dynamic` and `ssr: false` (separate chunks)
- Device-aware 3D: fewer nodes/tags on mobile, static fallback when `prefers-reduced-motion` is set
- Capped pixel ratio (`dpr={[1, 1.5]}`) to limit mobile GPU load
- Fonts optimized with `next/font`
- Lightweight CSS/Motion visuals for service cards instead of many WebGL canvases
- `whileInView` animations run once

## Known Limitations

- Careers accepts a **resume link**, not a file upload
- No admin dashboard yet
- No email notification yet
- Blog and About pages are in progress
- Calendly and WhatsApp use placeholders
- Render free tier has cold starts
- Portfolio and blog content is sample content

## Future Improvements

- Admin dashboard (JWT auth, enquiry and application tables, status updates)
- Resume upload with Cloudinary or S3
- Email notifications with Nodemailer
- CMS integration (Strapi / Sanity) for services, portfolio, blog and jobs
- Custom Blender/Spline 3D models
- Lighthouse and Core Web Vitals pass
- Automated tests and CI
