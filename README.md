# KPR Electronics — React + Node starter

A responsive single-page product enquiry site built with React, Vite, CSS, Express, and Node.js.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
From the project root:

```bash
npm run install:all
npm run dev
```

Frontend: http://localhost:5173  
Backend health check: http://localhost:5000/api/health

If your frontend runs on a different origin, set `CLIENT_ORIGIN` in `server/.env` (copy `server/.env.example`).

## Included
- Responsive page and mobile navigation
- Dark/light mode toggle
- Product category filtering and live search
- Quote modal with client-side required fields and API integration
- Express `POST /api/quote` with basic validation, CORS, Helmet, JSON body parsing, and rate limiting
- Contact form UI placeholder (currently client-side only)
- Scroll reveal animations and reduced-motion support

