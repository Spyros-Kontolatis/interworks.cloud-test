module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.vue$": "./vue3JestHack.js",
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: `./tsconfig.json` }],
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  testEnvironment: "jsdom",
  globals: {
    "vue-jest": { tsConfig: `./tsconfig.json` },
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.ts$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^axios$": "axios/dist/node/axios.cjs",
  },
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest/presets/default-esm",
};
