import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { getDirname } from '../utils/utils';
import '../scripts/loadEnv'; // Load environment variables for VITE_GET_PRIME

const { __dirname } = getDirname(import.meta.url);

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
