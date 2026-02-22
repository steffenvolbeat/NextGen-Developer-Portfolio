# Dependencies - NextGen-Developer-Portfolio 📦

## 🔧 Haupt-Dependencies

### Production Dependencies

```json
{
  "next": "16.0.6",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "three": "^0.169.0",
  "@react-three/fiber": "^8.17.10",
  "@react-three/drei": "^9.114.4"
}
```

| Package                | Version  | Beschreibung                    | Status         |
| ---------------------- | -------- | ------------------------------- | -------------- |
| **next**               | 16.0.6   | React Framework für Production  | ✅ Installiert |
| **react**              | 19.2.0   | JavaScript Library für UI       | ✅ Installiert |
| **react-dom**          | 19.2.0   | React DOM Renderer              | ✅ Installiert |
| **three**              | ^0.169.0 | 3D JavaScript Library           | ✅ Installiert |
| **@react-three/fiber** | ^8.17.10 | React Renderer für Three.js     | ✅ Installiert |
| **@react-three/drei**  | ^9.114.4 | Utilities für React Three Fiber | ✅ Installiert |

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@types/three": "^0.169.0",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^9",
  "eslint-config-next": "16.0.6",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

| Package                         | Version  | Beschreibung                      | Status         |
| ------------------------------- | -------- | --------------------------------- | -------------- |
| **@tailwindcss/postcss**        | ^4       | Tailwind CSS PostCSS Plugin       | ✅ Installiert |
| **@types/node**                 | ^20      | Node.js TypeScript Definitionen   | ✅ Installiert |
| **@types/react**                | ^19      | React TypeScript Definitionen     | ✅ Installiert |
| **@types/react-dom**            | ^19      | React DOM TypeScript Definitionen | ✅ Installiert |
| **@types/three**                | ^0.169.0 | Three.js TypeScript Definitionen  | ✅ Installiert |
| **babel-plugin-react-compiler** | 1.0.0    | React Compiler Plugin             | ✅ Installiert |
| **eslint**                      | ^9       | JavaScript/TypeScript Linter      | ✅ Installiert |
| **eslint-config-next**          | 16.0.6   | Next.js ESLint Konfiguration      | ✅ Installiert |
| **tailwindcss**                 | ^4       | Utility-First CSS Framework       | ✅ Installiert |
| **typescript**                  | ^5       | TypeScript Compiler               | ✅ Installiert |

## 🎯 Geplante 3D-Dependencies

### 3D-Graphics & Animation - ✅ INSTALLIERT

| Package                 | Version  | Beschreibung                         | Status         | Installation Schritt |
| ----------------------- | -------- | ------------------------------------ | -------------- | -------------------- |
| **three**               | ^0.169.0 | 3D JavaScript Library                | ✅ Installiert | Schritt 2            |
| **@react-three/fiber**  | ^8.17.10 | React Renderer für Three.js          | ✅ Installiert | Schritt 2            |
| **@react-three/drei**   | ^9.114.4 | Utilities für React Three Fiber      | ✅ Installiert | Schritt 2            |
| **@types/three**        | ^0.169.0 | Three.js TypeScript Definitionen     | ✅ Installiert | Schritt 2            |
| **@react-three/cannon** | ^6.6.0   | Physics Engine für React Three Fiber | 🔄 Geplant     | Schritt 3            |

### Animation & Interaction

| Package           | Version   | Beschreibung                 | Status     | Installation Schritt |
| ----------------- | --------- | ---------------------------- | ---------- | -------------------- |
| **framer-motion** | ^10.16.16 | Animation Library            | 🔄 Geplant | Schritt 3            |
| **leva**          | ^0.9.35   | GUI Controls für Development | 🔄 Geplant | Schritt 3            |

## 🌍 Geplante i18n Dependencies

### Internationalisierung

| Package        | Version | Beschreibung                 | Status     | Installation Schritt |
| -------------- | ------- | ---------------------------- | ---------- | -------------------- |
| **next-intl**  | ^3.9.0  | Next.js Internationalization | 🔄 Geplant | Schritt 5            |
| **react-intl** | ^6.6.2  | React Internationalization   | 🔄 Geplant | Schritt 5            |

## 🗄 Geplante Backend Dependencies

### Database & ORM

| Package            | Version | Beschreibung                      | Status     | Installation Schritt |
| ------------------ | ------- | --------------------------------- | ---------- | -------------------- |
| **prisma**         | 6.9.0   | Modern Database Toolkit           | 🔄 Geplant | Schritt 6            |
| **@prisma/client** | 6.9.0   | Prisma Client für Database Access | 🔄 Geplant | Schritt 6            |
| **pg**             | ^8.11.3 | PostgreSQL Client                 | 🔄 Geplant | Schritt 6            |
| **@types/pg**      | ^8.10.9 | PostgreSQL TypeScript Types       | 🔄 Geplant | Schritt 6            |

### Validation & Forms

| Package                 | Version | Beschreibung                       | Status     | Installation Schritt |
| ----------------------- | ------- | ---------------------------------- | ---------- | -------------------- |
| **zod**                 | ^3.22.4 | TypeScript-first Schema Validation | 🔄 Geplant | Schritt 4            |
| **react-hook-form**     | ^7.48.2 | Performant Forms Library           | 🔄 Geplant | Schritt 4            |
| **@hookform/resolvers** | ^3.3.2  | Validation Resolvers               | 🔄 Geplant | Schritt 4            |

## 🧪 Testing Dependencies (zum Schluss)

### Unit Testing

| Package                       | Version | Beschreibung                 | Status     | Installation Schritt |
| ----------------------------- | ------- | ---------------------------- | ---------- | -------------------- |
| **jest**                      | ^29.7.0 | JavaScript Testing Framework | 🔄 Geplant | Schritt 7            |
| **@testing-library/react**    | ^14.1.2 | React Testing Utilities      | 🔄 Geplant | Schritt 7            |
| **@testing-library/jest-dom** | ^6.1.5  | Custom Jest Matchers         | 🔄 Geplant | Schritt 7            |

### E2E Testing

| Package     | Version | Beschreibung       | Status     | Installation Schritt |
| ----------- | ------- | ------------------ | ---------- | -------------------- |
| **cypress** | ^13.6.1 | End-to-End Testing | 🔄 Geplant | Schritt 7            |

## 🐳 DevOps Dependencies

### Containerization

| Package    | Version | Beschreibung       | Status     | Installation Schritt |
| ---------- | ------- | ------------------ | ---------- | -------------------- |
| **Docker** | Desktop | Container Platform | 🔄 Geplant | Schritt 6            |

## 📋 Installation Commands

### Aktuelle Dependencies prüfen

```bash
npm list
```

### 3D-Libraries installieren (Schritt 2) - ✅ ABGESCHLOSSEN

```bash
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```

### Animation Libraries installieren (Schritt 3)

```bash
npm install framer-motion @react-three/cannon leva
```

### Form & Validation Libraries (Schritt 4)

```bash
npm install zod react-hook-form @hookform/resolvers
```

### Internationalisierung (Schritt 5)

```bash
npm install next-intl react-intl
```

### Backend Dependencies (Schritt 6)

```bash
npm install prisma @prisma/client pg zod
npm install --save-dev @types/pg
```

### Testing Libraries (Schritt 7)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom cypress
```

## 🔄 Update-Log

| Datum      | Änderung                          |
| ---------- | --------------------------------- |
| 02.12.2025 | Initial Dependencies dokumentiert |

---

_Letzte Aktualisierung: 2. Dezember 2025_
