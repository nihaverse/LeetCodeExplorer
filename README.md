# LeetCode Explorer

A full-stack LeetCode analytics platform that transforms a LeetCode username into meaningful performance insights. Users can explore their problem-solving statistics, contest performance, submission activity, and compare their progress with others through an interactive dashboard.

## Project Status

| Feature | Status |
|---|---|
| Landing page with animated 3D cosmic background | Done |
| Login / Signup UI | Done |
| Dashboard UI | Done |
| Django REST API for LeetCode profiles | Done |
| Backend caching and error handling | Done |
| Production deployment (Vercel + Render) | Done |
| Production reverse proxy | Done |
| Authentication and session handling | Partially implemented |
| Profile fetching in production | Under investigation |
| Compare Users page | Planned |
| Visual Insights page | Planned |
| Saved Profiles page | Planned |
| MCP Server | Planned |
| AI Companion | Planned |
| Google OAuth | Planned |

## Features

### 1. Landing Page
- Animated landing page with a 3D cosmic background.
- Interactive UI and smooth scrolling.
- GSAP-powered animations.
- Responsive layout.

### 2. User Authentication
- Login and Signup interfaces.
- Login and Signup forms accessible through the same route.
- Backend authentication integration.
- Session and cookie-based request handling.

### 3. LeetCode Dashboard
Search for a LeetCode username and explore:

- Total problems solved.
- Easy, Medium, and Hard problem distribution.
- Acceptance rate.
- Current and maximum streak.
- Contest rating and contest history.
- Weekly submission activity.
- Interactive charts and performance visualizations.

### 4. Backend API
- Django REST Framework-based API.
- Profile data normalization.
- Response caching.
- Error handling for unavailable users and external API failures.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- React Router
- Recharts
- Lucide React
- GSAP
- Lenis
- Three.js
- React Three Fiber
- React Three Drei

### Backend
- Python
- Django
- Django REST Framework
- django-cors-headers
- requests
- python-dotenv
- uv

### External Data Source
- [Alfa LeetCode API](https://github.com/alfaarghya/alfa-leetcode-api)

### Deployment
- Frontend: Vercel
- Backend: Render
- Reverse Proxy: Vercel Serverless Functions

## Production Deployment & Reverse Proxy

The application uses a Vercel Serverless Function as a reverse proxy to communicate with the Django backend hosted on Render.

### Production Architecture

```text
                    Browser
                       |
                       | Same-origin API requests
                       | /api/*
                       v
                Vercel (Frontend)
                       |
                       | Vercel Serverless Function
                       | frontend/api/[...path].js
                       v
                Render (Django Backend)
                       |
                       | External API requests
                       v
                 Alfa LeetCode API
```

### Reverse Proxy Implementation

A catch-all Vercel Serverless Function is implemented at:

```text
frontend/
└── api/
    └── [...path].js
```

The proxy forwards frontend API requests to the Render-hosted Django backend.

Key responsibilities:

- Routes `/api/*` requests through a Vercel Serverless Function.
- Forwards HTTP methods, query parameters, and request bodies.
- Preserves relevant request headers, including authentication and CSRF-related headers.
- Forwards cookies between the browser and backend.
- Handles Django trailing-slash URL requirements.
- Preserves backend response status codes and response bodies.
- Forwards `Set-Cookie` response headers.

This allows the frontend to communicate with the backend through same-origin API endpoints instead of making direct cross-origin requests to Render.

### Deployment Configuration

- Frontend deployed on Vercel.
- Django backend deployed on Render.
- Vercel project root directory configured as `frontend` so that the serverless API function is detected.
- Backend URL configured in the reverse proxy.
- Django CSRF trusted origins configured for the deployed frontend domain.
- Frontend requests use credentials where required for cookie-based authentication.

### Current Production Status

| Component | Status |
|---|---|
| Vercel frontend deployment | Working |
| Vercel-to-Render API routing | Working |
| CSRF endpoint and cookie forwarding | Verified |
| Login and dashboard access | Verified |
| Authentication header forwarding | Verified |
| Profile fetching through external data source | Under investigation |

**Note:** The reverse proxy and backend communication are working. Profile fetching has a separate unresolved external data-source issue, which is being investigated independently.

## Project Structure

```text
LeetCodeExplorer/
│
├── frontend/
│   ├── api/
│   │   └── [...path].js       # Vercel reverse proxy
│   │
│   └── src/
│       ├── api/
│       │   └── leetcodeClient.js
│       │
│       ├── components/
│       │   ├── common/
│       │   ├── dashboard/
│       │   ├── landing/
│       │   ├── layout/
│       │   └── login/
│       │
│       ├── hooks/
│       │   └── useLeetCodeUser.js
│       │
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   └── Dashboard.jsx
│       │
│       ├── styles/
│       │   └── theme.css
│       │
│       └── utils/
│
└── backend/
    ├── config/
    │   ├── settings.py
    │   └── urls.py
    │
    └── leetcode/
        ├── client.py
        ├── services.py
        ├── views.py
        └── urls.py
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login and Signup |
| `/dashboard` | LeetCode analytics dashboard |

## Backend API

### Get LeetCode Profile

**Endpoint:**

```http
GET /api/profile/<username>/
```

Fetches and returns normalized LeetCode profile information.

### Response Data

The API provides:

- User name and avatar.
- Country information.
- Total solved problems.
- Easy, Medium, and Hard solved counts.
- Acceptance rate.
- Current and maximum streak.
- Contest rating and contest statistics.
- Recent attended contests.
- Weekly submission activity.

### Caching

Successful profile responses are cached for 10 minutes to reduce repeated external API requests.

### Error Handling

The API handles common failure scenarios, including:

- User not found.
- External API rate limiting.
- External API errors.
- Backend timeouts.

## Local Development Setup

The application requires three services to run locally:

1. Alfa LeetCode API
2. Django Backend
3. React Frontend

### Prerequisites

- Python
- Node.js and npm
- Git
- uv

### 1. Clone the Repository

```bash
git clone https://github.com/nihaverse/LeetCodeExplorer.git
cd LeetCodeExplorer
```

### 2. Start Alfa LeetCode API

Clone the [Alfa LeetCode API](https://github.com/alfaarghya/alfa-leetcode-api) separately, outside this repository.

```bash
npm install
npm run build
npm start
```

The API should be available at:

```text
http://localhost:3000
```

### 3. Start Django Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file:

```env
LEETCODE_API_BASE=http://localhost:3000
```

Install dependencies:

```bash
uv sync
```

Apply migrations:

```bash
uv run python manage.py migrate
```

Start the development server:

```bash
uv run python manage.py runserver
```

The backend should be available at:

```text
http://localhost:8000
```

### 4. Start React Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

| Variable | Description |
|---|---|
| `LEETCODE_API_BASE` | Base URL of the Alfa LeetCode API |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL; can be configured for local development |

**Important:** Never commit `.env` files or expose secrets in the repository.

## Design System

The application uses a warm, dark visual theme with a focus on clarity and interactive data visualization.

| Design Token | Value |
|---|---|
| Background | `#1a1310` |
| Surface | `#221a15` |
| Primary | `#e07b4c` |
| Secondary | `#7aab9b` |
| Gold | `#e6b84a` |
| Coral | `#d9604f` |
| Text | `#f4e8dc` |
| Muted | `#a89888` |

**Typography:** Inter and Space Grotesk.

Design tokens are maintained in:

```text
frontend/src/styles/theme.css
```

## Known Limitations

- Weekly activity represents submissions, not problems solved.
- Contest statistics may be unavailable for users who have not participated in contests.
- Yearly targets, peer percentiles, and weekly quests are not currently supported by the data source.
- Production profile fetching is under investigation due to an external data-source error.

## Future Roadmap

- [ ] Compare multiple LeetCode users.
- [ ] Visual Insights page.
- [ ] Save and manage favorite profiles.
- [ ] Google OAuth integration.
- [ ] MCP Server integration.
- [ ] AI Companion for personalized performance insights.
- [ ] Advanced progress tracking and analytics.

## Repository

GitHub: https://github.com/nihaverse/LeetCodeExplorer

---

**LeetCode Explorer** — Turn coding activity into meaningful insights.