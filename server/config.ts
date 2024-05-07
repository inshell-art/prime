import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env.dev"), // For development environment only
});

const port: number = parseInt(process.env.PORT || "3000", 10);

export { port };
