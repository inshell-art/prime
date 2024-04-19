// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // This uses the new JSX transform
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-env",
  ],
};
