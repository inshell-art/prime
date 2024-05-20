import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  rootDir: path.resolve(__dirname),
  roots: ["<rootDir>/tests"],
  moduleDirectories: ["node_modules", "src"],

  displayName: {
    name: "server:unit",
    color: "blue",
  },
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest",
  },

  testMatch: ["<rootDir>/tests/unit/**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/primeGenerator.ts"], // Coverage for primeGenerator.ts for unit tests only
  coverageDirectory: path.join(__dirname, "coverage"),
};
