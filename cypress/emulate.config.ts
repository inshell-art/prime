import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { resolve } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename);

dotenv.config({ path: resolve(__dirname, "../client/.env.emu") });

const firebaseConfig = JSON.parse(
  fs.readFileSync(resolve(__dirname, "../../firebase.json"), "utf-8")
);

const hostingPort = firebaseConfig.hosting?.port || 5009;

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${hostingPort}`,
    specPattern: "cypress/e2e/**/*.spec.ts",
    env: {
      apiUrl: process.env.SERVER_API,
    },
  },
});
