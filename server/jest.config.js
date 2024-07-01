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
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },

  testMatch: ["<rootDir>/tests/**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: path.join(__dirname, "coverage"),
};
