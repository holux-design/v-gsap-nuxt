export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],

  modules: [],
  devtools: { enabled: true },
  compatibilityDate: '2024-10-24',

  nitro: {
    preset: 'vercel',
    output: {
      dir: '../.vercel/output',
    },
  },
})
