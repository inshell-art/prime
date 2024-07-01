import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, 'package.json');
const destPath = path.resolve(__dirname, 'dist', 'package.json');

const packageJson = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));

// Create a minimal package.json for dist/
const minimalPackageJson = {
  name: packageJson.name,
  private: true,
  version: packageJson.version,
  type: packageJson.type,
  engines: packageJson.engines,
  main: 'index.js',
  dependencies: packageJson.dependencies,
};

fs.writeFileSync(destPath, JSON.stringify(minimalPackageJson, null, 2));
console.log('Minimal package.json copied to dist directory');
