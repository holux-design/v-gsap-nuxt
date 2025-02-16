<template>
  <Transition
    ref="slotRef"
    :duration="duration * 1000"
    :appear="appear"
    @leave="el => onLeave(el)"
    @enter="el => onEnter(el)"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { useGSAP } from '../plugin'

const props = withDefaults(
  defineProps<{
    hidden?: GSAPTweenVars
    visible?: GSAPTweenVars
    duration?: number // seconds
    appear?: boolean
  }>(),
  {
    duration: 0.5,
    appear: false,
  },
)

const hidden = computed(() => ({
  opacity: 0,
  ...props.hidden,
}))
const visible = computed(() => ({
  opacity: 1,
  ...props.visible,
}))

const slotRef = ref()

onMounted(() => {
  if (props.appear) useGSAP().set(slotRef.value, hidden.value)
})

const onEnter = (element: Element) => {
  useGSAP().fromTo(element, hidden.value, {
    ...visible.value,
    duration: props.duration,
  })
}

const onLeave = (element: Element) => {
  useGSAP().to(element, {
    ...hidden.value,
    duration: props.duration,
  })
}
</script>
