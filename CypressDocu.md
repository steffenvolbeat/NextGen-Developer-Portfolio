# Cypress E2E Testing Dokumentation - NextGen-Developer-Portfolio 🌲

## 📋 Cypress Overview

Cypress wird für End-to-End Testing des NextGen-Developer-Portfolio verwendet, um vollständige User-Journeys und 3D-Interaktionen zu testen.

**Status:** 🔄 Wird in Schritt 7 implementiert (zum Schluss, nach Jest)

## 🎯 E2E Testing Strategy

### Test-Pyramide Position

```
    🔺 E2E Tests (Cypress) ← Hier sind wir
      🔺 Integration Tests (Jest)
        🔺 Unit Tests (Jest)
```

| Test Typ               | Zweck                             | Umfang | Ausführung      |
| ---------------------- | --------------------------------- | ------ | --------------- |
| **User Journeys**      | Vollständige Portfolio-Navigation | 40%    | Kritische Pfade |
| **3D Interactions**    | Avatar-Bewegung & 3D-Navigation   | 30%    | WASD + Maus     |
| **Form Testing**       | Kontaktformular & Validation      | 20%    | Real User Input |
| **Responsive Testing** | Mobile/Desktop Compatibility      | 10%    | Cross-Browser   |

## 🔧 Geplante Cypress Konfiguration

### Dependencies

```json
{
  "devDependencies": {
    "cypress": "^13.6.1",
    "@cypress/webpack-preprocessor": "^6.0.1",
    "cypress-real-events": "^1.11.0",
    "cypress-file-upload": "^5.0.8",
    "@testing-library/cypress": "^10.0.1",
    "cypress-axe": "^1.5.0",
    "cypress-visual-regression": "^5.0.0"
  }
}
```

### Cypress Configuration (cypress.config.ts)

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Base URL
    baseUrl: "http://localhost:3000",

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Video recording
    video: true,
    videoCompression: 32,
    videosFolder: "cypress/videos",

    // Screenshots
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,

    // Test files
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",

    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 30000,

    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Environment variables
    env: {
      hideXHR: true,
      coverage: false,
    },

    // Setup Node events
    setupNodeEvents(on, config) {
      // Code coverage
      require("@cypress/code-coverage/task")(on, config);

      // Visual regression
      require("cypress-visual-regression/plugins")(on, config);

      return config;
    },
  },

  // Component testing (für isolierte 3D-Komponenten)
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
});
```

### Support Configuration (cypress/support/e2e.ts)

```typescript
// Import commands
import "./commands";
import "./3d-commands";

// Import plugins
import "cypress-real-events";
import "@testing-library/cypress/add-commands";
import "cypress-axe";
import "cypress-visual-regression/command";

// Global configuration
Cypress.config("defaultCommandTimeout", 10000);
Cypress.config("requestTimeout", 15000);

// Before each test
beforeEach(() => {
  // Set viewport
  cy.viewport(1280, 720);

  // Inject accessibility testing
  cy.injectAxe();

  // Wait for Three.js to load
  cy.window().should("have.property", "THREE");
});

// Global error handling
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ignore Three.js WebGL warnings
  if (err.message.includes("WebGL")) {
    return false;
  }

  // Don't fail tests on unhandled promise rejections
  if (err.message.includes("ResizeObserver")) {
    return false;
  }

  return true;
});
```

## 🎮 3D-Specific Commands (cypress/support/3d-commands.ts)

### Custom Commands für 3D-Navigation

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      // 3D Navigation Commands
      moveAvatar(
        direction: "forward" | "backward" | "left" | "right"
      ): Chainable<Element>;
      navigateToStation(station: string): Chainable<Element>;
      waitFor3DLoad(): Chainable<Element>;
      checkCPUWater(): Chainable<Element>;

      // WASD Controls
      pressWASD(keys: string, duration?: number): Chainable<Element>;
      mouseMove3D(x: number, y: number): Chainable<Element>;

      // Portfolio Stations
      visitWelcomeStation(): Chainable<Element>;
      visitAboutStation(): Chainable<Element>;
      visitSkillsStation(): Chainable<Element>;
      visitProjectsStation(): Chainable<Element>;
      visitContactStation(): Chainable<Element>;
    }
  }
}

// Wait for 3D scene to load
Cypress.Commands.add("waitFor3DLoad", () => {
  cy.get('[data-testid="3d-canvas"]', { timeout: 30000 }).should("be.visible");
  cy.window().should("have.property", "THREE");
  cy.wait(2000); // Additional wait for scene initialization
});

// Move avatar using WASD
Cypress.Commands.add(
  "moveAvatar",
  (direction: "forward" | "backward" | "left" | "right") => {
    const keyMap = {
      forward: "w",
      backward: "s",
      left: "a",
      right: "d",
    };

    cy.get('[data-testid="3d-canvas"]').focus();
    cy.get("body").type(keyMap[direction], { force: true });
    cy.wait(500); // Wait for movement animation
  }
);

// Press WASD combination
Cypress.Commands.add("pressWASD", (keys: string, duration = 1000) => {
  cy.get('[data-testid="3d-canvas"]').focus();

  keys.split("").forEach((key) => {
    cy.get("body").type(key, { force: true });
  });

  cy.wait(duration);
});

// Navigate to specific portfolio station
Cypress.Commands.add("navigateToStation", (station: string) => {
  cy.get(`[data-testid="station-${station}"]`).click();
  cy.wait(1000); // Wait for navigation animation
  cy.get(`[data-testid="page-${station}"]`).should("be.visible");
});

// Check CPU water animation
Cypress.Commands.add("checkCPUWater", () => {
  cy.get('[data-testid="cpu-water"]').should("be.visible");
  cy.get('[data-testid="cpu-water"]').should("have.class", "animated");
});

// Portfolio station navigation commands
Cypress.Commands.add("visitWelcomeStation", () => {
  cy.navigateToStation("welcome");
});

Cypress.Commands.add("visitAboutStation", () => {
  cy.navigateToStation("about");
});

Cypress.Commands.add("visitSkillsStation", () => {
  cy.navigateToStation("skills");
});

Cypress.Commands.add("visitProjectsStation", () => {
  cy.navigateToStation("projects");
});

Cypress.Commands.add("visitContactStation", () => {
  cy.navigateToStation("contact");
});

// 3D mouse movement
Cypress.Commands.add("mouseMove3D", (x: number, y: number) => {
  cy.get('[data-testid="3d-canvas"]').realMouseMove(x, y).wait(100);
});
```

## 🧪 Test Suite Structure

### Directory Structure

```
cypress/
├── e2e/
│   ├── portfolio/
│   │   ├── 01-welcome.cy.ts           # Welcome page tests
│   │   ├── 02-about.cy.ts             # About page tests
│   │   ├── 03-skills.cy.ts            # Skills page tests
│   │   ├── 04-projects.cy.ts          # Projects page tests
│   │   ├── 05-contact.cy.ts           # Contact page tests
│   │   └── 06-navigation.cy.ts        # Navigation tests
│   ├── 3d-interactions/
│   │   ├── avatar-movement.cy.ts      # WASD movement tests
│   │   ├── motherboard-navigation.cy.ts # 3D navigation tests
│   │   ├── cpu-water-animation.cy.ts  # Animation tests
│   │   └── station-transitions.cy.ts  # Transition tests
│   ├── forms/
│   │   ├── contact-form.cy.ts         # Contact form tests
│   │   └── form-validation.cy.ts      # Validation tests
│   ├── responsive/
│   │   ├── mobile-navigation.cy.ts    # Mobile tests
│   │   └── tablet-layout.cy.ts        # Tablet tests
│   └── accessibility/
│       ├── a11y-navigation.cy.ts      # Accessibility tests
│       └── keyboard-navigation.cy.ts  # Keyboard navigation
├── fixtures/
│   ├── contact-form-data.json         # Test data
│   ├── projects-data.json             # Project test data
│   └── skills-data.json               # Skills test data
├── support/
│   ├── e2e.ts                        # E2E support file
│   ├── component.ts                  # Component testing support
│   ├── commands.ts                   # General commands
│   └── 3d-commands.ts                # 3D-specific commands
└── videos/                           # Test recordings
└── screenshots/                      # Test screenshots
```

## 🎯 Geplante Test Scenarios

### 1. Portfolio Navigation Tests

```typescript
// cypress/e2e/portfolio/06-navigation.cy.ts
describe("Portfolio Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitFor3DLoad();
  });

  it("navigates through all portfolio stations", () => {
    // Start at welcome station
    cy.visitWelcomeStation();
    cy.get('[data-testid="welcome-content"]').should("be.visible");

    // Navigate to each station
    cy.visitAboutStation();
    cy.get('[data-testid="about-content"]').should("be.visible");

    cy.visitSkillsStation();
    cy.get('[data-testid="skills-content"]').should("be.visible");

    cy.visitProjectsStation();
    cy.get('[data-testid="projects-content"]').should("be.visible");

    cy.visitContactStation();
    cy.get('[data-testid="contact-content"]').should("be.visible");
  });

  it("maintains navigation state during 3D transitions", () => {
    cy.visitAboutStation();
    cy.url().should("include", "/about");

    // Move avatar and check URL persistence
    cy.moveAvatar("forward");
    cy.url().should("include", "/about");
  });
});
```

### 2. 3D Avatar Movement Tests

```typescript
// cypress/e2e/3d-interactions/avatar-movement.cy.ts
describe("Avatar Movement Controls", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitFor3DLoad();
  });

  it("responds to WASD keyboard controls", () => {
    // Test each direction
    cy.moveAvatar("forward");
    cy.get('[data-testid="avatar"]').should("have.attr", "data-moving", "true");

    cy.moveAvatar("backward");
    cy.get('[data-testid="avatar"]').should(
      "have.attr",
      "data-direction",
      "backward"
    );

    cy.moveAvatar("left");
    cy.get('[data-testid="avatar"]').should(
      "have.attr",
      "data-direction",
      "left"
    );

    cy.moveAvatar("right");
    cy.get('[data-testid="avatar"]').should(
      "have.attr",
      "data-direction",
      "right"
    );
  });

  it("handles complex movement combinations", () => {
    // Test diagonal movement
    cy.pressWASD("wa", 1000); // Forward + Left
    cy.get('[data-testid="avatar"]').should("have.attr", "data-moving", "true");

    cy.pressWASD("sd", 1000); // Backward + Right
    cy.get('[data-testid="avatar"]').should("have.attr", "data-moving", "true");
  });

  it("stops movement when keys are released", () => {
    cy.moveAvatar("forward");
    cy.wait(2000); // Wait for movement to stop
    cy.get('[data-testid="avatar"]').should(
      "have.attr",
      "data-moving",
      "false"
    );
  });
});
```

### 3. Contact Form Tests

```typescript
// cypress/e2e/forms/contact-form.cy.ts
describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/contact");
    cy.waitFor3DLoad();
  });

  it("submits valid contact form", () => {
    cy.fixture("contact-form-data").then((data) => {
      cy.get('[data-testid="contact-name"]').type(data.valid.name);
      cy.get('[data-testid="contact-email"]').type(data.valid.email);
      cy.get('[data-testid="contact-subject"]').type(data.valid.subject);
      cy.get('[data-testid="contact-message"]').type(data.valid.message);

      cy.get('[data-testid="contact-submit"]').click();

      cy.get('[data-testid="success-message"]').should("be.visible");
      cy.get('[data-testid="success-message"]').should(
        "contain",
        "Nachricht gesendet"
      );
    });
  });

  it("validates required fields", () => {
    cy.get('[data-testid="contact-submit"]').click();

    cy.get('[data-testid="name-error"]').should("be.visible");
    cy.get('[data-testid="email-error"]').should("be.visible");
    cy.get('[data-testid="message-error"]').should("be.visible");
  });

  it("validates email format", () => {
    cy.get('[data-testid="contact-email"]').type("invalid-email");
    cy.get('[data-testid="contact-submit"]').click();

    cy.get('[data-testid="email-error"]').should("contain", "Ungültige E-Mail");
  });
});
```

### 4. CPU Water Animation Tests

```typescript
// cypress/e2e/3d-interactions/cpu-water-animation.cy.ts
describe("CPU Water Animation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitFor3DLoad();
  });

  it("displays animated water around CPU", () => {
    cy.checkCPUWater();

    // Check if water animation is running
    cy.get('[data-testid="cpu-water"]')
      .should("have.css", "animation-duration")
      .and("not.equal", "0s");
  });

  it("maintains water animation during navigation", () => {
    cy.visitAboutStation();
    cy.checkCPUWater();

    cy.visitProjectsStation();
    cy.checkCPUWater();
  });
});
```

### 5. Responsive Design Tests

```typescript
// cypress/e2e/responsive/mobile-navigation.cy.ts
describe("Mobile Navigation", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.waitFor3DLoad();
  });

  it("adapts 3D controls for touch devices", () => {
    // Check for mobile control interface
    cy.get('[data-testid="mobile-controls"]').should("be.visible");
    cy.get('[data-testid="virtual-joystick"]').should("be.visible");
  });

  it("provides alternative navigation for mobile", () => {
    // Test mobile menu
    cy.get('[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-menu"]').should("be.visible");

    // Test direct page navigation
    cy.get('[data-testid="mobile-nav-projects"]').click();
    cy.url().should("include", "/projects");
  });
});
```

## 📊 Performance & Visual Testing

### Visual Regression Tests

```typescript
// cypress/e2e/visual/portfolio-screenshots.cy.ts
describe("Visual Regression Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitFor3DLoad();
  });

  it("matches welcome page screenshot", () => {
    cy.visitWelcomeStation();
    cy.compareSnapshot("welcome-page");
  });

  it("matches 3D scene rendering", () => {
    cy.get('[data-testid="3d-canvas"]').compareSnapshot("3d-scene-initial");
  });
});
```

### Accessibility Tests

```typescript
// cypress/e2e/accessibility/a11y-navigation.cy.ts
describe("Accessibility Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitFor3DLoad();
    cy.injectAxe();
  });

  it("meets accessibility standards", () => {
    cy.checkA11y();
  });

  it("supports keyboard navigation", () => {
    cy.get("body").tab();
    cy.focused().should("have.attr", "data-testid", "skip-to-content");

    cy.get("body").tab();
    cy.focused().should("have.attr", "data-testid", "main-navigation");
  });
});
```

## ⚡ Test Execution Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "cypress:run:edge": "cypress run --browser edge",
    "cypress:run:mobile": "cypress run --config viewportWidth=375,viewportHeight=667",
    "cypress:run:headed": "cypress run --headed",
    "cypress:test": "start-server-and-test dev 3000 'cypress run'",
    "cypress:test:mobile": "start-server-and-test dev 3000 'npm run cypress:run:mobile'",
    "cypress:record": "cypress run --record --key $CYPRESS_RECORD_KEY",
    "cypress:dashboard": "cypress run --record --parallel --ci-build-id $CI_BUILD_ID"
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/cypress.yml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: "http://localhost:3000"
          wait-on-timeout: 120
          browser: chrome
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📋 Test Data Management

### Test Fixtures (cypress/fixtures/contact-form-data.json)

```json
{
  "valid": {
    "name": "Max Mustermann",
    "email": "max@example.com",
    "subject": "Portfolio Anfrage",
    "message": "Hallo, ich bin interessiert an Ihrem Portfolio und möchte mehr erfahren."
  },
  "invalid": {
    "email": "invalid-email-format",
    "longMessage": "A".repeat(1001)
  }
}
```

## 🔄 Cypress Roadmap

| Phase          | Feature                       | Status     | Schritt |
| -------------- | ----------------------------- | ---------- | ------- |
| **Setup**      | Basic Cypress Configuration   | 🔄 Geplant | 7.1     |
| **3D Tests**   | WASD Movement & Navigation    | 🔄 Geplant | 7.2     |
| **Portfolio**  | All Page Navigation Tests     | 🔄 Geplant | 7.3     |
| **Forms**      | Contact Form & Validation     | 🔄 Geplant | 7.4     |
| **Responsive** | Mobile & Tablet Tests         | 🔄 Geplant | 7.5     |
| **Visual**     | Screenshot & Regression Tests | 🔄 Geplant | 7.6     |
| **A11y**       | Accessibility Testing         | 🔄 Geplant | 7.7     |
| **CI/CD**      | Automated Test Pipeline       | 🔄 Geplant | 7.8     |

## 🔄 Update-Log

| Datum      | Änderung                                              |
| ---------- | ----------------------------------------------------- |
| 02.12.2025 | Cypress E2E Testing-Struktur geplant und dokumentiert |

---

_Hinweis: Cypress E2E Testing wird in Schritt 7 implementiert, zum Schluss nach Jest Unit Tests_

_Letzte Aktualisierung: 2. Dezember 2025_
