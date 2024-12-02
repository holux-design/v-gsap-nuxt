<template>
  <button
    type="button"
  >
    {{ text || 'Hello World' }}
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {},
)
</script>

<style lang="scss" scoped>
button {
  @apply z-[0] shadow-2xl font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none border;
  @apply bg-neutral-300 border-neutral-400;
  @apply dark:bg-neutral-700 dark:border-neutral-500;
}
</style>
