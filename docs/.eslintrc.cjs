module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  ignorePatterns: [
    'dist',
    'node_modules',
    '.output',
    '.nuxt',
  ],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'no-unsafe-optional-chaining': 'off',
  },
}
