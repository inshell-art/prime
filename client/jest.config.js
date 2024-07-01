import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  rootDir: path.resolve(__dirname),

  projects: [
    {
      displayName: {
        name: 'client:unit',
        color: 'cyan',
      },
      setupFiles: ['<rootDir>/tests/jest.setup.js'],
      testMatch: ['<rootDir>/tests/*.test.[jt]s?(x)'],
      moduleDirectories: ['node_modules', 'src'],
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
      },
      transformIgnorePatterns: ['<rootDir>/node_modules'],
      resetMocks: true,
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      },
    },
  ],
  // Coverage report configuration
  collectCoverage: true,
  collectCoverageFrom: ['src/App.tsx'], // Coverage for App for unit tests only
  coverageDirectory: 'coverage',
};
