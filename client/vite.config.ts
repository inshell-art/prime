import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { getDirname } from '../utils/utils';
import '../scripts/loadEnv';

const { __dirname } = getDirname(import.meta.url);

console.log('__VITE_GET_PRIME', process.env.GET_PRIME_URL);

console.log('apiKey:', process.env.VITE_APP_FIREBASE_API_KEY);
console.log('projectId:', process.env.VITE_APP_FIREBASE_PROJECT_ID);
console.log('appId:', process.env.VITE_APP_FIREBASE_APP_ID);
console.log('measurementId:', process.env.VITE_APP_FIREBASE_MEASUREMENT_ID);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    emptyOutDir: true,
  },
  define: {
    __VITE_GET_PRIME: JSON.stringify(process.env.GET_PRIME_URL),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
