<template>
  <component
    :is="group ? TransitionGroup : Transition"
    ref="slotRef"
    :duration="duration * 1000"
    :appear="appear"
    @leave="onLeave"
    @enter="onEnter"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { Transition, TransitionGroup } from 'vue'
import { useGSAP } from '../plugin'
import { computed } from '#imports'

type El = Element & { dataset: { index: number } }

const props = withDefaults(
  defineProps<{
    hidden?: any
    duration?: number // seconds
    stagger?: number // seconds
    delay?: number // seconds
    appear?: boolean
    group?: boolean
    ease?: string
  }>(),
  {
    duration: 0.5,
    appear: false,
    ease: 'power1.inOut',
  },
)

const hidden = computed(() => ({
  opacity: 0,
  ease: props.ease,
  ...props.hidden,
}))

const slotRef = ref()

onMounted(() => {
  if (props.appear) useGSAP().set(slotRef.value, hidden.value)
})

const onEnter = (element: El, done: () => void) => {
  useGSAP().from(element, {
    ...hidden.value,
    delay: (props.delay || 0) + element.dataset.index * (props.stagger || 0),
    duration: props.duration,
    onComplete: done,
  })
}

const onLeave = (element: El, done: () => void) => {
  useGSAP().to(element, {
    ...hidden.value,
    delay: (props.delay || 0) + element.dataset.index * (props.stagger || 0),
    duration: props.duration,
    onComplete: done,
  })
}
</script>
