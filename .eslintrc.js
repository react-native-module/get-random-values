module.exports = {
    "env": {
      "es2021": true,
      node: true,
    },
    "extends": [
      "eslint:recommended",
    ],
    "overrides": [
      {
        files: ['*.ts', '*.d.ts'],
        "parser": "@typescript-eslint/parser",
        "plugins": [
          "@typescript-eslint"
        ],
        extends: [
          "standard-with-typescript",
          "plugin:@typescript-eslint/recommended"
        ],
        "parserOptions": {
          "ecmaVersion": "latest",,
          "project": "./tsconfig.json"
        },
        rules: {
          '@typescript-eslint/prefer-optional-chain': 0,
          '@typescript-eslint/strict-boolean-expressions': 0,
        }
      }
    ]
  }
  