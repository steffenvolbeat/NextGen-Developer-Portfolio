# Prisma Dokumentation - NextGen-Developer-Portfolio 🗄️

## 📋 Übersicht

Prisma wird als moderner Database Toolkit für das NextGen-Developer-Portfolio verwendet. Die Integration erfolgt in **Schritt 6** nach Fertigstellung des Frontends.

## 🎯 Geplante Prisma Konfiguration

### Version

- **Prisma**: 6.9.0
- **@prisma/client**: 6.9.0

### Datenbank

- **Database**: PostgreSQL
- **Management**: PGAdmin 4
- **Container**: Docker Desktop

## 📊 Geplante Database Schema

### User Management (für Kontakt)

```prisma
model Contact {
  id          String   @id @default(cuid())
  name        String
  email       String
  subject     String?
  message     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("contacts")
}
```

### Portfolio Content

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  technology  String[]
  imageUrl    String?
  demoUrl     String?
  githubUrl   String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("projects")
}

model Skill {
  id          String   @id @default(cuid())
  name        String
  category    String   // "frontend", "backend", "database", "tools"
  level       Int      // 1-100
  iconUrl     String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("skills")
}

model Experience {
  id          String   @id @default(cuid())
  company     String
  position    String
  description String
  startDate   DateTime
  endDate     DateTime?
  current     Boolean  @default(false)
  location    String?
  skills      String[]
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("experiences")
}
```

### Content Management

```prisma
model AboutContent {
  id          String   @id @default(cuid())
  language    String   // "de" | "en"
  title       String
  subtitle    String?
  description String
  imageUrl    String?
  updatedAt   DateTime @updatedAt

  @@unique([language])
  @@map("about_content")
}

model SiteSettings {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  updatedAt   DateTime @updatedAt

  @@map("site_settings")
}
```

## ⚙️ Geplante Prisma Setup (Schritt 6)

### 1. Installation

```bash
npm install prisma @prisma/client pg
npm install --save-dev @types/pg
```

### 2. Prisma Initialisierung

```bash
npx prisma init
```

### 3. Environment Variables (.env)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nextgen_portfolio?schema=public"

# Prisma
PRISMA_GENERATE_DATAPROXY="true"
```

### 4. Schema Konfiguration (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 5. Migration Commands

```bash
# Erste Migration erstellen
npx prisma migrate dev --name init

# Prisma Client generieren
npx prisma generate

# Datenbank seeden
npx prisma db seed
```

## 🐳 Docker PostgreSQL Setup

### docker-compose.yml

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: nextgen_portfolio
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@portfolio.local
      PGADMIN_DEFAULT_PASSWORD: admin_password
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Docker Commands

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs postgres
```

## 📝 Geplante Seeding (prisma/seed.ts)

### Skills Seeding

```typescript
const skills = [
  // Frontend
  { name: "React", category: "frontend", level: 95 },
  { name: "TypeScript", category: "frontend", level: 90 },
  { name: "Next.js", category: "frontend", level: 85 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "Three.js", category: "frontend", level: 80 },

  // Backend
  { name: "Node.js", category: "backend", level: 85 },
  { name: "Prisma", category: "backend", level: 80 },
  { name: "PostgreSQL", category: "database", level: 75 },

  // Tools
  { name: "Docker", category: "tools", level: 70 },
  { name: "Git", category: "tools", level: 90 },
];
```

### Projects Seeding

```typescript
const projects = [
  {
    title: "NextGen Developer Portfolio",
    description: "3D Interactive Portfolio mit Three.js",
    technology: ["Next.js", "TypeScript", "Three.js", "Tailwind"],
    featured: true,
    order: 1,
  },
];
```

## 🔧 Prisma Client Usage

### Basic Queries

```typescript
// Get all projects
const projects = await prisma.project.findMany({
  orderBy: { order: "asc" },
});

// Create contact
const contact = await prisma.contact.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    message: "Hello World!",
  },
});

// Get skills by category
const frontendSkills = await prisma.skill.findMany({
  where: { category: "frontend" },
  orderBy: { level: "desc" },
});
```

### API Routes Integration

```typescript
// app/api/contacts/route.ts
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const contact = await prisma.contact.create({
    data,
  });

  return NextResponse.json(contact);
}
```

## 🔒 Security & Best Practices

### Environment Variables

- ✅ Sichere Passwörter verwenden
- ✅ DATABASE_URL in .env.local
- ✅ .env Dateien nie committen

### Database Security

- ✅ Prepared Statements (Prisma default)
- ✅ Input Validation mit Zod
- ✅ Rate Limiting für API Routes

### Development Best Practices

- ✅ Migrations für Schema Änderungen
- ✅ Seeding für Test-Daten
- ✅ Connection Pooling nutzen

## 📋 Migration Strategy

### Development

1. Schema ändern in `schema.prisma`
2. Migration erstellen: `npx prisma migrate dev`
3. Prisma Client aktualisieren: `npx prisma generate`

### Production

1. Schema deployen: `npx prisma migrate deploy`
2. Prisma Client aktualisieren
3. Application neu starten

## 🔄 Geplante Updates

| Phase     | Feature                     | Status     |
| --------- | --------------------------- | ---------- |
| Schritt 6 | Prisma Setup & Basic Models | 🔄 Geplant |
| Schritt 6 | PostgreSQL Integration      | 🔄 Geplant |
| Schritt 6 | Contact Form Backend        | 🔄 Geplant |
| Schritt 6 | Content Management          | 🔄 Geplant |

---

_Hinweis: Diese Dokumentation wird in Schritt 6 implementiert, nach Fertigstellung des Frontends._

_Letzte Aktualisierung: 2. Dezember 2025_
