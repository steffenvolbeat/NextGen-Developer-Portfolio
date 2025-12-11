# Database Dokumentation - NextGen-Developer-Portfolio 🗄️

## 📋 Database Overview

Das NextGen-Developer-Portfolio verwendet PostgreSQL als Hauptdatenbank mit Docker für die Containerisierung und PGAdmin für das Management.

**Status:** 🔄 Wird in Schritt 6 implementiert (nach Frontend-Fertigstellung)

## 🎯 Database Stack

| Komponente         | Version | Zweck                  | Status     |
| ------------------ | ------- | ---------------------- | ---------- |
| **PostgreSQL**     | 15.x    | Hauptdatenbank         | 🔄 Geplant |
| **Docker Desktop** | Latest  | Containerisierung      | 🔄 Geplant |
| **PGAdmin 4**      | Latest  | Database Management UI | 🔄 Geplant |
| **Prisma**         | 6.9.0   | ORM & Query Builder    | 🔄 Geplant |

## 🏗 Database Architecture

### 📊 Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Contact   │    │   Project   │    │    Skill    │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │    │ id (PK)     │    │ id (PK)     │
│ name        │    │ title       │    │ name        │
│ email       │    │ description │    │ category    │
│ subject     │    │ technology  │    │ level       │
│ message     │    │ imageUrl    │    │ iconUrl     │
│ createdAt   │    │ demoUrl     │    │ order       │
│ updatedAt   │    │ githubUrl   │    │ createdAt   │
└─────────────┘    │ featured    │    │ updatedAt   │
                   │ order       │    └─────────────┘
                   │ createdAt   │
                   │ updatedAt   │    ┌─────────────┐
                   └─────────────┘    │ Experience  │
                                     ├─────────────┤
┌─────────────┐    ┌─────────────┐    │ id (PK)     │
│AboutContent │    │SiteSettings │    │ company     │
├─────────────┤    ├─────────────┤    │ position    │
│ id (PK)     │    │ id (PK)     │    │ description │
│ language    │    │ key         │    │ startDate   │
│ title       │    │ value       │    │ endDate     │
│ subtitle    │    │ updatedAt   │    │ current     │
│ description │    └─────────────┘    │ location    │
│ imageUrl    │                       │ skills      │
│ updatedAt   │                       │ order       │
└─────────────┘                       │ createdAt   │
                                     │ updatedAt   │
                                     └─────────────┘
```

## 🗂 Database Schema Details

### 📧 Contact Table

**Zweck:** Speicherung von Kontaktanfragen über das Portfolio

| Spalte      | Type          | Beschreibung       | Constraints |
| ----------- | ------------- | ------------------ | ----------- |
| `id`        | String (CUID) | Primärschlüssel    | PRIMARY KEY |
| `name`      | String        | Vollständiger Name | NOT NULL    |
| `email`     | String        | E-Mail Adresse     | NOT NULL    |
| `subject`   | String?       | Betreff (optional) | NULL        |
| `message`   | String        | Nachrichtentext    | NOT NULL    |
| `createdAt` | DateTime      | Erstellungsdatum   | DEFAULT NOW |
| `updatedAt` | DateTime      | Änderungsdatum     | AUTO UPDATE |

### 🚀 Project Table

**Zweck:** Portfolio-Projekte mit Details und Links

| Spalte        | Type          | Beschreibung            | Constraints   |
| ------------- | ------------- | ----------------------- | ------------- |
| `id`          | String (CUID) | Primärschlüssel         | PRIMARY KEY   |
| `title`       | String        | Projektname             | NOT NULL      |
| `description` | String        | Projektbeschreibung     | NOT NULL      |
| `technology`  | String[]      | Verwendete Technologien | ARRAY         |
| `imageUrl`    | String?       | Projekt-Screenshot      | NULL          |
| `demoUrl`     | String?       | Live-Demo Link          | NULL          |
| `githubUrl`   | String?       | GitHub Repository       | NULL          |
| `featured`    | Boolean       | Featured Projekt        | DEFAULT FALSE |
| `order`       | Int           | Anzeigereihenfolge      | DEFAULT 0     |
| `createdAt`   | DateTime      | Erstellungsdatum        | DEFAULT NOW   |
| `updatedAt`   | DateTime      | Änderungsdatum          | AUTO UPDATE   |

### ⚡ Skill Table

**Zweck:** Fähigkeiten und Kompetenzniveaus

| Spalte      | Type          | Beschreibung                                | Constraints |
| ----------- | ------------- | ------------------------------------------- | ----------- |
| `id`        | String (CUID) | Primärschlüssel                             | PRIMARY KEY |
| `name`      | String        | Skill-Name                                  | NOT NULL    |
| `category`  | String        | Kategorie (frontend/backend/database/tools) | NOT NULL    |
| `level`     | Int           | Kompetenzniveau (1-100)                     | 1-100       |
| `iconUrl`   | String?       | Icon/Logo URL                               | NULL        |
| `order`     | Int           | Anzeigereihenfolge                          | DEFAULT 0   |
| `createdAt` | DateTime      | Erstellungsdatum                            | DEFAULT NOW |
| `updatedAt` | DateTime      | Änderungsdatum                              | AUTO UPDATE |

### 💼 Experience Table

**Zweck:** Berufliche Erfahrungen und Karriereweg

| Spalte        | Type          | Beschreibung           | Constraints        |
| ------------- | ------------- | ---------------------- | ------------------ |
| `id`          | String (CUID) | Primärschlüssel        | PRIMARY KEY        |
| `company`     | String        | Firmenname             | NOT NULL           |
| `position`    | String        | Jobtitel               | NOT NULL           |
| `description` | String        | Tätigkeitsbeschreibung | NOT NULL           |
| `startDate`   | DateTime      | Beginn der Tätigkeit   | NOT NULL           |
| `endDate`     | DateTime?     | Ende der Tätigkeit     | NULL (current job) |
| `current`     | Boolean       | Aktuelle Position      | DEFAULT FALSE      |
| `location`    | String?       | Arbeitsort             | NULL               |
| `skills`      | String[]      | Verwendete Skills      | ARRAY              |
| `order`       | Int           | Anzeigereihenfolge     | DEFAULT 0          |
| `createdAt`   | DateTime      | Erstellungsdatum       | DEFAULT NOW        |
| `updatedAt`   | DateTime      | Änderungsdatum         | AUTO UPDATE        |

### 📄 AboutContent Table

**Zweck:** Mehrsprachige "Über mich" Inhalte

| Spalte        | Type          | Beschreibung       | Constraints     |
| ------------- | ------------- | ------------------ | --------------- |
| `id`          | String (CUID) | Primärschlüssel    | PRIMARY KEY     |
| `language`    | String        | Sprachcode (de/en) | UNIQUE NOT NULL |
| `title`       | String        | Hauptüberschrift   | NOT NULL        |
| `subtitle`    | String?       | Unterüberschrift   | NULL            |
| `description` | String        | Beschreibungstext  | NOT NULL        |
| `imageUrl`    | String?       | Profilbild URL     | NULL            |
| `updatedAt`   | DateTime      | Änderungsdatum     | AUTO UPDATE     |

### ⚙️ SiteSettings Table

**Zweck:** Allgemeine Website-Einstellungen

| Spalte      | Type          | Beschreibung          | Constraints     |
| ----------- | ------------- | --------------------- | --------------- |
| `id`        | String (CUID) | Primärschlüssel       | PRIMARY KEY     |
| `key`       | String        | Einstellungsschlüssel | UNIQUE NOT NULL |
| `value`     | String        | Einstellungswert      | NOT NULL        |
| `updatedAt` | DateTime      | Änderungsdatum        | AUTO UPDATE     |

## 🐳 Docker Setup

### PostgreSQL Container Configuration

```yaml
# docker-compose.yml
version: "3.8"

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: nextgen_portfolio
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: secure_password_2025
      POSTGRES_HOST_AUTH_METHOD: trust
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - portfolio_network

  # PGAdmin Management Interface
  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@nextgen-portfolio.dev
      PGADMIN_DEFAULT_PASSWORD: admin123
      PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION: "True"
      PGADMIN_CONFIG_LOGIN_BANNER: '"NextGen Portfolio Database"'
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    depends_on:
      - postgres
    networks:
      - portfolio_network

volumes:
  postgres_data:
    driver: local
  pgadmin_data:
    driver: local

networks:
  portfolio_network:
    driver: bridge
```

### Database Initialization

```sql
-- init.sql
-- Erweiterte PostgreSQL Setup für NextGen Portfolio

-- Aktiviere UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Erstelle Custom Types
CREATE TYPE skill_category AS ENUM ('frontend', 'backend', 'database', 'tools', 'design');
CREATE TYPE language_code AS ENUM ('de', 'en');

-- Performance Indexes (werden automatisch von Prisma erstellt)
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_projects_featured ON projects(featured, order);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_skills_category ON skills(category, level DESC);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_experience_dates ON experiences(startDate, endDate);
```

## 🔧 Database Management Commands

### Docker Operations

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs postgres
docker-compose logs pgadmin

# In PostgreSQL Container verbinden
docker-compose exec postgres psql -U portfolio_user -d nextgen_portfolio

# Backup erstellen
docker-compose exec postgres pg_dump -U portfolio_user nextgen_portfolio > backup.sql

# Backup wiederherstellen
docker-compose exec -T postgres psql -U portfolio_user nextgen_portfolio < backup.sql
```

### Prisma Operations (Schritt 6)

```bash
# Schema zu Datenbank pushen
npx prisma db push

# Migration erstellen
npx prisma migrate dev --name initial_setup

# Migration deployen (Production)
npx prisma migrate deploy

# Datenbank zurücksetzen (Development only!)
npx prisma migrate reset

# Prisma Studio öffnen
npx prisma studio

# Datenbank seeden
npx prisma db seed
```

## 📊 Performance Optimierung

### Indexing Strategy

```sql
-- Automatic Prisma Indexes
-- @@index([featured, order]) on Project
-- @@index([category, level]) on Skill
-- @@index([startDate, endDate]) on Experience
-- @@unique([language]) on AboutContent
-- @@unique([key]) on SiteSettings
```

### Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 🔒 Security & Backup

### Security Measures

- ✅ **Environment Variables**: Alle Credentials in .env
- ✅ **Connection Encryption**: SSL/TLS für Production
- ✅ **Input Validation**: Zod Schema Validation
- ✅ **Prepared Statements**: Prisma verhindert SQL Injection
- ✅ **Rate Limiting**: API Route Protection

### Backup Strategy

- 🔄 **Daily Backups**: Automatisierte tägliche Backups
- 🔄 **Migration Backups**: Vor jeder Migration
- 🔄 **Development Seeds**: Regelmäßige Test-Daten

## 📋 Environment Configuration

### Development (.env.local)

```env
# Database URL
DATABASE_URL="postgresql://portfolio_user:secure_password_2025@localhost:5432/nextgen_portfolio?schema=public"

# Prisma
PRISMA_GENERATE_DATAPROXY="false"

# Development Settings
NODE_ENV="development"
```

### Production (.env.production)

```env
# Database URL (Production)
DATABASE_URL="postgresql://user:password@production-db:5432/nextgen_portfolio?schema=public&sslmode=require"

# Prisma
PRISMA_GENERATE_DATAPROXY="true"

# Production Settings
NODE_ENV="production"
```

## 🔄 Migration Timeline

| Phase       | Migration         | Status     | Beschreibung                    |
| ----------- | ----------------- | ---------- | ------------------------------- |
| Schritt 6.1 | `initial_setup`   | 🔄 Geplant | Grundlegende Tabellen erstellen |
| Schritt 6.2 | `add_content`     | 🔄 Geplant | Content-Management Tabellen     |
| Schritt 6.3 | `add_indexes`     | 🔄 Geplant | Performance Optimierung         |
| Schritt 6.4 | `add_constraints` | 🔄 Geplant | Data Integrity                  |

## 🔄 Update-Log

| Datum      | Änderung                                 |
| ---------- | ---------------------------------------- |
| 02.12.2025 | Database Schema geplant und dokumentiert |

---

_Hinweis: Database Implementation erfolgt in Schritt 6, nach Frontend-Fertigstellung_

_Letzte Aktualisierung: 2. Dezember 2025_
