# 📝 User-Daten Bearbeitungs-Anleitung

## ✏️ So bearbeitest du deine Portfolio-Daten

Alle deine persönlichen Portfolio-Daten befinden sich in einer zentralen Datei:

**Datei:** `src/data/portfolio.ts`

---

## 📋 Datenstruktur

### 1. **Persönliche Informationen** (`personal`)

```typescript
personal: {
  name: "Steffen Lorenz",           // ← Dein vollständiger Name
  title: "Web-Entwickler / Fullstack",  // ← Deine Berufsbezeichnung
  location: "Erfurt, Deutschland",   // ← Dein Standort
  email: "steffen.konstanz@gmx.ch",  // ← Deine E-Mail
  phone: "+49 173 4235651",          // ← Deine Telefonnummer
  website: "https://github.com/steffenvolbeat",  // ← Deine Website/GitHub
  yearsOfExperience: 2,              // ← Jahre Berufserfahrung
  social: {
    github: "https://github.com/steffenvolbeat",
    linkedin: "https://www.linkedin.com/in/steffenlorenz24",
    // ... weitere Social Links
  }
}
```

---

### 2. **Über mich** (`about`)

```typescript
about: {
  intro: "Deine Kurzvorstellung...",
  description: `Deine ausführliche Beschreibung...`,
  highlights: [
    "💻 Highlight 1",
    "🎓 Highlight 2",
    // ... weitere Highlights
  ],
  values: [
    {
      title: "Innovation",
      description: "Beschreibung...",
      icon: "🚀"
    }
  ]
}
```

---

### 3. **Skills** (`skills`)

```typescript
skills: [
  {
    id: "frontend",
    name: "Frontend Development",
    category: "Frontend Development",
    color: "#3b82f6",
    items: [
      {
        id: "html5",
        name: "HTML5",
        level: 85, // ← 0-100 (Prozent)
        yearsExperience: 2, // ← Jahre Erfahrung
      },
      // ... weitere Skills
    ],
  },
];
```

**Level-Guide:**

- 0-20: Anfänger
- 21-40: Grundkenntnisse
- 41-60: Fortgeschritten
- 61-80: Sehr gut
- 81-100: Experte

---

### 4. **Berufserfahrung** (`experience`)

```typescript
experience: [
  {
    id: "exp1",
    company: "Firma Name",
    position: "Deine Position",
    location: "Stadt, Land",
    startDate: "2022-09-01", // ← Format: YYYY-MM-DD
    endDate: "2024-07-31", // ← oder null wenn aktuell
    current: false, // ← true wenn aktueller Job
    description: "Beschreibung...",
    responsibilities: ["Aufgabe 1", "Aufgabe 2"],
    technologies: ["Tech1", "Tech2"],
    achievements: ["Erfolg 1", "Erfolg 2"],
  },
];
```

---

### 5. **Projekte** (`projects`)

```typescript
projects: [
  {
    id: "proj1",
    title: "Projekt-Name",
    description: "Kurzbeschreibung",
    longDescription: "Ausführliche Beschreibung...",
    technologies: ["Next.js", "React", "TypeScript"],
    category: "Full Stack", // Frontend | Backend | Full Stack | 3D Visualization
    status: "completed", // completed | in-progress | planned
    startDate: "2024-11-01",
    endDate: "2025-01-31", // oder null wenn laufend
    links: {
      github: "https://github.com/...",
      demo: "https://demo.com", // optional
      website: "https://...", // optional
    },
    featured: true, // true = wird prominent angezeigt
    highlights: ["Feature 1", "Feature 2"],
  },
];
```

---

### 6. **Kontakt** (`contact`)

```typescript
contact: {
  email: "deine@email.com",
  phone: "+49 123 456789",
  availability: "Verfügbar für neue Projekte",
  responseTime: "Antwort innerhalb von 24 Stunden",
  methods: [
    {
      name: "E-Mail",
      type: "email",
      value: "info@example.com",
      icon: "📧",
      primary: true         // Haupt-Kontaktmethode
    }
  ]
}
```

---

## 🎯 Schritt-für-Schritt: Daten bearbeiten

### Schritt 1: Datei öffnen

```bash
code src/data/portfolio.ts
```

### Schritt 2: Bearbeiten

- Finde den Abschnitt, den du ändern willst
- Ändere die Werte zwischen den Anführungszeichen `"..."`
- Zahlen (level, yearsExperience) OHNE Anführungszeichen
- Booleans: `true` oder `false`

### Schritt 3: Speichern

- Drücke `Strg + S` (Windows/Linux) oder `Cmd + S` (Mac)
- Die Änderungen werden sofort sichtbar im Dev-Server

### Schritt 4: Überprüfen

```bash
npm run dev
```

- Öffne http://localhost:3000
- Navigiere zu den Stationen und prüfe die Änderungen

---

## ⚠️ Wichtige Regeln

### DO's ✅

- Texte immer in Anführungszeichen: `"Mein Text"`
- Arrays mit Kommas trennen: `["Item 1", "Item 2", "Item 3"]`
- Datums-Format: `"2024-01-15"` (YYYY-MM-DD)
- Farben als Hex: `"#3b82f6"`

### DON'Ts ❌

- **NICHT** die Struktur ändern (Klammern, Kommas)
- **NICHT** Variablennamen ändern (`name:`, `title:`, etc.)
- **NICHT** TypeScript-Syntax ändern
- **NICHT** Kommentare löschen (`//`)

---

## 🔍 Häufige Anpassungen

### Name & Titel ändern

```typescript
personal: {
  name: "Max Mustermann",           // ← Hier ändern
  title: "Senior Full-Stack Developer",  // ← Hier ändern
  ...
}
```

### Skill hinzufügen

```typescript
items: [
  // Bestehende Skills...
  {
    id: "react", // ← Eindeutige ID (lowercase, keine Leerzeichen)
    name: "React", // ← Anzeige-Name
    category: "frontend",
    level: 80, // ← Dein Level (0-100)
    yearsExperience: 3, // ← Jahre Erfahrung
  },
];
```

### Projekt hinzufügen

```typescript
projects: [
  // Bestehende Projekte...
  {
    id: "proj-new", // ← Eindeutige ID
    title: "Mein neues Projekt",
    description: "Kurzbeschreibung...",
    technologies: ["Tech1", "Tech2"],
    category: "Frontend",
    status: "in-progress",
    startDate: "2025-01-01",
    endDate: null, // null = laufend
    links: {
      github: "https://github.com/...",
    },
    featured: true,
    highlights: [],
  },
];
```

### E-Mail & Telefon ändern

```typescript
personal: {
  email: "neue@email.com",      // ← Hier ändern
  phone: "+49 987 654321",      // ← Hier ändern
  ...
}

contact: {
  email: "neue@email.com",      // ← Auch hier ändern!
  phone: "+49 987 654321",      // ← Auch hier ändern!
  ...
}
```

---

## 🐛 Fehler beheben

### Syntax-Fehler

Wenn die App nicht mehr funktioniert:

1. **Überprüfe die Konsole:**

   ```bash
   npm run dev
   ```

   Fehlermeldungen werden dort angezeigt

2. **Häufige Fehler:**

   - Vergessenes Komma am Ende einer Zeile
   - Fehlende Anführungszeichen: `name: Max` ❌ → `name: "Max"` ✅
   - Fehlende schließende Klammer: `{` ohne `}`

3. **Zurücksetzen:**
   ```bash
   git checkout src/data/portfolio.ts
   ```
   (Setzt die Datei auf den letzten gespeicherten Stand zurück)

---

## 📊 Checkliste nach Änderungen

- [ ] Alle Anführungszeichen korrekt gesetzt?
- [ ] Alle Kommas am richtigen Ort?
- [ ] Datums-Format korrekt (YYYY-MM-DD)?
- [ ] Level-Werte zwischen 0 und 100?
- [ ] E-Mail in `personal` UND `contact` aktualisiert?
- [ ] Links mit https:// beginnen?
- [ ] `npm run dev` läuft ohne Fehler?
- [ ] Änderungen im Browser sichtbar?

---

## 🚀 Best Practices

1. **Backup erstellen**

   ```bash
   cp src/data/portfolio.ts src/data/portfolio.backup.ts
   ```

2. **Kleine Änderungen zuerst**

   - Ändere zunächst nur einen kleinen Teil
   - Teste die Änderung
   - Dann weiter mit nächsten Änderungen

3. **Git verwenden**

   ```bash
   git add src/data/portfolio.ts
   git commit -m "Portfolio-Daten aktualisiert"
   ```

4. **Regelmäßig speichern**
   - Nach jeder größeren Änderung speichern
   - Im Browser testen

---

## 💡 Tipps

- **Icons:** Verwende Emojis für Icons (📧, 💼, 🚀, etc.)
- **Farben:** Nutze Hex-Farbcodes (#3b82f6, #10b981, etc.)
- **Links:** Immer vollständige URLs mit https://
- **Beschreibungen:** Halte sie prägnant aber aussagekräftig
- **Level-Werte:** Sei realistisch bei Skill-Levels

---

## 📞 Support

Bei Problemen oder Fragen:

1. Überprüfe die Konsole (`npm run dev`)
2. Prüfe diese Anleitung
3. Erstelle ein Backup vor größeren Änderungen

---

_Letzte Aktualisierung: 11. Dezember 2025_
