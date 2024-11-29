/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  safelist: ['dark'],
  // SHADCN :: END
  prefix: '',
  mode: 'jit',
  content: [
    'components/**/*.{html,js,vue}',
    'pages/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
