// jest.config.js
module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks out CSS imports
  },
  testEnvironment: "jsdom", // Simulates the browser environment for testing
};
