module.exports = {
  "preset": "jest-expo",
  "globals": {
    "ts-jest": {
      "tsconfig": {
        "jsx": "react"
      }
    }
  },
  "setupFilesAfterEnv": [
    "@testing-library/jest-native/extend-expect",
    "./jest.setup.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/App.tsx",
    "!**/graphqlapi.ts",
    "!**/babel.config.js",
    "!**/jest.setup.js",
    "!**/anchorPoints.ts",
    "!**/CustomCarousel.tsx",
    "!**/CustomPinInput.tsx"
  ],
  "moduleFileExtensions": [
    "js",
    "tsx",
    "ts",
    "json"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui/.*|react-hook-form|expo-local-authentication|react-native-reanimated|react-native-responsive-screen|react-native-safe-area-context|react-native-confirmation-code-field|expo-blur|react-native-reanimated-carousel)"
  ],
  "globalSetup": "@shopify/react-native-skia/globalJestSetup.js",
  "setupFiles": [
    "@shopify/react-native-skia/jestSetup.js"
  ],
  "coverageReporters": [
    "json-summary",
    "text",
    "lcov"
  ]
};