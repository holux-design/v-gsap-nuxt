import gsap from 'gsap'
import { vGsapDirective } from './plugin'

export const vGsapVue = (configOptions?) => {
  return vGsapDirective(
    'vue',
    configOptions || {},
    gsap.context(() => {}),
    null,
  )
}
