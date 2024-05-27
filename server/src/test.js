// ESM Module (index.mjs)
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // Outputs: /path/to/project
console.log(__filename); // Outputs: /path/to/project/index.mjs
console.log(import.meta.url); // Outputs: file:///path/to/project/index.mjs
