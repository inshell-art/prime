import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5009",
    specPattern: "cypress/e2e/**/*.spec.ts",
  },
});
