require("eslint-plugin-react");

const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended");
const reactVersion = require("react/package.json").version;

// Helper function to merge an array of configs to be object for spread operator work
function mergeConfigs(configs) {
  return configs.reduce(
    (acc, config) => ({
      ...acc,
      ...config,
    }),
    {}
  );
}

module.exports = {
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
  },
  ...pluginJs.configs.recommended,
  ...mergeConfigs(tseslint.configs.recommended),
  ...pluginReactConfig,
  settings: {
    react: {
      version: reactVersion,
    },
  },
};
