export default {
  testEnvironment: "node",
  projects: [
    {
      displayName: "unit:client",
      preset: "ts-jest/presets/default-esm",
      testMatch: ["<rootDir>/tests/unit/client/**/*.test.(ts|tsx)"],
      transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
      },
      testEnvironment: "jsdom",
      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      },
    },
    {
      displayName: "unit:server",
      preset: "ts-jest/presets/default-esm",
      testMatch: ["<rootDir>/tests/unit/server/**/*.test.ts"],
    },
  ],
};
