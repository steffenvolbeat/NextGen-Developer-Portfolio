# 🌙 Dark Mode Implementierungsanleitung

## Übersicht

Das NextGen-Developer-Portfolio verfügt über ein vollständig integriertes Dark/Light Mode System mit automatischer Systemerkennung, LocalStorage-Persistenz und sanften Übergängen.

---

## 📁 Dateistruktur

```
src/
├── contexts/
│   └── ThemeContext.tsx       # Theme Provider & Hook
├── components/
│   └── ui/
│       └── ThemeToggle.tsx    # Toggle Button Component
└── app/
    ├── globals.css            # Theme CSS Variables
    └── layout.tsx             # Theme Provider Integration
```

---

## 🎨 Theme-Variablen

### globals.css - CSS Variables

#### Light Mode

```css
:root.light {
  /* Backgrounds */
  --background: #ffffff;
  --background-secondary: #f8fafc;
  --background-tertiary: #f1f5f9;

  /* Text */
  --foreground: #0f172a;
  --foreground-secondary: #334155;
  --foreground-muted: #64748b;

  /* Borders */
  --border: #e2e8f0;
  --border-hover: #cbd5e1;

  /* Accents */
  --accent-primary: #06b6d4; /* Cyan */
  --accent-secondary: #8b5cf6; /* Purple */
  --accent-success: #10b981; /* Green */
  --accent-warning: #f59e0b; /* Orange */
  --accent-error: #ef4444; /* Red */

  /* 3D Scene */
  --scene-background-from: #f1f5f9;
  --scene-background-via: #e2e8f0;
  --scene-background-to: #cbd5e1;
}
```

#### Dark Mode (Default)

```css
:root,
:root.dark {
  /* Backgrounds */
  --background: #0a0a0a;
  --background-secondary: #1e293b;
  --background-tertiary: #334155;

  /* Text */
  --foreground: #ededed;
  --foreground-secondary: #cbd5e1;
  --foreground-muted: #94a3b8;

  /* Borders */
  --border: #334155;
  --border-hover: #475569;

  /* Accents */
  --accent-primary: #06b6d4;
  --accent-secondary: #a78bfa;
  --accent-success: #34d399;
  --accent-warning: #fbbf24;
  --accent-error: #f87171;

  /* 3D Scene */
  --scene-background-from: #334155;
  --scene-background-via: #1e293b;
  --scene-background-to: #0f172a;
}
```

---

## 🔧 ThemeContext Nutzung

### Provider Setup (bereits in layout.tsx integriert)

```tsx
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Hook Nutzung in Komponenten

```tsx
import { useTheme } from "@/contexts/ThemeContext";

export const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setTheme("light")}>Light Mode</button>
    </div>
  );
};
```

---

## 🎯 Theme-Integration in Komponenten

### 1. Tailwind CSS Klassen verwenden

```tsx
<div className="bg-background text-foreground">
  <h1 className="text-accent-primary">Title</h1>
  <p className="text-foreground-secondary">Description</p>
  <button className="border border-border hover:border-border-hover">
    Button
  </button>
</div>
```

### 2. Inline Styles mit Theme-Check

```tsx
const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(to bottom, #1e293b, #0f172a)"
            : "linear-gradient(to bottom, #f8fafc, #e2e8f0)",
      }}
    >
      <h1 style={{ color: theme === "dark" ? "#ffffff" : "#0f172a" }}>Title</h1>
    </div>
  );
};
```

### 3. Dynamische Klassen

```tsx
const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-gray-900" : "bg-gray-100"}>
      Content
    </div>
  );
};
```

---

## 🎨 ThemeToggle Component

Der ThemeToggle Button wird automatisch auf jeder Seite angezeigt:

```tsx
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// In page.tsx bereits integriert:
<ThemeToggle />;
```

**Features:**

- ✅ Feste Position (top-right)
- ✅ Animierte Icons (Mond/Sonne)
- ✅ Hover-Effekte
- ✅ Glow-Animation
- ✅ Smooth Transitions

---

## 📝 Neue Komponenten Theme-fähig machen

### Schritt-für-Schritt Anleitung

#### 1. Theme Hook importieren

```tsx
import { useTheme } from "@/contexts/ThemeContext";
```

#### 2. Theme in Komponente nutzen

```tsx
export const NewComponent = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-background text-foreground">{/* Dein Content */}</div>
  );
};
```

#### 3. Spezielle Farben definieren

```tsx
export const NewComponent = () => {
  const { theme } = useTheme();

  const backgroundColor = theme === "dark" ? "#1e293b" : "#f8fafc";
  const textColor = theme === "dark" ? "#ededed" : "#0f172a";

  return (
    <div style={{ backgroundColor, color: textColor }}>
      {/* Dein Content */}
    </div>
  );
};
```

---

## 🎨 3D-Szenen Theme-Integration

### Canvas Hintergrund

```tsx
const MyCanvas = () => {
  const { theme } = useTheme();

  return (
    <Canvas
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(to bottom right, #334155, #1e293b, #0f172a)"
            : "linear-gradient(to bottom right, #f1f5f9, #e2e8f0, #cbd5e1)",
      }}
    >
      {/* 3D Content */}
    </Canvas>
  );
};
```

### Materialien und Lichter

```tsx
// Dark Mode: Dunklere Farben, intensivere Lichter
// Light Mode: Hellere Farben, sanftere Lichter

<ambientLight
  intensity={theme === "dark" ? 0.8 : 1.2}
  color={theme === "dark" ? "#f0f0ff" : "#ffffff"}
/>
```

---

## 💾 LocalStorage & System Detection

### Automatische Features

1. **System Theme Detection**

   - Erkennt automatisch Benutzer-Systemeinstellung beim ersten Besuch
   - `prefers-color-scheme: dark` wird erkannt

2. **LocalStorage Persistence**

   - Theme-Einstellung wird automatisch gespeichert
   - Bleibt über Sessions hinweg erhalten
   - Key: `"theme"`

3. **Hydration Protection**
   - `suppressHydrationWarning` in `<html>` Tag
   - Verhindert Flackern beim Laden

---

## 🎨 Best Practices

### ✅ DO's

1. **CSS Variables verwenden**

   ```tsx
   <div className="bg-background text-foreground" />
   ```

2. **Theme Hook nutzen für Logik**

   ```tsx
   const { theme } = useTheme();
   const icon = theme === "dark" ? <MoonIcon /> : <SunIcon />;
   ```

3. **Transitions für sanfte Übergänge**

   ```css
   transition: background-color 0.3s ease, color 0.3s ease;
   ```

4. **Kontraste prüfen**
   - Dark Mode: Hellere Texte auf dunklem Hintergrund
   - Light Mode: Dunklere Texte auf hellem Hintergrund

### ❌ DON'Ts

1. **Keine hartcodierten Farben**

   ```tsx
   // ❌ SCHLECHT
   <div className="bg-black text-white" />

   // ✅ GUT
   <div className="bg-background text-foreground" />
   ```

2. **Keine fehlenden Theme-Checks**

   ```tsx
   // ❌ SCHLECHT - nur eine Farbe
   const color = "#ffffff";

   // ✅ GUT - beide Themes
   const color = theme === "dark" ? "#ffffff" : "#0f172a";
   ```

3. **Keine globalen Styles ohne Theme**

   ```css
   /* ❌ SCHLECHT */
   body {
     background: black;
   }

   /* ✅ GUT */
   body {
     background: var(--background);
   }
   ```

---

## 🔍 Troubleshooting

### Problem: Theme flackert beim Laden

**Lösung:** `suppressHydrationWarning` in `<html>` Tag prüfen

```tsx
<html lang="en" suppressHydrationWarning>
```

### Problem: Theme wird nicht gespeichert

**Lösung:** LocalStorage prüfen

```js
// Im Browser Console:
localStorage.getItem("theme"); // Sollte 'dark' oder 'light' sein
```

### Problem: Komponente reagiert nicht auf Theme-Änderungen

**Lösung:** `useTheme()` Hook verwenden

```tsx
import { useTheme } from "@/contexts/ThemeContext";

const MyComponent = () => {
  const { theme } = useTheme(); // Wichtig!
  // ...
};
```

---

## 📊 Theme-Integration Status

### Vollständig integrierte Komponenten

- ✅ `src/app/layout.tsx` - ThemeProvider
- ✅ `src/app/page.tsx` - Main Portfolio mit ThemeToggle
- ✅ `src/components/LandingPage.tsx` - Theme-aware backgrounds & text
- ✅ `src/components/LoadingSequence.tsx` - Theme-aware 3D scene
- ✅ `src/components/ui/ThemeToggle.tsx` - Toggle Button

### Noch zu integrieren

- [ ] Station Overlays (AboutStation, ProjectsStation, etc.)
- [ ] Navigation HUD
- [ ] Modal Components
- [ ] Card Components

---

## 🚀 Quick Start für neue Features

### Neue Komponente mit Theme erstellen

```tsx
"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const MyNewComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-background text-foreground p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-accent-primary mb-4">
        My Component
      </h2>
      <p className="text-foreground-secondary">
        This component automatically adapts to {theme} mode!
      </p>

      {/* Spezielle Theme-Logik */}
      {theme === "dark" ? (
        <div className="bg-gray-800 p-4">Dark Mode Content</div>
      ) : (
        <div className="bg-gray-100 p-4">Light Mode Content</div>
      )}
    </div>
  );
};
```

---

## 📚 Weitere Ressourcen

- **ThemeContext.tsx** - Komplette Theme-Logik
- **globals.css** - Alle CSS Variables
- **DOCUMENTATION.md** - Projekt-Dokumentation

---

**Letzte Aktualisierung:** 11. Dezember 2025  
**Version:** 1.5.0  
**Status:** ✅ Vollständig implementiert
