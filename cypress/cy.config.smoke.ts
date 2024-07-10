import { defineConfig } from 'cypress';
import '../scripts/loadEnv'; // Load environment variables

const server_api = process.env.GET_PRIME_URL;
const base_url = process.env.BASE_URL;

export default defineConfig({
  e2e: {
    baseUrl: base_url,
    specPattern: 'cypress/e2e/smoke.spec.ts',
    env: {
      apiUrl: server_api,
    },
  },
});
