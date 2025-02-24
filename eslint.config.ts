import type { Linter } from "eslint"
import eslint from "@eslint/js"

const config: Linter.Config[] = [
  eslint.configs.recommended,
  {
    rules: {
      "no-console": [0]
    }
  }
]

module.exports = config
