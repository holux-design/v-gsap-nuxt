import Draggable from 'gsap/Draggable'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import { gsap } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'
import { nextTick } from 'vue'
import { uuidv4 } from './utils/utils'
import { entrancePresets } from './utils/entrance-presets'
import type { Preset } from './types/Preset'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, TextPlugin, SplitText)

type ANIMATION_TYPES = 'from' | 'to' | 'set' | 'fromTo' | 'call'

type TIMELINE_OPTIONS = {
  scrollTrigger?: {
    trigger?: string | HTMLElement
    id?: string
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
  getSSRProps: (binding) => {
    binding = loadPreset(binding, configOptions)
    const m = binding.modifiers
    const v = binding.value
    const fromValue = m.fromTo ? v?.[0] : v
    const fromOpacityZero
      = (m.from || m.fromTo)
      && fromValue && typeof fromValue === 'object'
      && fromValue.opacity === 0

    return {
      'data-vgsap-from-invisible': m.fromInvisible || fromOpacityZero || undefined,
      'data-vgsap-stagger': m.stagger,
      'data-vgsap-mask': m.mask,
    }
  },

  async beforeMount(el, binding, vnode) {
    binding = loadPreset(binding, configOptions)

    // Store gsapId on the element object (not as data attribute yet to avoid hydration mismatch)
    const gsapId = uuidv4()
    el._gsapId = gsapId

    if (!gsapContext) gsapContext = gsap.context(() => {})

    if (binding.modifiers.timeline) {
      // Lets child .add directives find this element without a DOM attribute (see findParentTimelineElement)
      el._gsapTimeline = true
      assignChildrenOrderAttributesFor(vnode)

      // A SplitText timeline needs the hydrated DOM and loaded fonts, so it is created in mounted.
      // Children wait for it there instead of being added to a timeline that would be thrown away.
      if (binding.modifiers.splitText) return

      await nextTick()

      const timeline = prepareTimeline(el, binding, configOptions)
      globalTimelines[gsapId] = timeline

      gsapContext.add(() => globalTimelines[gsapId])
    }
  },

  async mounted(el, binding) {
    // Wait for hydration to complete before any GSAP manipulation
    // This prevents hydration mismatch warnings in Nuxt
    await nextTick()

    // Use requestAnimationFrame to ensure we're after hydration
    await new Promise(resolve => requestAnimationFrame(resolve))

    // DON'T add data-gsap-id or data-gsap-timeline to DOM to avoid hydration mismatch
    // These are only stored as internal properties (el._gsapId)
    // Only data-vgsap-* from SSR are kept

    let timeline
    const mm = gsap.matchMedia()

    // Refresh scrollTrigger from .timeline after all has mounted
    if (binding.modifiers.timeline) {
      // DON'T set el.dataset.gsapTimeline - causes hydration mismatch

      // A timeline element that uses SplitText is only created now (skipped in beforeMount)
      if (binding.modifiers.splitText && !globalTimelines[el._gsapId]) {
        await waitForFonts(binding)
        if (!el.isConnected) return

        globalTimelines[el._gsapId] = prepareTimeline(el, binding, configOptions)
        gsapContext.add(() => globalTimelines[el._gsapId])
        releaseSSRHider(el, binding, globalTimelines[el._gsapId])
      }

      // Wait for next tick to ensure all child .add directives have been added
      await nextTick()

      globalTimelines[el._gsapId]?.scrollTrigger?.refresh()
      ScrollTrigger?.normalizeScroll(true)
    }
    else {
      // All directives that are not .timeline

      if (binding.modifiers.magnetic) return addMagneticEffect(el, binding)

      // Wait for next tick and for fonts before DOM manipulation for splitText
      if (binding.modifiers.splitText) {
        await nextTick()
        await waitForFonts(binding)
        if (!el.isConnected) return
      }

      const breakpoint = configOptions?.breakpoint || 768
      if (binding.modifiers.desktop) {
        mm.add(`(min-width: ${breakpoint}px)`, () => {
          timeline = prepareTimeline(el, binding, configOptions)
        })
      }
      else if (binding.modifiers.mobile) {
        mm.add(`(max-width: ${breakpoint}px)`, () => {
          timeline = prepareTimeline(el, binding, configOptions)
        })
      }
      else {
        timeline = prepareTimeline(el, binding, configOptions)
      }

      releaseSSRHider(el, binding, timeline)

      if (binding.modifiers.add) {
        // Hold the start state until the parent timeline takes over, otherwise the child plays on its own while waiting
        timeline?.pause()

        // Use nextTick to ensure all parent components have completed their beforeMount phase
        nextTick(() => {
          // .desktop / .mobile outside of their breakpoint: nothing to add
          if (!timeline) return

          let order
            = getValueFromModifier(binding, 'order-')
            || getValueFromModifier(binding, 'suggestedOrder-')
          if (binding.modifiers.withPrevious) order = '<'

          const parentTimelineElement = findParentTimelineElement(el)
          // No .timeline ancestor: play on its own
          if (!parentTimelineElement) {
            timeline.play()
            return
          }

          // Use a retry mechanism to ensure parent timeline is ready
          // (a .timeline.splitText parent only creates it after fonts have loaded)
          const addToParentTimeline = () => {
            const parentTimeline = globalTimelines[parentTimelineElement._gsapId]
            if (!parentTimeline) {
              // Parent timeline not ready yet, retry after a short delay
              if (el.isConnected) setTimeout(addToParentTimeline, 10)
              return
            }
            // Unpause before adding: unpausing afterwards would move the child's start time to the parent's current time
            parentTimeline.add(timeline.paused(false), order)
          }
          addToParentTimeline()
        })
        return // Exit early to avoid creating standalone timeline
      }
    }

    gsapContext.add(() => timeline)
    resizeListener = window.addEventListener('resize', () => {
      ScrollTrigger?.refresh(true)
    })
  },

  unmounted(el) {
    const gsapId = el._gsapId || el.dataset.gsapId
    if (gsapId) {
      ScrollTrigger.getById(gsapId)?.kill()
      globalTimelines[gsapId]?.scrollTrigger?.kill()
      Reflect.deleteProperty(globalTimelines, gsapId)
    }

    // Clean up SplitText if it exists
    if (el._splitText) {
      el._splitText.revert()
      delete el._splitText
    }

    gsapContext.revert() // remove gsap timeline
    removeEventListener('resize', resizeListener) // remove resizeListener
    // Observers and listeners live on the element: with a shared instance only the last one created was ever cleaned up
    el._vgsapStateObserver?.disconnect() // Disconnect onState observer (if initialized)
    el._vgsapMagneticCleanup?.() // Disconnect magnetic observer and mousemove listener (if initialized)
  },
})

// Timelines are tracked on the element object (el._gsapTimeline / el._gsapId), not on data attributes,
// to avoid hydration mismatches. Walk up the DOM to find the closest .timeline element.
function findParentTimelineElement(el) {
  let parent = el.parentElement
  while (parent && !parent._gsapTimeline) parent = parent.parentElement
  return parent
}

// Splitting while web fonts are still loading measures the fallback font (wrong line breaks) and makes
// SplitText warn "SplitText called before fonts loaded". Wait for them unless splitText.waitForFonts is false.
async function waitForFonts(binding) {
  if (binding.value?.splitText?.waitForFonts === false) return
  const fonts = typeof document !== 'undefined' ? document.fonts : undefined
  if (!fonts || fonts.status === 'loaded') return
  await fonts.ready
}

// The SSR hider (data-vgsap-from-invisible, see getSSRProps) only has to last until GSAP has applied the start state.
// .from / .fromTo render it right away on their targets, so the hider can go. With SplitText it has to go: the
// targets are the split fragments, so the element itself would stay at opacity 0 forever.
// A plain .to keeps it, because the tween reads its starting opacity from the computed style.
function releaseSSRHider(el, binding, timeline) {
  if (timeline && binding.modifiers.to && !binding.modifiers.splitText) return
  el.removeAttribute('data-vgsap-from-invisible')
}

function assignChildrenOrderAttributesFor(vnode, startOrder?): number {
  let order = startOrder || 0

  const getChildren = (vnode) => {
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

function prepareSplitText(el, binding) {
  if (binding.modifiers.splitText) {
    // Determine the split type based on modifiers (only one type supported)
    let splitType = 'chars'

    if (binding.modifiers.lines) {
      splitType = 'lines'
    }
    else if (binding.modifiers.words) {
      splitType = 'words'
    }
    // chars is default, no need to check

    // Additional options for SplitText
    const splitOptions: any = {
      type: splitType,
      ...binding.value?.splitText || {},
    }

    // Options handled by the directive, not by SplitText: passing onSplit through would make
    // SplitText call it a second time, with the instance instead of { el, split }
    const onSplitCb = splitOptions.onSplit
    const maskPadding = typeof splitOptions.maskPadding === 'number'
      ? `${splitOptions.maskPadding}px`
      : splitOptions.maskPadding
    delete splitOptions.onSplit
    delete splitOptions.maskPadding
    delete splitOptions.waitForFonts

    // Add mask support if specified in modifiers
    if (binding.modifiers.mask) {
      // Determine mask type based on split type
      if (binding.modifiers.lines) {
        splitOptions.mask = 'lines'
      }
      else if (binding.modifiers.words) {
        splitOptions.mask = 'words'
      }
      else {
        splitOptions.mask = 'chars' // Default
      }
    }

    // Fonts are already loaded here (see waitForFonts), so a single split has the final measurements
    const instance = new SplitText(el, splitOptions)
    el._splitText = instance

    if (instance.masks?.length) fitMasksToGlyphs(instance.masks, maskPadding)

    // Fire user callback if provided
    if (typeof onSplitCb === 'function') {
      try {
        onSplitCb({ el, split: instance })
      }
      catch (e) {
        /* noop */
      }
    }
    // Also dispatch a DOM event so users can listen without code changes
    try {
      el.dispatchEvent(new CustomEvent('vgsap:split', { detail: { el, split: instance } }))
    }
    catch (e) { /* noop */ }

    return instance
  }
}

// A mask is as tall as the line-height, so with a tight one (e.g. leading-none on a title) it clips descenders
// (g, j, p, q, y, Q). Forcing line-height: normal on the mask avoids the clipping but makes the text taller.
// Instead the split element gets line-height: normal, so its box contains the glyphs and y: '100%' moves them
// completely out of the mask, and clip-path extends the visible area of the mask to that box.
// The split element is an inline-block (lines too) with negative margins, so its margin box stays within the
// line box of the mask: the mask keeps exactly the original line-height whatever the font metrics rounding,
// and the glyphs do not move since inline-blocks are aligned on their baseline.
// Values are in em, so they follow responsive font sizes.
function fitMasksToGlyphs(masks: HTMLElement[], maskPadding?: string) {
  const items = masks
    .map((mask) => {
      const split = mask.firstElementChild as HTMLElement | null
      if (!split) return null
      const style = getComputedStyle(split)
      return { mask, split, lineHeight: Number.parseFloat(style.lineHeight), fontSize: Number.parseFloat(style.fontSize) }
    })
    .filter(item => item && item.fontSize > 0) as { mask: HTMLElement, split: HTMLElement, lineHeight: number, fontSize: number }[]

  // Write all, then read all, to measure with a single layout
  items.forEach(item => (item.split.style.lineHeight = 'normal'))
  const glyphHeights = items.map(item => item.split.getBoundingClientRect().height)

  items.forEach((item, i) => {
    // How far the glyphs extend above and below the line-height ("normal" line-height: NaN, nothing to fix)
    const overflow = (glyphHeights[i] - item.lineHeight) / 2 / item.fontSize
    if (!(overflow > 0)) {
      item.split.style.lineHeight = ''
      if (!maskPadding) return
    }
    const extend = overflow > 0 ? `-${+overflow.toFixed(4)}em` : '0px'

    if (overflow > 0) {
      // 1px more than needed: the margin box only has to fit in the line box, it does not position the glyphs
      item.split.style.marginTop = `calc(${extend} - 1px)`
      item.split.style.marginBottom = `calc(${extend} - 1px)`
      if (getComputedStyle(item.split).display === 'block') {
        item.split.style.display = 'inline-block'
        item.split.style.width = '100%'
      }
    }

    const bottom = maskPadding ? `calc(${extend} - ${maskPadding})` : extend
    item.mask.style.overflow = 'visible'
    item.mask.style.clipPath = `inset(${extend} 0 ${bottom} 0)`
  })
}

function prepareTimeline(el, binding, configOptions) {
  const timelineOptions: TIMELINE_OPTIONS = {}

  // Prepare SplitText if needed before creating the timeline
  // Only called from mounted for SplitText elements, so the DOM is already hydrated
  if (binding.modifiers.splitText && !el._splitText) {
    prepareSplitText(el, binding)
  }

  const callbacks = prepareCallbacks(binding)

  // Prepare ScrollTrigger if .whenVisible. modifier is present
  // You can overwrite scrollTrigger Props in the value of the directive
  // .once.
  const once = binding.modifiers.call ?? binding.modifiers.once
  const scroller
    = configOptions?.scroller
    || binding.value?.scroller
    || binding.value?.[0]?.scroller
    || binding.value?.[1]?.scroller
    || undefined
  const scrub
    = binding.value?.scrub
    ?? binding.value?.[1]?.scrub
    ?? (once == true ? false : undefined)
    ?? true
  const markers = binding.modifiers.markers
  const gsapId = el._gsapId || el.dataset.gsapId

  if (binding.modifiers.whenVisible) {
    timelineOptions.scrollTrigger = {
      trigger: el,
      id: gsapId,
      start: binding.value?.start ?? 'top 90%',
      end: binding.value?.end ?? 'top 50%',
      scroller,
      scrub,
      ...callbacks,
      markers,
      toggleActions: binding.modifiers.once
        ? binding.modifiers.reversible
          ? 'play none none reverse'
          : 'play none none none'
        : undefined,
    }
  }

  if (binding.modifiers.pinned) {
    const end = binding.value?.end ?? '+=1000px'
    timelineOptions.scrollTrigger = {
      trigger: el,
      id: gsapId,
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
      id: gsapId,
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

  // Prepare stagger if .stagger. is present OR if splitText is used with stagger value
  // Value defaults to 0.2, but can be set in the values
  // .stagger.
  let stagger = false
  if (binding.modifiers.stagger) {
    stagger = binding.value?.stagger ?? binding.value?.[1]?.stagger ?? '0.2'
  }
  else if (binding.modifiers.splitText) {
    // For SplitText, automatically use default stagger if not explicitly set to false or 0
    if (binding.value?.stagger !== false && binding.value?.stagger !== 0) {
      stagger = binding.value?.stagger ?? 0.1 // Default stagger for splitText
    }
  }
  // Handle SplitText targets
  let animationTarget = el
  if (binding.modifiers.splitText && el._splitText) {
    // Determine which target to use based on modifiers
    // With or without mask, we always animate the text elements, not the masks
    if (binding.modifiers.lines) {
      animationTarget = el._splitText.lines
    }
    else if (binding.modifiers.words) {
      animationTarget = el._splitText.words
    }
    else {
      animationTarget = el._splitText.chars // Default
    }
  }
  else if (binding.modifiers.stagger) {
    // Only if NOT splitText, use children for stagger
    animationTarget = el.children
  }

  // Remove scrollTrigger attributes from binding.value to prevent console.warings "Invalid property ... Missing plugin?"
  delete binding.value?.start
  delete binding.value?.end
  delete binding.value?.scrub
  delete binding.value?.scroller
  delete binding.value?.markers
  delete binding.value?.toggleActions

  // Remove SplitText configuration from binding.value to prevent passing it to GSAP animations
  delete binding.value?.splitText

  // Setup actual animation step // Respects stagger if set
  const animationType: ANIMATION_TYPES = Object.keys(binding.modifiers).find(
    modifier => ['to', 'from', 'set', 'fromTo', 'call'].includes(modifier),
  ) as ANIMATION_TYPES
  if (animationType == 'to') {
    if (binding.modifiers.fromInvisible)
      binding.value.opacity = binding.value.opacity || 1
    const toProps = { ...binding.value }
    if (stagger !== false) toProps.stagger = stagger
    timeline.to(animationTarget, toProps)
  }
  if (animationType == 'set') {
    const setProps = { ...binding.value }
    if (stagger !== false) setProps.stagger = stagger
    timeline.set(animationTarget, setProps)
  }
  if (animationType == 'from') {
    const fromProps = {
      ...binding.value,
      opacity:
        binding.value.opacity ?? (binding.modifiers.fromInvisible ? 0 : 1),
      duration: binding.value.duration || 0.5,
    }
    if (stagger !== false) fromProps.stagger = stagger
    timeline.from(animationTarget, fromProps)

    // gsap.from() infers the to-state from current computed style — when
    // the SSR hider in vgsap.css pins opacity:0 the tween runs 0->0. Force
    // opacity:1 explicitly whenever the from-state is 0.
    if (binding.modifiers.fromInvisible || fromProps.opacity === 0) {
      const toProps: any = { opacity: 1, duration: binding.value.duration || 0.5 }
      if (stagger !== false) toProps.stagger = stagger
      timeline.to(animationTarget, toProps, '<')
    }
  }

  // .fromTo=
  if (animationType == 'fromTo') {
    const values = binding.value
    if (stagger !== false) values[1].stagger = stagger
    if (binding.modifiers.fromInvisible) {
      values[0].opacity = 0
      values[1].opacity = values[1].opacity || 1
    }
    timeline.fromTo(animationTarget, binding.value?.[0], binding.value?.[1])
  }

  // .animateText. // .slow // .fast
  if (binding.modifiers.animateText) {
    // if text is inside element => use it as value and then empty it for animation
    const value
      = typeof binding.value === 'string'
        ? binding.value
        : binding.value?.text || el.textContent
    if (el.textContent) el.textContent = ''

    const speeds = {
      slow: 0.5,
      fast: 10,
    }
    const speed
      = speeds[
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

  if (getValueFromModifier(binding, 'onState')) {
    const [dataKey, targetValue = 'true']: (string | boolean | number)[]
      = Object.keys(binding.modifiers)
        .find(m => m.toLowerCase().includes('onstate'))
        ?.split('-')
        ?.slice(1)!

    const targetElement = binding.modifiers.inherit
      ? (el?.[0] || el).closest(`*[data-${dataKey}]`)
      : el?.[0] || el

    const getCurrentValue = () => targetElement.dataset[dataKey]

    if (getCurrentValue() != targetValue) timeline.pause()

    // One observer per element, so unmounting one element does not disconnect another one's
    el._vgsapStateObserver?.disconnect()
    el._vgsapStateObserver = new MutationObserver((mutationRecords) => {
      const event = mutationRecords.filter(
        record => record.attributeName == `data-${dataKey}`,
      )?.[0]
      if (!event) return

      if (getCurrentValue() == targetValue) return timeline.play()
      else return timeline.play().reverse()
    })
    el._vgsapStateObserver.observe(targetElement, { attributes: true })
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
      const { width, height, left, right, top, bottom }
        = el.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distanceX
        = left < e.clientX && right > e.clientX
          ? 0
          : Math.min(Math.abs(e.clientX - left), Math.abs(e.clientX - right)) // Horizontal distance between mouse and el
      const distanceY
        = top < e.clientY && bottom > e.clientY
          ? 0
          : Math.min(Math.abs(e.clientY - top), Math.abs(e.clientY - bottom)) // Vertical distance between mouse and el

      const strengthFactor
        = Object.entries(strengthModifiers).find(
          entry => binding.modifiers[entry[0]],
        )?.[1] || 1

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2) // Distance between mouse and el
      const centerDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2) // Distance between mouse and el's center

      const magneticDistanceX = width / 3 // Horizontal distance for magnetic attraction
      const magneticDistanceY = height / 3 // Vertical distance for magnetic attraction
      const attractionStrength = 0.45 * strengthFactor // Magnetic strength

      if (distance < magneticDistanceX && distance < magneticDistanceY) {
        const strength
          = Math.abs(1 - centerDistance / 4)
          / ((magneticDistanceX + magneticDistanceY) / 2)
        gsap.to(el, {
          x: deltaX * strength * attractionStrength,
          y: deltaY * strength * attractionStrength,
          duration: 0.2,
        })
      }
      else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
        })
      }
    }
  }

  // One observer and listener per element: a shared observer was replaced by every new magnetic element,
  // so after a route change the wrong one got disconnected and the mousemove listeners were never removed
  const magneticObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener('mousemove', handleMouseMove)
      }
      else {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    })
  })

  magneticObserver.observe(el)

  el._vgsapMagneticCleanup = () => {
    magneticObserver.disconnect()
    window.removeEventListener('mousemove', handleMouseMove)
  }
}

function loadPreset(binding, configOptions) {
  const applyPreset = (preset: Preset, binding) => {
    preset.modifiers
      .split('.')
      .forEach(modifier => (binding.modifiers[modifier] = true))
    if (typeof binding.value == 'string') binding.value = {}
    if (preset.value) {
      if (binding.modifiers.fromTo) {
        binding.value = [
          preset.value[0],
          { ...(preset.value[1] as object), ...binding.value },
        ]
      }
      else binding.value = { ...(preset.value as object), ...binding.value }
    }
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

export const useGSAP = (): typeof gsap => {
  return gsap
}
