import path from "path";

export default {
  rootDir: path.resolve(__dirname),
  roots: ["<rootDir>/tests"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  resetMocks: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],

  // Coverage report configuration
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
};
