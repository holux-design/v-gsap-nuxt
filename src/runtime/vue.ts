import gsap from 'gsap'
import {
  vGsapDirective,
  useGSAP,
  useScrollTrigger,
  useGlobalTimelines,
} from './plugin'

export const vGsapVue = (configOptions?) => {
  return vGsapDirective(
    'vue',
    configOptions || {},
    gsap.context(() => {}),
    null,
  )
}

// Export composables for Vue-only usage
export { useGSAP, useScrollTrigger, useGlobalTimelines }
