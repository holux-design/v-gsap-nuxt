import Draggable from 'gsap/Draggable'
import TextPlugin from 'gsap/TextPlugin'
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, TextPlugin)

export const useGSAP = () => {
  return gsap
}
