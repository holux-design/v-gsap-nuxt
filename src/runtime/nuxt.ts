import { vGsapDirective } from './plugin'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import gsap from 'gsap'

export default defineNuxtPlugin(nuxtApp => {
  let resizeListener

  nuxtApp.vueApp.directive(
    'gsap',
    vGsapDirective(
      'nuxt',
      useRuntimeConfig().public.vgsap,
      gsap.context(() => {}),
      resizeListener,
    ),
  )
})
