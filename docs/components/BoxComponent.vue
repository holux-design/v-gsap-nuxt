<template>
  <div
    class="relative bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 w-full aspect-[3/2]"
    :style="{ overflow: `${overflow}` }"
  >
    <slot />

    <div class="Crosshair">
      <div
        class="Vertical absolute inset-y-0 left-1/2 translate-x-[-50%] w-[1px] bg-gradient-to-b from-transparent dark:via-white/20 via-black/10 to-transparent  z-[-1]"
      />
      <div
        class="Horizontal absolute inset-x-0 top-1/2 translate-y-[-50%] h-[1px] bg-gradient-to-r from-transparent dark:via-white/20 via-black/10 to-transparent z-[-1]"
      />
    </div>

    <div class="absolute top-2 left-4 dark:text-white/80 text-gray-700">
      <pre>{{ title }}</pre>
    </div>

    <button
      hide-scrollbar
      class="dark:text-white/25 text-black/25 absolute bottom-2 inset-x-0 px-4 overflow-scroll text-[14px]"
      @click="copy(code)"
    >
      <pre v-html="code?.trim()" />
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    crosshair?: boolean
    code?: string
    overflow?: string
  }>(),
  {
    crosshair: true,
    overflow: 'hidden',
  },
)

function copy(code?: string) {
  if (!code) return
  navigator.clipboard.writeText(code)

  alert('Copied to clipboard')
}
</script>

<style lang="scss" scoped>
[hide-scrollbar] {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
