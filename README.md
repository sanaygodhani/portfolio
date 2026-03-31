# Portfolio — React

A reusable, dark-themed developer portfolio.
**Edit one file** (`frontend/src/config.js`) to make it completely yours.

```
portfolio/
├── frontend/               ← React (Vite) — deployed to GitHub Pages
│   └── src/
│       ├── config.js       ← ✏️  THE ONLY FILE YOU NEED TO EDIT
│       ├── components/     ← One file per section (Navbar, Hero, Skills…)
│       ├── hooks/          ← useScrollReveal (scroll animations)
│       ├── styles.css      ← All styling — CSS variables at the top
│       └── App.jsx         ← Assembles all sections
```

---

## Quick start (local dev)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+  
- Python 3.10+  
- A Gmail account (for the contact form)

---

### Step 1 — Clone the repo

```bash
git clone https://github.com/sanaygodhani/portfolio
cd portfolio
```

---

### Step 2 — Personalise (edit ONE file)

Open **`frontend/src/config.js`** and fill in your details.  
Every field has a comment explaining what it does.  
You do **not** need to touch any other file.

---

### Step 3 — Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** — the site is live with hot reload.

---

## Deploying to GitHub Pages (frontend)

### One-time setup

1. Push your repo to GitHub (make sure it's public for the free Pages tier)

2. Add your production API URL to a new file `frontend/.env.production`:

```env
VITE_API_URL=https://your-flask-app.onrender.com
```

3. In `frontend/package.json`, the `deploy` script is already set up:

```json
"deploy": "npm run build && gh-pages -d dist"
```

### Deploy

```bash
cd frontend
npm run deploy
```

This builds the React app and pushes the `dist/` folder to the `gh-pages` branch of your repo.

4. In your GitHub repo → **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
   - Click Save

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/portfolio/
```

> **Note:** It can take 1–3 minutes for the first deploy to go live.

---

## Deploying Flask to Render (backend)

Render's **free tier** is perfect for a contact form — it handles HTTPS automatically.

1. Go to [render.com](https://render.com) and sign up (free)

2. Click **New → Web Service** → connect your GitHub repo

3. Set the **Root Directory** to `backend`

4. Render auto-detects the `Procfile` — the start command will be:
   ```
   gunicorn app:app
   ```

5. Under **Environment Variables**, add:

   | Key | Value |
   |-----|-------|
   | `MAIL_USER` | your Gmail address |
   | `MAIL_PASS` | your Gmail App Password |
   | `RECIPIENT` | where to receive emails |
   | `ALLOWED_ORIGIN` | `https://YOUR_USERNAME.github.io` |

6. Click **Deploy**. Render gives you a URL like `https://portfolio-xyz.onrender.com`.

7. Copy that URL into `frontend/.env.production`:
   ```env
   VITE_API_URL=https://portfolio-xyz.onrender.com
   ```

8. Re-run `npm run deploy` from the `frontend/` folder.

> **Free tier note:** Render spins down idle services after 15 minutes.  
> The first contact form submission after inactivity may take ~30 seconds.  
> Upgrade to the $7/month tier to keep it always-on.

---

## Customisation reference

All customisation happens in **`frontend/src/config.js`**.

| Field | What it does |
|-------|-------------|
| `name` | Your full name (appears in navbar, footer, about) |
| `tagline` | Array of 3 strings for the hero heading |
| `bio` | One-line description below the heading |
| `available` | `true` shows the green "Available" badge |
| `stats` | Array of `{ value, label }` — hero stats row |
| `skills` | Array of skill cards — `{ category, title, tags[] }` |
| `experience` | Array of jobs — `{ company, role, location, date, bullets[] }` |
| `projects` | Array of projects — `{ name, description, stack[], link }` |
| `education` | Single object — `{ school, degree, minor, graduated, interests[] }` |
| `ticker` | Array of strings for the scrolling banner |

**To change colours:** open `frontend/src/styles.css` and edit the `:root` variables at the top:

```css
:root {
  --accent:  #5b6bff;   /* primary blue → change to any colour */
  --green:   #22d3a5;   /* badge / success green */
  --accent2: #a78bfa;   /* stack tag purple */
}
```

---

## Project structure explained

```
frontend/src/
├── config.js              ← All your data lives here
├── main.jsx               ← React entry point (don't touch)
├── App.jsx                ← Imports and orders all sections
├── styles.css             ← All CSS — tokens at top, sections labelled
├── hooks/
│   └── useScrollReveal.js ← IntersectionObserver → fade-up animations
└── components/
    ├── Navbar.jsx          ← Fixed top nav, collapses on mobile
    ├── Hero.jsx            ← Full-viewport landing
    ├── Ticker.jsx          ← Scrolling tech keyword banner
    ├── Skills.jsx          ← Skill cards grid
    ├── Experience.jsx      ← Work history timeline
    ├── Projects.jsx        ← Project cards with stack tags
    ├── About.jsx           ← Two-column bio + education card
    ├── Contact.jsx         ← Form → POST /api/contact → Flask
    └── Footer.jsx          ← Name + copyright
```

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend framework | React 18 (Vite) | Fast dev server, minimal config |
| Styling | Vanilla CSS + variables | No runtime overhead, easy to customise |
| Animations | CSS keyframes + IntersectionObserver | No library dependency |
| Email | Python smtplib | Zero external email service needed |
| Frontend deploy | GitHub Pages via gh-pages | Free, integrated with GitHub |

