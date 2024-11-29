// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: ['./playground'],
  },
}).append({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'no-unsafe-optional-chaining': 'off',
    'vue/multi-word-component-names': 'off',
    '@stylistic/no-tabs': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
})
