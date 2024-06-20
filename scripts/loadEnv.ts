import path from "path";
import dotenv from "dotenv";
import { getDirname } from "../utils/utils";

const { __dirname } = getDirname(import.meta.url);

const env = process.env.NODE_ENV || "dev";

const envFile = path.resolve(__dirname, `../config/.env.${env}`);

dotenv.config({ path: envFile });

console.log(`Loaded env: ${env}`);
console.log("SERVER_API:", process.env.SERVER_API);
console.log("PORT:", process.env.PORT);
