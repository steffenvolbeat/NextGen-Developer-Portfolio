# Docker Dokumentation - NextGen-Developer-Portfolio 🐳

## 📋 Docker Overview

Docker wird für die Containerisierung der gesamten NextGen-Developer-Portfolio Anwendung verwendet, einschließlich PostgreSQL-Datenbank und PGAdmin.

**Status:** 🔄 Wird in Schritt 6 implementiert (Database-Phase)

## 🎯 Container Architecture

### Container Stack

```
┌─────────────────────────────────────────────┐
│               Docker Desktop                │
├─────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌──────┐  │
│  │   Next.js   │  │ PostgreSQL  │  │PGAdmin│ │
│  │ Application │  │  Database   │  │  UI   │ │
│  │   :3000     │  │   :5432     │  │ :5050 │ │
│  └─────────────┘  └─────────────┘  └──────┘  │
│         │                │             │     │
│  ┌─────────────────────────────────────────┐  │
│  │        portfolio_network (Bridge)      │  │
│  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## 🐳 Docker Configuration

### docker-compose.yml

```yaml
version: "3.8"

services:
  # PostgreSQL Database Service
  postgres:
    image: postgres:15-alpine
    container_name: nextgen-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: nextgen_portfolio
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secure_password_2025}
      POSTGRES_HOST_AUTH_METHOD: trust
      POSTGRES_INITDB_ARGS: "--auth-host=trust --auth-local=trust"
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init:/docker-entrypoint-initdb.d
      - ./docker/postgres/backups:/backups
    networks:
      - portfolio_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U portfolio_user -d nextgen_portfolio"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s

  # PGAdmin Management Interface
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: nextgen-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL:-admin@nextgen-portfolio.dev}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-admin123}
      PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION: "True"
      PGADMIN_CONFIG_LOGIN_BANNER: '"NextGen Portfolio Database Management"'
      PGADMIN_CONFIG_CONSOLE_LOG_LEVEL: 20
    ports:
      - "${PGADMIN_PORT:-5050}:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
      - ./docker/pgadmin/servers.json:/pgadmin4/servers.json:ro
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - portfolio_network

  # Next.js Application (Development)
  nextjs-dev:
    build:
      context: .
      dockerfile: docker/nextjs/Dockerfile.dev
      target: development
    container_name: nextgen-nextjs-dev
    restart: unless-stopped
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://portfolio_user:${POSTGRES_PASSWORD:-secure_password_2025}@postgres:5432/nextgen_portfolio?schema=public
      NEXTAUTH_URL: http://localhost:3000
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET:-development-secret}
    ports:
      - "${NEXTJS_PORT:-3000}:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - portfolio_network
    profiles:
      - dev

  # Next.js Application (Production)
  nextjs-prod:
    build:
      context: .
      dockerfile: docker/nextjs/Dockerfile.prod
      target: production
    container_name: nextgen-nextjs-prod
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://portfolio_user:${POSTGRES_PASSWORD:-secure_password_2025}@postgres:5432/nextgen_portfolio?schema=public
      NEXTAUTH_URL: ${NEXTAUTH_URL:-https://nextgen-portfolio.com}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    ports:
      - "${NEXTJS_PROD_PORT:-8080}:3000"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - portfolio_network
    profiles:
      - prod

# Persistent Volumes
volumes:
  postgres_data:
    driver: local
  pgadmin_data:
    driver: local

# Network Configuration
networks:
  portfolio_network:
    driver: bridge
    name: nextgen_portfolio_network
```

### Environment Configuration (.env.docker)

```bash
# Database Configuration
POSTGRES_PASSWORD=secure_password_2025
POSTGRES_PORT=5432

# PGAdmin Configuration
PGADMIN_EMAIL=admin@nextgen-portfolio.dev
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050

# Next.js Configuration
NEXTJS_PORT=3000
NEXTJS_PROD_PORT=8080

# Authentication
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Application Settings
NODE_ENV=development
```

## 📦 Dockerfile Configurations

### Development Dockerfile (docker/nextjs/Dockerfile.dev)

```dockerfile
# Multi-stage build for Next.js Development
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Development stage
FROM base AS development
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=development
ENV PORT=3000

# Start development server
CMD ["npm", "run", "dev"]
```

### Production Dockerfile (docker/nextjs/Dockerfile.prod)

```dockerfile
# Multi-stage build for Next.js Production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all files and run next
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

## ⚙️ Docker Scripts & Commands

### Package.json Scripts

```json
{
  "scripts": {
    "docker:dev": "docker-compose --profile dev up -d",
    "docker:prod": "docker-compose --profile prod up -d",
    "docker:stop": "docker-compose down",
    "docker:clean": "docker-compose down -v --rmi all",
    "docker:logs": "docker-compose logs -f",
    "docker:db": "docker-compose up -d postgres pgadmin",
    "docker:backup": "docker-compose exec postgres pg_dump -U portfolio_user nextgen_portfolio > ./docker/postgres/backups/backup_$(date +%Y%m%d_%H%M%S).sql",
    "docker:restore": "docker-compose exec -T postgres psql -U portfolio_user nextgen_portfolio",
    "docker:migrate": "docker-compose exec nextjs-dev npx prisma migrate deploy",
    "docker:studio": "docker-compose exec nextjs-dev npx prisma studio --browser none --port 5555"
  }
}
```

### Development Commands

```bash
# Start development environment
npm run docker:dev

# Start only database services
npm run docker:db

# View logs
npm run docker:logs

# Stop all containers
npm run docker:stop

# Clean everything (containers, volumes, images)
npm run docker:clean

# Database backup
npm run docker:backup

# Access database shell
docker-compose exec postgres psql -U portfolio_user nextgen_portfolio

# Access Next.js container
docker-compose exec nextjs-dev sh

# Run Prisma migrations in container
npm run docker:migrate
```

## 🗂 Docker Directory Structure

```
docker/
├── nextjs/
│   ├── Dockerfile.dev          # Development Dockerfile
│   ├── Dockerfile.prod         # Production Dockerfile
│   └── .dockerignore          # Docker ignore file
├── postgres/
│   ├── init/
│   │   ├── 01_init.sql        # Database initialization
│   │   └── 02_extensions.sql   # PostgreSQL extensions
│   └── backups/               # Database backups directory
├── pgadmin/
│   └── servers.json           # PGAdmin server configuration
└── nginx/                     # Future: Reverse proxy
    ├── nginx.conf
    └── Dockerfile
```

### PostgreSQL Initialization (docker/postgres/init/01_init.sql)

```sql
-- Database initialization script
-- Runs automatically when container is first created

-- Create database if not exists
SELECT 'CREATE DATABASE nextgen_portfolio'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nextgen_portfolio');

-- Create user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'portfolio_user') THEN
    CREATE USER portfolio_user WITH PASSWORD 'secure_password_2025';
  END IF;
END
$$;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE nextgen_portfolio TO portfolio_user;
ALTER USER portfolio_user CREATEDB;
```

### Extensions Setup (docker/postgres/init/02_extensions.sql)

```sql
-- Enable necessary PostgreSQL extensions
\c nextgen_portfolio;

-- UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Full-text search extension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Performance monitoring
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
```

### PGAdmin Server Configuration (docker/pgadmin/servers.json)

```json
{
  "Servers": {
    "1": {
      "Name": "NextGen Portfolio DB",
      "Group": "Servers",
      "Host": "postgres",
      "Port": 5432,
      "MaintenanceDB": "nextgen_portfolio",
      "Username": "portfolio_user",
      "Password": "secure_password_2025",
      "SSLMode": "prefer",
      "SSLCompression": 0,
      "Timeout": 10,
      "UseSSHTunnel": 0,
      "TunnelPort": "22",
      "TunnelAuthentication": 0
    }
  }
}
```

## 🔒 Security & Best Practices

### Security Configuration

```dockerfile
# Security best practices in Dockerfile
FROM node:18-alpine AS base

# Install security updates
RUN apk update && apk upgrade

# Use non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set proper file permissions
COPY --chown=nextjs:nodejs . .

USER nextjs
```

### Environment Security

```bash
# .env.docker.example
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD
NEXTAUTH_SECRET=GENERATE_A_SECURE_SECRET
PGADMIN_PASSWORD=CHANGE_THIS_PASSWORD
```

## 📊 Monitoring & Logging

### Health Checks

```yaml
# Health check configuration
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging Configuration

```yaml
# Logging driver configuration
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

## 🚀 Deployment Strategies

### Development Deployment

```bash
# Start development stack
docker-compose --profile dev up -d

# Watch logs
docker-compose logs -f nextjs-dev
```

### Production Deployment

```bash
# Build and start production stack
docker-compose --profile prod up -d --build

# Scale if needed
docker-compose --profile prod up -d --scale nextjs-prod=2
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Build and Deploy
  run: |
    docker-compose --profile prod build
    docker-compose --profile prod up -d
```

## 🔄 Maintenance & Backups

### Automated Backups

```bash
#!/bin/bash
# docker/scripts/backup.sh

# Create backup with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql"

# Run backup
docker-compose exec postgres pg_dump -U portfolio_user nextgen_portfolio > ./docker/postgres/backups/${BACKUP_FILE}

# Compress backup
gzip ./docker/postgres/backups/${BACKUP_FILE}

# Remove backups older than 30 days
find ./docker/postgres/backups/ -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"
```

### Update Strategy

```bash
# Update containers
docker-compose pull
docker-compose --profile dev up -d --build

# Clean unused images
docker image prune -f
```

## 📋 Docker Roadmap

| Phase           | Feature                       | Status     | Schritt |
| --------------- | ----------------------------- | ---------- | ------- |
| **Basic Setup** | PostgreSQL + PGAdmin          | 🔄 Geplant | 6.1     |
| **Development** | Next.js Development Container | 🔄 Geplant | 6.2     |
| **Production**  | Optimized Production Build    | 🔄 Geplant | 6.3     |
| **Monitoring**  | Health Checks + Logging       | 🔄 Geplant | 6.4     |
| **Security**    | SSL + Security Hardening      | 🔄 Geplant | 6.5     |
| **CI/CD**       | Automated Deployment          | 🔄 Geplant | 7.8     |

## 🔄 Update-Log

| Datum      | Änderung                                      |
| ---------- | --------------------------------------------- |
| 02.12.2025 | Docker-Konfiguration geplant und dokumentiert |

---

_Hinweis: Docker Setup wird in Schritt 6 implementiert, zusammen mit der Database-Integration_

_Letzte Aktualisierung: 2. Dezember 2025_
