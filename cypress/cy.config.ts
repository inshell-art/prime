import { defineConfig } from 'cypress';
import { hostingPort } from '../scripts/getHostingPort';
import '../scripts/loadEnv'; // Load environment variables

const server_api = process.env.GET_PRIME_URL;

const port = hostingPort;
const baseUrl_emu = `http://127.0.0.1:${port}`;

const isStaging = process.env.NODE_ENV === 'staging';

export default defineConfig({
  e2e: {
    baseUrl: isStaging ? process.env.baseUrl : baseUrl_emu,
    specPattern: 'cypress/e2e/**/*.spec.ts',
    env: {
      apiUrl: server_api,
    },
  },
});
