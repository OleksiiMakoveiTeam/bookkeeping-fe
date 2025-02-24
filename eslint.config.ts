import type {ESLint, Linter} from "eslint"
import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

const config: Linter.Config[] = [
  eslint.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["node_modules", "dist", "build"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },

    plugins: {
      "@typescript-eslint": tseslint as unknown as ESLint.Plugin
    },

    rules: {
      "no-console": ["error", {allow: ["error"]}],
      semi: ["error", "never"],

      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": ["warn"],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          caughtErrors: "all",
          destructuredArrayIgnorePattern: "^_",
          argsIgnorePattern: /^_/u,
          varsIgnorePattern: /^_/u,
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false
        }
      ]
    }
  }
]

export default config
