# Jest Testing Dokumentation - NextGen-Developer-Portfolio 🧪

## 📋 Testing Overview

Jest wird für Unit- und Integration-Tests des NextGen-Developer-Portfolio verwendet. Die Implementierung erfolgt in **Schritt 7** nach Fertigstellung der gesamten Anwendung.

**Status:** 🔄 Wird in Schritt 7 implementiert (zum Schluss)

## 🎯 Testing Strategy

### Test-Pyramide

```
    🔺 E2E Tests (Cypress)
      🔺 Integration Tests (Jest)
        🔺 Unit Tests (Jest)
```

| Test Level            | Framework              | Zweck                           | Umfang |
| --------------------- | ---------------------- | ------------------------------- | ------ |
| **Unit Tests**        | Jest                   | Einzelne Funktionen/Komponenten | 70%    |
| **Integration Tests** | Jest + Testing Library | Komponenten-Zusammenspiel       | 20%    |
| **E2E Tests**         | Cypress                | Vollständige User-Flows         | 10%    |

## 🔧 Geplante Jest Konfiguration

### Dependencies

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@jest/globals": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.8",
    "ts-jest": "^29.1.1"
  }
}
```

### Jest Configuration (jest.config.js)

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Path to Next.js app directory
  dir: "./",
});

const customJestConfig = {
  // Test environment
  testEnvironment: "jsdom",

  // Setup files
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Module paths
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },

  // Test patterns
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/index.{js,jsx,ts,tsx}",
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Mock configurations
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  // 3D/Three.js mocks
  moduleNameMapping: {
    "^three$": "<rootDir>/__mocks__/three.js",
    "^@react-three/fiber$": "<rootDir>/__mocks__/react-three-fiber.js",
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Setup File (jest.setup.js)

```javascript
import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Canvas for Three.js
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}));
```

## 🧪 Test Structure

### Directory Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx          # Unit tests
│   │   └── __tests__/
│   │       └── Button.integration.test.tsx
│   ├── 3d/
│   │   ├── Motherboard.tsx
│   │   └── __tests__/
│   │       └── Motherboard.test.tsx
│   └── layout/
│       ├── Navigation.tsx
│       └── Navigation.test.tsx
├── lib/
│   ├── utils.ts
│   ├── utils.test.ts                # Utility function tests
│   └── __tests__/
│       └── api.integration.test.ts
├── app/
│   └── __tests__/
│       ├── page.test.tsx            # Page component tests
│       └── layout.test.tsx
└── __mocks__/                       # Global mocks
    ├── three.js
    ├── react-three-fiber.js
    └── prisma.js
```

## 📝 Geplante Test Categories

### 1. Component Tests

```typescript
// src/components/ui/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct CSS classes", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("btn-primary");
  });
});
```

### 2. 3D Component Tests

```typescript
// src/components/3d/__tests__/Motherboard.test.tsx
import { render } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";
import { Motherboard } from "../Motherboard";

// Mock Three.js components
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: any) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: jest.fn(() => ({ camera: {}, scene: {} })),
}));

describe("Motherboard 3D Component", () => {
  test("renders without crashing", () => {
    render(
      <Canvas>
        <Motherboard />
      </Canvas>
    );
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  test("initializes with correct position", () => {
    const mockPosition = [0, 0, 0];
    render(
      <Canvas>
        <Motherboard position={mockPosition} />
      </Canvas>
    );
    // Test component initialization
  });
});
```

### 3. Navigation Tests

```typescript
// src/components/layout/Navigation.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navigation Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: "/home",
    });
  });

  test("renders all navigation links", () => {
    render(<Navigation />);

    expect(screen.getByText("Willkommen")).toBeInTheDocument();
    expect(screen.getByText("Über mich")).toBeInTheDocument();
    expect(screen.getByText("Projekte")).toBeInTheDocument();
  });

  test("navigates to correct pages", () => {
    render(<Navigation />);

    fireEvent.click(screen.getByText("Projekte"));
    expect(mockPush).toHaveBeenCalledWith("/projects");
  });
});
```

### 4. API Route Tests

```typescript
// src/app/api/contact/__tests__/route.test.ts
import { POST } from "../route";
import { NextRequest } from "next/server";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  contact: {
    create: jest.fn(),
  },
}));

describe("/api/contact", () => {
  test("creates contact successfully", async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      message: "Test message",
    });

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "Test message",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.name).toBe("John Doe");
  });
});
```

### 5. Utility Function Tests

```typescript
// src/lib/utils.test.ts
import { cn, formatDate, validateEmail } from "./utils";

describe("Utility Functions", () => {
  describe("cn (className helper)", () => {
    test("combines classnames correctly", () => {
      expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
    });

    test("handles conditional classes", () => {
      expect(cn("btn", false && "hidden", "active")).toBe("btn active");
    });
  });

  describe("formatDate", () => {
    test("formats date correctly", () => {
      const date = new Date("2025-12-02");
      expect(formatDate(date)).toBe("02.12.2025");
    });
  });

  describe("validateEmail", () => {
    test("validates correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    test("rejects invalid email", () => {
      expect(validateEmail("invalid-email")).toBe(false);
    });
  });
});
```

## 🎭 Mock Configurations

### Three.js Mock (**mocks**/three.js)

```javascript
export const Scene = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
}));

export const PerspectiveCamera = jest.fn();
export const WebGLRenderer = jest.fn(() => ({
  render: jest.fn(),
  setSize: jest.fn(),
  domElement: document.createElement("canvas"),
}));

export const BoxGeometry = jest.fn();
export const MeshBasicMaterial = jest.fn();
export const Mesh = jest.fn();
export const Vector3 = jest.fn();
```

### React Three Fiber Mock (**mocks**/react-three-fiber.js)

```javascript
export const Canvas = ({ children }) => (
  <div data-testid="canvas">{children}</div>
);

export const useFrame = jest.fn();
export const useThree = jest.fn(() => ({
  camera: {},
  scene: {},
  gl: {},
}));

export const extend = jest.fn();
```

### Prisma Mock (**mocks**/prisma.js)

```javascript
export const prisma = {
  contact: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  project: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  skill: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};
```

## 📊 Testing Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:update": "jest --updateSnapshot",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
}
```

### Coverage Configuration

```javascript
// jest.config.js - Coverage
coverageReporters: ['text', 'lcov', 'html'],
coverageDirectory: 'coverage',
coveragePathIgnorePatterns: [
  '/node_modules/',
  '/coverage/',
  '/.next/',
  '/public/',
  '/cypress/',
  '*.config.js',
  '*.setup.js',
],
```

## 🔄 Testing Workflow

### Development Testing

1. **Watch Mode**: `npm run test:watch`
2. **Coverage Check**: `npm run test:coverage`
3. **Snapshot Update**: `npm run test:update`

### CI/CD Testing

1. **Lint Check**: `npm run lint`
2. **Type Check**: `npm run type-check`
3. **Unit Tests**: `npm run test:ci`
4. **E2E Tests**: `npm run cypress:run`

### Pre-Commit Hooks

```javascript
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test:ci
```

## 📋 Test Categories Roadmap

| Kategorie             | Tests                           | Status     | Schritt |
| --------------------- | ------------------------------- | ---------- | ------- |
| **Utility Functions** | utils, helpers, validators      | 🔄 Geplant | 7.1     |
| **UI Components**     | Button, Input, Card, Modal      | 🔄 Geplant | 7.2     |
| **3D Components**     | Motherboard, Avatar, Animations | 🔄 Geplant | 7.3     |
| **Layout Components** | Navigation, Header, Footer      | 🔄 Geplant | 7.4     |
| **Page Components**   | Home, About, Projects, Contact  | 🔄 Geplant | 7.5     |
| **API Routes**        | Contact, Projects, Skills       | 🔄 Geplant | 7.6     |
| **Integration Tests** | Full component interactions     | 🔄 Geplant | 7.7     |

## 🔄 Update-Log

| Datum      | Änderung                                       |
| ---------- | ---------------------------------------------- |
| 02.12.2025 | Jest Testing-Struktur geplant und dokumentiert |

---

_Hinweis: Jest Testing wird in Schritt 7 implementiert, zum Schluss des Projekts_

_Letzte Aktualisierung: 2. Dezember 2025_
