import Draggable from 'gsap/Draggable'
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import { uuidv4 } from './utils/utils'
import { entrancePresets } from './utils/entrance-presets'
import type { Preset } from './types/Preset'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, TextPlugin)

type ANIMATION_TYPES = 'from' | 'to' | 'set' | 'fromTo' | 'call'

type TIMELINE_OPTIONS = {
  scrollTrigger?: {
    trigger?: string | HTMLElement
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
    toggleActions?: string
    pin?: boolean
    pinSpacing?: string
    onUpdate?: any
    onEnter?: any
    onEnterBack?: any
    onLeave?: any
    onLeaveBack?: any
    scroller?: any
  }
  repeat?: number
}

const globalTimelines = {}

export const vGsapDirective = (
  appType: 'nuxt' | 'vue',
  configOptions,
  gsapContext,
  resizeListener,
) => ({
  getSSRProps: binding => {
    binding = loadPreset(binding, configOptions)

    return {
      style: {
        opacity: binding.modifiers.fromInvisible ? '0' : '1',
      },
      'data-gsap-id': uuidv4(),
    }
  },

  beforeMount(el, binding, vnode) {
    if (appType == 'vue') el.dataset.gsapId = uuidv4()

    binding = loadPreset(binding, configOptions)

    // .timeline => Prepare before children get mounted
    // Add data-gsap-order to children for animation steps (otherwise children get mounted first and then bottom-up)
    if (binding.modifiers.timeline) {
      if (!timelineShouldBeActive(binding, configOptions)) return
      assignChildrenOrderAttributesFor(vnode)

      globalTimelines[el.dataset.gsapId] = prepareTimeline(
        el,
        binding,
        configOptions,
      )
      el.dataset.gsapTimeline = true

      gsapContext.add(() => globalTimelines[el.dataset.gsapId])
    }
  },

  mounted(el, binding) {
    let timeline

    // Refresh scrollTrigger from .timeline after all has mounted
    if (binding.modifiers.timeline) {
      globalTimelines[el.dataset.gsapId]?.scrollTrigger?.refresh()
      ScrollTrigger?.normalizeScroll(true)
    } else {
      // All directives that are not .timeline

      if (binding.modifiers.magnetic) return addMagneticEffect(el, binding)

      if (timelineShouldBeActive(binding, configOptions))
        timeline = prepareTimeline(el, binding, configOptions)

      if (binding.modifiers.add) {
        let order =
          getValueFromModifier(binding, 'order-') ||
          getValueFromModifier(binding, 'suggestedOrder-')
        if (binding.modifiers.withPrevious) order = '<'

        if (!el.closest(`[data-gsap-timeline="true"]`)?.dataset?.gsapId) return
        globalTimelines[
          el.closest(`[data-gsap-timeline="true"]`).dataset.gsapId
        ]?.add(timeline, order)
      }
    }

    gsapContext.add(() => timeline)
    resizeListener = window.addEventListener('resize', () => {
      if (!timelineShouldBeActive(binding, configOptions) && !!timeline)
        timeline = resetAndKillTimeline(timeline)
      if (timelineShouldBeActive(binding, configOptions) && !timeline)
        timeline = prepareTimeline(el, binding, configOptions)
    })
  },

  unmounted() {
    gsapContext.revert()
    removeEventListener('resize', resizeListener)
  },
})

function timelineShouldBeActive(binding, configOptions) {
  const breakpoint: number = configOptions?.breakpoint || 768

  if (binding.modifiers.desktop && window.innerWidth <= breakpoint) return false
  if (binding.modifiers.mobile && window.innerWidth > breakpoint) return false

  return true
}

function assignChildrenOrderAttributesFor(vnode, startOrder?): number {
  let order = startOrder || 0

  const getChildren = vnode => {
    if (vnode?.children) return Array.from(vnode?.children)
    if (vnode?.component?.subtree) return Array.from(vnode?.ctx?.subtree)
    return []
  }

  ;(getChildren(vnode) || [])?.forEach((child: any) => {
    ;(child?.dirs ? Array.from(child?.dirs) : [])?.forEach((dir: any) => {
      if (dir.modifiers.timeline) return

      dir.modifiers[`suggestedOrder-${order}`] = true
      order++
    })
    order = assignChildrenOrderAttributesFor(child, order)
  })
  return order
}

function prepareTimeline(el, binding, configOptions) {
  const timelineOptions: TIMELINE_OPTIONS = {}

  const callbacks = prepareCallbacks(binding)

  // Prepare ScrollTrigger if .whenVisible. modifier is present
  // You can overwrite scrollTrigger Props in the value of the directive
  // .once.
  const once = binding.modifiers.call ?? binding.modifiers.once
  const scroller =
    configOptions?.scroller ||
    binding.value?.scroller ||
    binding.value?.[0]?.scroller ||
    binding.value?.[1]?.scroller ||
    undefined
  const scrub =
    binding.value?.scrub ??
    binding.value?.[1]?.scrub ??
    (once == true ? false : undefined) ??
    true
  const markers = binding.modifiers.markers
  if (binding.modifiers.whenVisible) {
    timelineOptions.scrollTrigger = {
      trigger: el,
      start: binding.value?.start ?? 'top 90%',
      end: binding.value?.end ?? 'top 50%',
      scroller,
      scrub,
      ...callbacks,
      markers,
      toggleActions: once ? 'play none none reverse' : undefined,
    }
  }

  if (binding.modifiers.pinned) {
    const end = binding.value?.end ?? '+=1000px'
    timelineOptions.scrollTrigger = {
      trigger: el,
      start: binding.value?.start ?? 'center center',
      end,
      scroller,
      scrub,
      pin: true,
      pinSpacing: 'margin',
      ...callbacks,
      markers,
    }
  }

  if (binding.modifiers.parallax) {
    timelineOptions.scrollTrigger = {
      trigger: el,
      start: `top bottom`,
      end: `bottom top`,
      scroller,
      scrub: true,
      ...callbacks,
      markers,
    }
  }

  if (!once && binding.modifiers.parallax)
    timelineOptions.scrollTrigger!.toggleActions = 'restart none none reverse'

  // .infinitely.
  if (binding.modifiers.infinitely) timelineOptions.repeat = -1

  // Set up actual timeline
  const timeline = gsap.timeline(timelineOptions)

  if (binding.modifiers.parallax) {
    const [parallaxType, parallaxFactor] = Object.keys(binding.modifiers)!
      .find(m => m.includes('slower') || m.includes('faster'))
      ?.split('-')!
    const direction = parallaxType == 'slower' ? -1 : 1
    timeline.fromTo(
      el,
      { yPercent: +`${10 * +(parallaxFactor || 5) * direction}` },
      {
        yPercent: +`${10 * +(parallaxFactor || 5) * direction * -1}`,
        ease: 'linear',
      },
    )
    // timeline.to(el, { yPercent: +`${10 * +(parallaxFactor || 5) * direction * -1}` })
  }

  // .delay-<milliseconds>. modifier
  const delayKey = Object.keys(binding.modifiers).find(modifier =>
    modifier.includes('delay'),
  )
  if (delayKey) {
    const milliseconds = delayKey.split('-')?.[1] || 500
    timeline.to('body', { duration: +milliseconds / 1000 })
  }

  // Prepare stagger if .stagger. is present
  // Value defaults to 0.2, but can be set in the values
  // .stagger.
  const stagger = binding.modifiers.stagger
    ? binding.value?.stagger ?? binding.value?.[1]?.stagger ?? '0.2'
    : false
  if (binding.modifiers.stagger) el = el.children

  // Setup actual animation step // Respects stagger if set
  const animationType: ANIMATION_TYPES = Object.keys(binding.modifiers).find(
    modifier => ['to', 'from', 'set', 'fromTo', 'call'].includes(modifier),
  ) as ANIMATION_TYPES
  if (animationType == 'to') {
    if (binding.modifiers.fromInvisible)
      binding.value.opacity = binding.value.opacity || 1
    timeline.to(el, { ...binding.value, stagger })
  }
  if (animationType == 'set') timeline.set(el, { ...binding.value, stagger })
  if (animationType == 'from') {
    timeline.from(el, { ...binding.value, stagger })
    if (binding.modifiers.fromInvisible) timeline.to(el, { opacity: 1 }, '<')
  }

  // .fromTo=
  if (animationType == 'fromTo') {
    const values = binding.value
    if (binding.modifiers.stagger) values[1].stagger = stagger
    if (binding.modifiers.fromInvisible)
      values[1].opacity = values[1].opacity || 1
    timeline.fromTo(el, binding.value?.[0], binding.value?.[1])
  }

  // .animateText. // .slow // .fast
  if (binding.modifiers.animateText) {
    // if text is inside element => use it as value and then empty it for animation
    const value = binding.value || el.textContent
    if (el.textContent) el.textContent = ''

    const speeds = {
      slow: 0.5,
      fast: 10,
    }
    const speed =
      speeds[
        Object.keys(binding.modifiers).find(modifier =>
          Object.keys(speeds).includes(modifier),
        ) || ''
      ] || 2
    timeline.to(el, { text: { value, speed } })
  }

  // .whileHover.
  if (binding.modifiers.whileHover) {
    timeline.pause()
    el.addEventListener('mouseenter', () => timeline.play())
    el.addEventListener('mouseout', () => {
      if (binding.modifiers.noReverse) timeline.time(0).pause()
      else timeline.play().reverse()
    })
  }

  // .call=""
  if (animationType == 'call') {
    timeline.call(binding.value)
  }

  // .draggable. // .x // .y // .rotation // .bounds (="")
  if (binding.modifiers.draggable) {
    const type = Object.keys(binding.modifiers).find(modifier =>
      ['x', 'y', 'rotation'].includes(modifier),
    ) as Draggable.DraggableType
    Draggable.create(el, {
      type,
      bounds: binding.value || el.parentElement,
    })
  }

  return timeline
}

type CALLBACKS = {
  onUpdate?: any
  onEnter?: any
  onEnterBack?: any
  onLeave?: any
  onLeaveBack?: any
}

function prepareCallbacks(binding): CALLBACKS {
  const callbacks: CALLBACKS = {}

  if (binding.modifiers.onUpdate) callbacks.onUpdate = binding.value
  if (binding.modifiers.onEnter) callbacks.onEnter = binding.value
  if (binding.modifiers.onEnterBack) callbacks.onEnterBack = binding.value
  if (binding.modifiers.onLeave) callbacks.onLeave = binding.value
  if (binding.modifiers.onLeaveBack) callbacks.onLeaveBack = binding.value

  return callbacks
}

function addMagneticEffect(el, binding) {
  const strengthModifiers = {
    strong: 2,
    stronger: 1.5,
    weaker: 0.75,
    weak: 0.5,
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (el) {
      const { width, height, left, top } = el.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      let strengthFactor =
        Object.entries(strengthModifiers).find(
          entry => binding.modifiers[entry[0]],
        )?.[1] || 1

      const direction = binding.modifiers.refuse ? -1 : 1
      if (binding.modifiers.refuse) strengthFactor = 4

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const magneticDistance = ((width + height) / 2) * (strengthFactor / 1.5) // Distance for magnetic attraction
      const attractionStrength = 0.45 * strengthFactor // Magnetic strength

      if (distance < magneticDistance) {
        const strength = 1 - distance / magneticDistance
        gsap.to(el, {
          x: deltaX * strength * attractionStrength * direction,
          y: deltaY * strength * attractionStrength * direction,
          duration: 0.2,
        })
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
        })
      }
    }
  }

  window.addEventListener('mousemove', handleMouseMove)
}

function loadPreset(binding, configOptions) {
  const applyPreset = (preset: Preset, binding) => {
    preset.modifiers
      .split('.')
      .forEach(modifier => (binding.modifiers[modifier] = true))
    if (preset.value) binding.value = preset.value
  }

  // Load Preset if .preset. modifier is set
  if (binding.modifiers.preset && !!configOptions?.presets?.length) {
    const preset: Preset = configOptions?.presets.find(
      preset => preset.name == binding.value,
    )
    if (preset) applyPreset(preset, binding)
  }

  // Load .entrance. presets
  if (binding.modifiers.entrance) {
    const preset = entrancePresets.filter((preset: Preset) =>
      Object.keys(binding.modifiers).includes(preset.name),
    )?.[0]
    if (preset) applyPreset(preset, binding)
  }
  return binding
}

function resetAndKillTimeline(timeline) {
  timeline?.restart(false, true)
  timeline?.kill()
  return undefined
}

function getValueFromModifier(binding, term: string) {
  return Object.keys(binding.modifiers)
    ?.find(m => m.toLowerCase().includes(term.toLowerCase()))
    ?.split('-')?.[1]
}
