import { defineConfig } from 'cypress';
import '../scripts/loadEnv'; // Load environment variables

const server_api = process.env.GET_PRIME_URL;
const base_url = process.env.BASE_URL;

export default defineConfig({
  e2e: {
    baseUrl: base_url,
    specPattern: 'cypress/e2e/**/*.spec.ts',
    env: {
      apiUrl: server_api,
    },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});
