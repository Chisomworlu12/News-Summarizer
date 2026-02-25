/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/__mocks__/env.ts"],
  moduleNameMapper: {
    "^(.+)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        babelConfig: true,
        isolatedModules: true,
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          allowJs: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
};
