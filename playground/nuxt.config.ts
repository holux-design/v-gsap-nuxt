export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-28',

  vgsap: {
    presets: [{
      name: 'spin',
      modifiers: 'infinitely.to',
      value: { rotate: '90deg', ease: 'linear' },
    }],
  },
})