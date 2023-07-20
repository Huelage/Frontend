module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["module-resolver", {
        alias: {
          "@images": "./assets/images",
          "@icons": "./assets/icons",
          "@api": "./src/api",
          "@components": "./src/components",
          "@containers": "./src/containers",
          "@navigators": "./src/navigators",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
          "@interfaces": "./src/utils/interfaces.ts"
        },
        "extensions": [".tsx", ".ts", ".json", ".png", ".jpg", ".jpeg"]
      }],
      'react-native-reanimated/plugin'
    ]
  };
};
