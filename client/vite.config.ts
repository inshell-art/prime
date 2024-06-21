import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { getDirname } from "../utils/utils";
import "../scripts/loadEnv";

const api = process.env.SERVER_API;

const { __dirname } = getDirname(import.meta.url);

console.log("SERVER_API in vite config:", api);
console.log("stringified SERVER_API in vite config:", JSON.stringify(api));

export default defineConfig({
  plugins: [react()],
  define: {
    SERVER_API: JSON.stringify(api),
  },

  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
