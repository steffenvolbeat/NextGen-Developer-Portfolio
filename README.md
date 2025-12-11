# NextGen Developer Portfolio 🚀

Ein innovatives 3D-Portfolio mit Motherboard-Design, interaktiver Navigation und fotorealistischen Animationen.

## ✨ Features

- 🌙 **Dark/Light Mode** - Vollständig implementiertes Theme-System mit Toggle
- 🎮 **3D Navigation** - WASD + Maus Steuerung durch Portfolio-Stationen
- 💎 **Fotorealistische 3D-Szene** - PBR Materialien, Studio-Beleuchtung, Circuit Traces
- 📱 **Responsive Design** - Optimiert für alle Geräte
- ⚡ **Next.js 16** - Neueste React Framework Version mit Turbopack
- 🎨 **Tailwind CSS 4** - Moderne Styling-Lösung
- 🔷 **TypeScript** - Vollständige Typisierung

## 🌙 Dark Mode

Das Portfolio verfügt über ein vollständiges Dark/Light Mode System:

- **Auto-Detection:** Erkennt System-Theme automatisch
- **Toggle Button:** Einfacher Wechsel zwischen Modi (Top-Right)
- **LocalStorage:** Theme-Einstellung bleibt gespeichert
- **Smooth Transitions:** Sanfte Übergänge zwischen Themes
- **Theme-aware Components:** Alle Komponenten passen sich an

📖 Siehe [DARK-MODE-GUIDE.md](./DARK-MODE-GUIDE.md) für Details

## 🚀 Getting Started

Entwicklungsserver starten:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📚 Dokumentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Komplette Projekt-Dokumentation
- **[DARK-MODE-GUIDE.md](./DARK-MODE-GUIDE.md)** - Dark Mode Implementierungs-Anleitung
- **[USER-DATA-GUIDE.md](./USER-DATA-GUIDE.md)** - Portfolio-Daten bearbeiten
- **[DARK-MODE-IMPLEMENTATION.md](./DARK-MODE-IMPLEMENTATION.md)** - Implementierungs-Zusammenfassung

## 🛠 Tech Stack

### Frontend

- **Next.js 16.0.6** - React Framework mit Turbopack
- **React 19.2.0** - UI Library
- **TypeScript 5** - Typisierung
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animationen

### 3D Graphics

- **Three.js** - 3D Engine
- **React Three Fiber** - React Integration
- **React Three Drei** - Utilities

### Geplant

- **Prisma 6.9** - ORM
- **PostgreSQL** - Datenbank
- **Jest & Cypress** - Testing

## 🎯 Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root Layout mit ThemeProvider
│   ├── page.tsx      # Main Page
│   └── globals.css   # Global Styles + Theme Variables
├── components/       # React Components
│   ├── 3d/          # 3D Components
│   ├── hud/         # UI Overlays
│   ├── stations/    # Portfolio Stations
│   └── ui/          # UI Components (ThemeToggle)
├── contexts/        # React Contexts (ThemeContext)
├── data/           # Portfolio Data (portfolio.ts)
├── hooks/          # Custom Hooks
└── types/          # TypeScript Types
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
