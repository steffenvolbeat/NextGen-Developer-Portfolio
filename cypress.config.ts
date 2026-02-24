import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 60000,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
