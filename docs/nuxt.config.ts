export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],

  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  compatibilityDate: '2024-10-24',

  css: [
    '~/assets/css/terminal.css',
    '~/assets/css/shiki.css',
  ],

  nitro: {
    preset: 'vercel',
    output: {
      dir: '../.vercel/output',
    },
  },

  vgsap: {
    presets: [
      {
        name: 'rotate',
        modifiers: 'inifinitely.to',
        value: {
          rotate: '360deg',
          ease: 'linear',
          duration: 10,
        },
      },
    ],
  },
})
