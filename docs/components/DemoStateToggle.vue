<template>
  <div
    v-gsap.onState-visible.from="{ scale: 0, rotate: -25, duration: 0.3 }"
    :data-visible="isVisible"
    class="mt-16 w-[80px] aspect-square rounded-lg bg-neutral-300 dark:bg-neutral-600"
  />
  <button
    class="px-3 py-1 mt-4 rounded-md bg-neutral-300 dark:bg-neutral-600"
    @click="isVisible = !isVisible"
  >
    {{ isVisible ? 'Hide' : 'Show' }} Element
  </button>
</template>

<script setup lang="ts">
const isVisible = ref<boolean>(true)
</script>
