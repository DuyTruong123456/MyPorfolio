# Portfolio

A personal portfolio site built with **React** and **Vite**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customize

Edit `src/data/portfolio.js` to update your name, bio, skills, projects, and social links.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Deploy

Build the site, then deploy the `dist` folder to Vercel, Netlify, GitHub Pages, or any static host:

```bash
npm run build
```

## Project structure

```
src/
├── components/   # UI sections (Hero, About, Projects, etc.)
├── data/         # Portfolio content (edit this first)
├── App.jsx       # Page layout
├── main.jsx      # Entry point
└── index.css     # Global styles
```
