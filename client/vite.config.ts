import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { getDirname } from "../utils/utils";

const { __dirname } = getDirname(import.meta.url);

export default defineConfig(({ mode }) => {
  let baseConfig = {
    plugins: [react()],
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
      emptyOutDir: true,
    },
    define: {
      __VITE_GET_PRIME: JSON.stringify(process.env.VITE_GET_PRIME),
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };

  return baseConfig;
});
