import fs from 'fs';
import path from 'path';
import glob from 'glob';

// Function to update import statements with .js extensions
const updateImports = filePath => {
  const code = fs.readFileSync(filePath, 'utf8');
  const updatedCode = code.replace(
    /(import\s+.*?['"])(\.\/.*?)(['"])/g,
    '$1$2.js$3',
  );
  fs.writeFileSync(filePath, updatedCode, 'utf8');
  console.log(`Updated imports in ${filePath}`);
};

// Recursively update all .js files in the specified directory
const updateAllImports = dir => {
  glob(`${dir}/**/*.js`, (err, files) => {
    if (err) throw err;
    files.forEach(file => updateImports(file));
  });
};

// Get the directory argument from the command line
const dir = process.argv[2];

if (!dir) {
  console.error(
    'Error: No directory specified. Please provide a directory as a command-line argument.',
  );
  process.exit(1);
}

// Resolve the directory path and update imports
const resolvedDir = path.resolve(dir);
updateAllImports(resolvedDir);
