# LeetCode Explorer

A LeetCode analytics platform: search a username to see solved problems, contest rating, streak, acceptance rate, difficulty mix, weekly activity and rating history, and compare with another user.

Repository: https://github.com/nihaverse/LeetCodeExplorer

## Status

| Area | Status |
|---|---|
| Landing page (animated, 3D cosmic background) | Done |
| Login / Signup UI (same-route form switch) | Done (UI only) |
| Dashboard with real data | Done |
| Django backend: profile endpoint, caching, error handling | Done |
| Authentication (login, signup, sessions, Google OAuth) | Planned |
| Compare Users page | Planned |
| Visual insights, Saved profiles pages | Planned |
| MCP server and AI Companion | Planned |

## Tech stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router, Recharts, Lucide React, GSAP, Lenis, Three.js, React Three Fiber and Drei.

**Backend:** Django, Django REST Framework, django-cors-headers, python-dotenv, requests. Managed with uv.

**Data source:** [alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api), run locally. The public hosted instance is rate limited, so local is recommended.

## Project structure

```text
LeetCode/
├── frontend/
│   └── src/
│       ├── api/            leetcodeClient.js (calls the Django API)
│       ├── components/
│       │   ├── common/
│       │   ├── dashboard/  profile, stats, charts, comparison, signals
│       │   ├── landing/    navbar, hero, sections, cosmic scene, cursor glow
│       │   ├── layout/     Sidebar, TopNavbar
│       │   └── login/      background, visual, login and signup forms
│       ├── hooks/          useLeetCodeUser.js
│       ├── pages/          LandingPage, LoginPage, Dashboard
│       ├── styles/         theme.css (design tokens)
│       └── utils/
└── backend/
    ├── config/             Django project settings and urls
    └── leetcode/           client.py, services.py, views.py, urls.py
```

## Routes

| Route | Page |
|---|---|
| `/` | Landing page |
| `/login` | Login and Signup (same route, form switches in place) |
| `/dashboard` | Profile dashboard |

## Running locally

Three servers run at the same time, each in its own terminal.

**1. LeetCode data API** (clone it outside this repo)

```powershell
git clone https://github.com/alfaarghya/alfa-leetcode-api.git
cd alfa-leetcode-api
npm install
npm run build
npm start
```

Runs on `http://localhost:3000`.

**2. Django backend**

Create `backend/.env`:

```text
LEETCODE_API_BASE=http://localhost:3000
```

Then:

```powershell
cd backend
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

Runs on `http://127.0.0.1:8000`.

**3. Frontend**

```powershell
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`. To point the frontend at a different backend, set `VITE_API_BASE_URL`.

## API

`GET /api/profile/<username>/` returns a normalized profile:

- name, avatar, country
- solved counts (total, easy, medium, hard) and acceptance rate
- current streak
- contest stats (rating, global ranking, top percentage, badge), or `null` if the user never took part in a contest
- the last 6 attended contests
- 12 weeks of submission activity

Successful responses are cached for 10 minutes. Errors return `{"error": "..."}` with a matching status: 404 user not found, 429 rate limit, 502/504 upstream problems.

## Design system

- Colors: background `#1a1310`, surface `#221a15`, primary `#e07b4c`, secondary `#7aab9b`, gold `#e6b84a`, coral `#d9604f`, text `#f4e8dc`, muted `#a89888`
- Fonts: Inter for UI text, Space Grotesk for headings
- Tokens live in `frontend/src/styles/theme.css`

## Notes

- Weekly activity counts **submissions**, not solved problems, because that is what LeetCode's calendar provides.
- Design elements that LeetCode data cannot support (yearly target, peer percentile, weekly quest) are intentionally left out.
- The Login and Signup forms are UI only; no authentication backend exists yet.
- Never commit `.env` files.