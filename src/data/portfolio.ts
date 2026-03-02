import { PortfolioData } from "@/types/portfolio";

/**
 * Zentrale Portfolio-Daten für das NextGen Developer Portfolio
 * Diese Daten werden in den verschiedenen 3D-Stationen angezeigt
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Steffen Lorenz",
    title: "Web-& Softwareentwickler / Fullstack",
    location: "Erfurt, Deutschland",
    email: "steffen.konstanz@gmx.ch",
    phone: "+49 173 4235651",
    website: "https://github.com/steffenvolbeat",
    profileImageUrl: "/images/avatar.jpg",
    tagline: "Strukturierte, semantische und performante Weblösungen",
    yearsOfExperience: 2,
    projects: 4,
    happyClients: 10,
    technologies: 12,
    social: {
      github: "https://github.com/steffenvolbeat",
      linkedin: "https://www.linkedin.com/in/steffen-lorenz-8412873b2/",
      twitter: "https://twitter.com/steffenvolbeat",
      instagram: "https://instagram.com/steffenvolbeat",
    },
  },

  about: {
    intro:
      "Engagierter Web-& Softwareentwickler mit Fokus auf strukturierte, semantische und performante Weblösungen",
    personalInfo: {
      name: "Steffen Lorenz",
      title: "Web-& Softwareentwickler / Fullstack",
      location: "Erfurt, Deutschland",
      email: "steffen.konstanz@gmx.ch",
      social: {
        github: "https://github.com/steffenvolbeat",
        linkedin: "https://www.linkedin.com/in/steffen-lorenz-8412873b2/",
      },
    },
    description: `
      Als angehender engagierter Web-& Softwareentwickler mit Fokus auf strukturierte, semantische und 
      performante Weblösungen bringe ich meine durch die IT-Umschulung / Weiterbildung gewonnenen Kenntnisse mit ein. 
      Meine Schwerpunkte liegen in HTML5, CSS3, JavaScript, Next.js, FiberJS, und SQL.

      Durch meine analytische Arbeitsweise und Lösungsorientierung setze ich Projekte zuverlässig um. 
      Eigene Projekte und ständiges Lernen treiben mich an - ebenso wie meine Leidenschaft für 
      Musik, E-Gitarren und Laufen.
    `,
    highlights: [
      "💻 IT-Umschulung zum IT-Systemadministrator (BFW Thüringen)",
      "🎓 Weiterbildungsprogramm Web-Development / Fullstack (DCI Berlin)",
      "⚡ HTML5, CSS3, JavaScript, Next.js, SQL",
      "🎨 Figma, TailwindCSS, Fiber.js",
      "🐳 Docker, Python, Git",
      "🎯 Analytisches Denken, Teamfähigkeit, Kreativität",
    ],
    values: [
      {
        title: "Innovation",
        description:
          "Immer auf der Suche nach neuen Technologien und besseren Lösungen",
        icon: "🚀",
      },
      {
        title: "Qualität",
        description: "Clean Code und beste Practices stehen im Mittelpunkt",
        icon: "💎",
      },
      {
        title: "Zusammenarbeit",
        description: "Erfolgreiche Projekte entstehen durch starke Teams",
        icon: "🤝",
      },
    ],
  },

  skills: [
    {
      id: "frontend",
      name: "Frontend Development",
      category: "Frontend Development",
      color: "#3b82f6",
      skills: [],
      items: [
        {
          id: "html5",
          name: "HTML5",
          category: "frontend",
          level: 85,
          yearsExperience: 2,
        },
        {
          id: "css3",
          name: "CSS3",
          category: "frontend",
          level: 85,
          yearsExperience: 2,
        },
        {
          id: "javascript",
          name: "JavaScript",
          category: "frontend",
          level: 75,
          yearsExperience: 2,
        },
        {
          id: "nextjs",
          name: "Next.js",
          category: "frontend",
          level: 70,
          yearsExperience: 1,
        },
        {
          id: "tailwind",
          name: "TailwindCSS",
          category: "frontend",
          level: 75,
          yearsExperience: 1,
        },
        {
          id: "figma",
          name: "Figma",
          category: "frontend",
          level: 65,
          yearsExperience: 1,
        },
        {
          id: "fiber",
          name: "Fiber.js",
          category: "frontend",
          level: 60,
          yearsExperience: 1,
        },
      ],
    },
    {
      id: "backend",
      name: "Backend Development",
      category: "Backend Development",
      color: "#10b981",
      skills: [],
      items: [
        {
          id: "sql",
          name: "SQL",
          category: "backend",
          level: 70,
          yearsExperience: 1,
        },
        {
          id: "python",
          name: "Python",
          category: "backend",
          level: 65,
          yearsExperience: 1,
        },
        {
          id: "prisma",
          name: "Prisma",
          category: "database",
          level: 70,
          yearsExperience: 1,
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          category: "database",
          level: 70,
          yearsExperience: 1,
        },
      ],
    },
    {
      id: "tools",
      name: "Tools & DevOps",
      category: "Tools & DevOps",
      color: "#f59e0b",
      skills: [],
      items: [
        {
          id: "git",
          name: "Git/GitHub",
          category: "tools",
          level: 65,
          yearsExperience: 2,
        },
        {
          id: "docker",
          name: "Docker",
          category: "tools",
          level: 70,
          yearsExperience: 1,
        },
        {
          id: "figma",
          name: "Figma",
          category: "design",
          level: 65,
          yearsExperience: 1,
        },
      ],
    },
  ],

  experience: [
    {
      id: "exp1",
      company: "Mercedes Benz Center / Office People & Office Personal",
      position: "Produktionsmitarbeiter",
      location: "Kölleda, Erfurt, Deutschland",
      startDate: "2022-09-01",
      endDate: "2024-07-31",
      current: false,
      description:
        "Arbeit im erstklassigen Motorenwerk mit Fokus auf Innovation und stetige Verbesserung.",
      responsibilities: [
        "Durchführen von Qualitätskontrollen",
        "Fachgerechtes Montieren von Bauteilen",
        "Sicherstellen der Produktqualität",
        "Einhaltung von Sicherheitsstandards",
      ],
      technologies: ["Qualitätskontrolle", "Montage", "Produktionsplanung"],
      skills: ["Qualitätssicherung", "Präzision", "Teamarbeit"],
      achievements: [
        "Konstant hohe Qualitätsstandards eingehalten",
        "Effiziente Arbeitsabläufe optimiert",
      ],
    },
    {
      id: "exp2",
      company: "Secosys-IT",
      position: "Praktikant IT-Systemadministrator",
      location: "Erfurt, Deutschland",
      startDate: "2021-03-01",
      endDate: "2021-06-30",
      current: false,
      description:
        "IT-Systemhaus für Telekommunikationsinfrastrukturen in Planung, Implementierung & Wartung.",
      responsibilities: [
        "Konfiguration von Routern und Netzwerken (WAN, LAN, Routing, NAT)",
        "Domänen-Aufnahme von PCs",
        "Migration von Clientsystemen inkl. Datenübernahme",
        "Mitarbeit bei Kundenprojekten",
        "Kundenkontakt vor Ort",
      ],
      technologies: [
        "Windows Server",
        "Routing",
        "Netzwerk",
        "Active Directory",
      ],
      skills: ["Netzwerktechnik", "Systemadministration", "Kundenservice"],
      achievements: [
        "Erfolgreiche Client-Migrationen durchgeführt",
        "Praktische IT-Kenntnisse erweitert",
      ],
    },
    {
      id: "exp3",
      company: "Yellowshark AG",
      position: "Zimmermann",
      location: "Österreich / Schweiz",
      startDate: "2009-05-01",
      endDate: "2018-06-30",
      current: false,
      description:
        "Ausländische temporäre Einsätze in Salzburg, Innsbruck, Wien, Luzern, Zürich, Bern, Basel, Interlaken.",
      responsibilities: [
        "Ausführen von Zimmer- und Holzbauarbeiten",
        "Durchführen von Ausbau- und Dämmarbeiten",
        "Durchführen von Qualitätskontrollen",
        "Fachgerechtes Montieren von Bauteilen",
      ],
      technologies: ["Holzbau", "Dämmung", "Ausbau", "Montage"],
      skills: ["Handwerkliches Geschick", "Präzision", "Teamarbeit"],
      achievements: [
        "9 Jahre erfolgreiche internationale Projekterfahrung",
        "Hochwertige Bauarbeiten in verschiedenen Regionen",
      ],
    },
  ],

  projects: [
    {
      id: "proj1",
      title: "NextGen Developer Portfolio",
      description:
        "Interaktives 3D-Portfolio mit Motherboard-Design und immersiver Navigation für den Arbeitsmarkt.",
      longDescription: `
        Ein innovatives Portfolio-Projekt, das moderne Web-Technologien nutzt, 
        um ein einzigartiges Benutzererlebnis zu schaffen. Mit Next.js, Three.js (Fiber), 
        TailwindCSS und TypeScript erstellt, bietet es eine vollständig interaktive 
        3D-Umgebung mit verschiedenen Portfolio-Stationen.

        Das Projekt demonstriert fortgeschrittene Frontend-Fähigkeiten und ein 
        tiefes Verständnis für moderne Web-Entwicklung und 3D-Visualisierung.
      `,
      technologies: [
        "Next.js",
        "Three.js",
        "Fiber",
        "TailwindCSS",
        "TypeScript",
      ],
      category: "3D Visualization",
      status: "in-development",
      startDate: "2024-11-01",
      endDate: null,
      links: {
        github: "https://github.com/steffenvolbeat/NextGen-Developer-Portfolio",
      },
      images: [],
      featured: true,
      highlights: [
        "Innovative 3D-Navigation mit interaktiven Stationen",
        "Motherboard-inspiriertes Futuristisches Design",
        "Vollständig responsive 3D-Experience",
        "Performance-optimierte Three.js-Integration",
      ],
    },
    {
      id: "proj2",
      title: "Landing Page",
      description:
        "Teamseitige Entwicklung einer modernen Landing Page mit Next.js und Figma-Design.",
      longDescription: `
        Eine professionelle Landing Page, die im Team entwickelt wurde. 
        Das Projekt nutzt Next.js für optimale Performance und SEO, 
        TailwindCSS für modernes Design und wurde nach Figma-Vorlagen umgesetzt.

        Die Landing Page ist vollständig responsive und bietet eine 
        hervorragende User Experience auf allen Geräten.
      `,
      technologies: ["Next.js", "Figma", "TailwindCSS", "CSS3"],
      category: "Frontend",
      status: "completed",
      startDate: "2024-08-01",
      endDate: "2024-10-31",
      links: {
        github: "https://github.com/steffenvolbeat/Landingpage",
      },
      images: [],
      featured: true,
      highlights: [
        "Teambasierte Entwicklung",
        "Modern und responsive Design",
        "Figma-to-Code Workflow",
        "SEO-optimiert mit Next.js",
      ],
    },
    {
      id: "proj3",
      title: "FullStack-Todo Web-App",
      description:
        "Full-Stack ToDo Anwendung mit Next.js, TailwindCSS, Prisma und PostgreSQL.",
      longDescription: `
        Eine vollständige Full-Stack Web-Anwendung für Todo-Management. 
        Das Projekt demonstriert Frontend- und Backend-Kenntnisse mit 
        modernem Tech-Stack. Prisma als ORM für typsichere Datenbankzugriffe 
        und PostgreSQL als robuste Datenbank-Lösung.

        Die App bietet CRUD-Operationen, Authentifizierung und eine 
        intuitive Benutzeroberfläche mit TailwindCSS.
      `,
      technologies: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
      category: "Full Stack",
      status: "completed",
      startDate: "2024-05-01",
      endDate: "2024-07-31",
      links: {
        github: "https://github.com/steffenvolbeat/FullStack-Todo-Web-App",
      },
      images: [],
      featured: true,
      highlights: [
        "Full-Stack mit Next.js",
        "Prisma ORM für Typsicherheit",
        "PostgreSQL Datenbank",
        "CRUD-Operationen mit Auth",
      ],
    },
    {
      id: "proj4",
      title: "Band-Website",
      description:
        "Moderne Band-Website erstellt mit React, TailwindCSS und CSS3.",
      longDescription: `
        Eine ansprechende Website für eine Band, entwickelt mit React. 
        Das Projekt zeigt kreatives Design und moderne Frontend-Techniken. 
        TailwindCSS und Custom CSS sorgen für ein einzigartiges visuelles Erlebnis.

        Die Website präsentiert Band-Informationen, Musik, Tourdaten und 
        Kontaktmöglichkeiten in einem ansprechenden Layout.
      `,
      technologies: ["React", "TailwindCSS", "CSS3"],
      category: "Frontend",
      status: "in-development",
      startDate: "2024-03-01",
      endDate: null,
      links: {
        github: "https://github.com/steffenvolbeat/Band-Website",
      },
      images: [],
      featured: false,
      highlights: [
        "Kreatives Band-Design",
        "React-basierte SPA",
        "Custom CSS-Animationen",
        "Responsive Layout",
      ],
    },
    {
      id: "proj5",
      title: "Metal3DCore-Plattform (M3DC) Abschlussprojekt DCI",
      description:
        "🎸 Metal3DCore Platform - The 3D Core of Metal Culture. Immersive 3D-Fullstack-Webanwendung für Metal-Fans mit virtuellen Konzert-Arenen, Backstage-Bereichen und interaktiven Community-Räumen.",
      longDescription: `
        Metal3DCore ist eine immersive 3D-Fullstack-Webanwendung, die Metal-Fans 
        in virtuelle Konzert-Arenen, exklusive Backstage-Bereiche und interaktive 
        Community-Räume eintauchen lässt. Die Plattform kombiniert modernste 
        Web-Technologien mit authentischer Metal-Kultur zu einem einzigartigen 
        digitalen Erlebnis.

        Das Projekt umfasst 7 immersive 3D-Räume: Welcome Room, Stadium Room mit 
        YouTube-Integration, Ticket Arena mit 3D-Kassen-Pult, Backstage VIP, 
        Band Gallery, Community Room und Contact Stage. 

        Features: Vollständiges Ticket-System (virtuell & physisch), FPS-Navigation 
        mit WASD-Steuerung, Drag & Drop Cards, localStorage-Persistenz, NextAuth.js 
        User-Management mit Role-Based Access (FAN, VIP, BAND_MEMBER, ADMIN).
      `,
      technologies: [
        "Next.js 15.5.7",
        "React 19.1.0",
        "TypeScript",
        "Tailwind CSS v4",
        "Prisma ORM",
        "PostgreSQL",
        "Fiber.js",
        "pgAdmin",
        "React Three Fiber",
        "Three.js",
        "NextAuth.js",
      ],
      category: "Full Stack 3D",
      status: "in-development",
      startDate: "2024-12-15",
      endDate: "2025-02-09",
      links: {
        github: "https://github.com/steffenvolbeat/METAL3DCORE-Plattform",
      },
      images: [],
      featured: true,
      highlights: [
        "7 Immersive 3D-Räume mit FPS-Navigation",
        "Vollständiges Ticket-System (virtuell & physisch)",
        "NextAuth.js mit Role-Based Access Control",
        "3D-Visualisierung mit React Three Fiber",
        "Docker + PostgreSQL + Prisma Stack",
        "Drag & Drop Interface mit localStorage",
      ],
    },
    {
      id: "proj6",
      title: "KI-integrierter Assistent",
      description:
        "🤖 Intelligenter KI-Assistent mit Natural Language Processing und Multi-Modal-Interaktion. Vollständig integrierte AI-Lösung für produktive Workflows.",
      longDescription: `
        Ein moderner KI-integrierter Assistent, der fortschrittliche AI-Technologien 
        nutzt, um Benutzern bei verschiedenen Aufgaben zu helfen. Das System kombiniert 
        Natural Language Processing, Machine Learning und moderne Web-Technologien zu 
        einer seamless User Experience.

        Der Assistent bietet intelligente Konversation, Context-Awareness, Memory-Funktion, 
        Multi-Modal-Input (Text, Voice, Bild) und lernende Algorithmen, die sich an 
        Benutzerpräferenzen anpassen.

        Features: Echtzeit-Antworten, Kontext-Verständnis über mehrere Interaktionen, 
        Integration mit verschiedenen APIs und Services, Custom Training auf spezifische 
        Anwendungsfälle, Voice-to-Text und Text-to-Voice Funktionalität.
      `,
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "OpenAI API",
        "Anthropic Claude",
        "LangChain",
        "Python",
        "FastAPI",
        "Vector Database",
        "TailwindCSS",
        "WebSocket",
      ],
      category: "AI & Machine Learning",
      status: "planned",
      startDate: "2025-03-01",
      endDate: null,
      links: {
        github: "https://github.com/steffenvolbeat/AI-Assistant",
      },
      images: [],
      featured: true,
      highlights: [
        "Natural Language Processing mit GPT-4/Claude",
        "Multi-Modal-Interaktion (Text, Voice, Bild)",
        "Kontext-Memory über Sessions hinweg",
        "Vector Database für semantische Suche",
        "FastAPI Backend für ML-Models",
        "Real-time WebSocket-Kommunikation",
      ],
    },
  ],

  contact: {
    email: "steffen.konstanz@gmx.ch",
    phone: "+49 173 4235651",
    availability: "Verfügbar für neue Projekte",
    preferredContact: "email",
    methods: [
      {
        name: "E-Mail",
        type: "email",
        value: "steffen.konstanz@gmx.ch",
        label: "E-Mail",
        icon: "📧",
        primary: true,
      },
      {
        name: "Telefon",
        type: "phone",
        value: "+49 (0) 173 4235651",
        label: "Telefon",
        icon: "📱",
        primary: false,
      },
      {
        name: "WhatsApp",
        type: "whatsapp",
        value: "+49 173 4235651",
        label: "WhatsApp",
        icon: "💬",
        primary: false,
      },
      {
        name: "LinkedIn",
        type: "linkedin",
        value: "https://www.linkedin.com/in/steffen-lorenz-8412873b2/",
        label: "LinkedIn",
        icon: "💼",
        primary: false,
      },
      {
        name: "GitHub",
        type: "github",
        value: "https://github.com/steffenvolbeat",
        label: "GitHub",
        icon: "💻",
        primary: false,
      },
      {
        name: "Website",
        type: "website",
        value: "https://github.com/steffenvolbeat/NextGen-Developer-Portfolio",
        label: "Website",
        icon: "🌐",
        primary: false,
      },
    ],
    responseTime: "Antwort innerhalb von 24 Stunden",
    timezone: "Europe/Berlin",
    languages: ["Deutsch", "English"],
  },

  cv: {
    personalInfo: {
      name: "Steffen Lorenz",
      title: "Web-& Softwareentwickler / Fullstack",
      location: "Erfurt, Deutschland",
      email: "steffen.konstanz@gmx.ch",
      social: {
        github: "https://github.com/steffenvolbeat",
        linkedin: "https://www.linkedin.com/in/steffen-lorenz-8412873b2/",
        twitter: "https://twitter.com/steffenvolbeat",
        instagram: "https://instagram.com/steffenvolbeat",
      },
    },
    summary:
      "Engagierter Web-& Softwareentwickler mit Fokus auf strukturierte, semantische und performante Weblösungen",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    downloadUrl: "/Image/My%20Resume.pdf",
    lastUpdated: "2024-01-15",
    sections: [
      {
        title: "Persönliche Daten",
        content: "Grundlegende Kontaktinformationen",
      },
      { title: "Berufserfahrung", content: "8+ Jahre Entwicklungserfahrung" },
      { title: "Technische Skills", content: "40+ Technologien und Tools" },
      {
        title: "Bildung & Zertifikate",
        content: "Kontinuierliche Weiterbildung",
      },
      { title: "Projekte", content: "50+ erfolgreiche Projekte" },
      { title: "Sprachen", content: "Deutsch, Englisch" },
    ],
  },

  stations: [
    {
      id: "welcome",
      name: "Welcome",
      title: "Willkommen",
      description: "Startpunkt der 3D-Portfolio-Experience",
      position: [0, 0, 0],
      color: "#00ff88",
      icon: "🏠",
    },
    {
      id: "about",
      name: "About",
      title: "Über mich",
      description: "Persönliche Informationen und Werdegang",
      position: [5, 0, 5],
      color: "#3b82f6",
      icon: "👤",
    },
    {
      id: "skills",
      name: "Skills",
      title: "Fähigkeiten",
      description: "Technologien und Expertise",
      position: [10, 0, 0],
      color: "#10b981",
      icon: "🛠️",
    },
    {
      id: "experience",
      name: "Experience",
      title: "Erfahrung",
      description: "Beruflicher Werdegang und Projekte",
      position: [5, 0, -5],
      color: "#f59e0b",
      icon: "💼",
    },
    {
      id: "projects",
      name: "Projects",
      title: "Projekte",
      description: "Portfolio und Showcase",
      position: [-5, 0, 5],
      color: "#8b5cf6",
      icon: "🚀",
    },
    {
      id: "contact",
      name: "Contact",
      title: "Kontakt",
      description: "Kontaktinformationen und CV",
      position: [-10, 0, 0],
      color: "#ef4444",
      icon: "📧",
    },
  ],
};
