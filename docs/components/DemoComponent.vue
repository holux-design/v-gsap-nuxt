<template>
  <button
    type="button"
    class="z-[0] dark:text-green-950 text-green-900 !bg-gradient-to-r dark:from-green-700 dark:to-green-600 from-green-500 to-green-400  shadow-2xl dark:shadow-black shadow-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
  >
    {{ text || 'Hello World' }}
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?:string
  }>(),
  {},
)
</script>
