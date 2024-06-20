import app from "./app";
import { onRequest } from "firebase-functions/v2/https";

import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV;
const envFile = path.resolve(__dirname, `../../config/.env.${env}`);

console.log(`Loaded env: ${env}`);

dotenv.config({ path: envFile });

const port = process.env.PORT || 3333;

// For local dev
if (env === "dev") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// For emu, staging, and prod
export const api = onRequest(app);
