import { defineConfig } from "cypress";
import { hostingPort } from "../scripts/getHostingPort";
import "../scripts/loadEnv"; // Load environment variables for VITE_GET_PRIME

const server_api = process.env.GET_PRIME_URL;

console.log("server_api:", server_api);
const port = hostingPort;

export default defineConfig({
  e2e: {
    baseUrl: `http://127.0.0.1:${port}`,
    specPattern: "cypress/e2e/**/*.spec.ts",
    env: {
      apiUrl: server_api,
    },
  },
});
