import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

import prettierRecommended from 'eslint-plugin-prettier/recommended'

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettierRecommended,
  ...compat.extends('plugin:mdx/recommended'),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }]
    }
  },
  {
    files: ['**/*.mdx'],
    rules: {
      'react/jsx-no-undef': 'off',
    },
  }
]

export default eslintConfig
