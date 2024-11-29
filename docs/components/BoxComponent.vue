<template>
  <div
    class="relative bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 w-full aspect-[3/2]"
    :style="{ overflow: `${overflow}` }"
  >
    <slot />

    <div class="Crosshair">
      <div
        class="Vertical absolute inset-y-0 left-1/2 translate-x-[-50%] w-[1px] bg-white/5 z-[-1]"
      />
      <div
        class="Horizontal absolute inset-x-0 top-1/2 translate-y-[-50%] h-[1px] bg-white/5 z-[-1]"
      />
    </div>

    <div class="absolute top-2 left-4 text-white/80">
      <pre>title</pre>
    </div>

    <button
      class="text-white/25 absolute bottom-2 inset-x-0 px-4 overflow-scroll text-[14px]"
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
