import gsap from 'gsap'
import { vGsapDirective } from './plugin'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  let resizeListener

  nuxtApp.vueApp.directive(
    'gsap',
    vGsapDirective(
      'nuxt',
      useRuntimeConfig().public.vgsap ?? {},
      null,
      resizeListener,
    ),
  )
})
