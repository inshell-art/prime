// jest.config.js
module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks out CSS imports
  },
  testEnvironment: "jsdom", // Simulates the browser environment for testing

  testMatch: ["<rootDir>/client/**/?(*.)+(spec|test).[tj]s?(x)"], // Tests in /src for FE only
};
