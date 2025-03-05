<template>
  <Transition
    ref="slotRef"
    :duration="duration * 1000"
    :appear="appear"
    :ease="ease"
    @leave="onLeave"
    @enter="onEnter"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { useGSAP } from '../plugin'

const props = withDefaults(
  defineProps<{
    hidden?: any
    duration?: number // seconds
    appear?: boolean
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

const onEnter = (element: Element, done: () => void) => {
  useGSAP().from(element, {
    ...hidden.value,
    duration: props.duration,
    onComplete: done,
  })
}

const onLeave = (element: Element, done: () => void) => {
  useGSAP().to(element, {
    ...hidden.value,
    duration: props.duration,
    onComplete: done,
  })
}
</script>
