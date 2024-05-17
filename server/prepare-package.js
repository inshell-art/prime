import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, "package.json");
const distPackageJsonPath = path.resolve(__dirname, "lib", "package.json");

// Read the existing package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Create a new package.json for the dist directory
const distPackageJson = {
  name: packageJson.name,
  private: packageJson.private,
  version: packageJson.version,
  type: packageJson.type,
  engines: packageJson.engines,
  dependencies: packageJson.dependencies,
};

// Ensure the dist directory exists
if (!fs.existsSync(path.resolve(__dirname, "lib"))) {
  fs.mkdirSync(path.resolve(__dirname, "lib"));
}

// Write the new package.json to the dist directory
fs.writeFileSync(
  distPackageJsonPath,
  JSON.stringify(distPackageJson, null, 2),
  "utf8",
);

console.log("Prepared lib/package.json for local development.");
