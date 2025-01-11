<template>
  <section
    class="w-full h-full relative"
    :data-index="currentIndex"
  >
    <div
      v-gsap.onState-index-0.inherit.from="{ scale: 0, duration: 0.3 }"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] lg:h-[150px] aspect-[3/2] rounded-lg bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center"
    >
      1
    </div>
    <div
      v-gsap.onState-index-1.inherit.from="{ scale: 0, duration: 0.3 }"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] lg:h-[150px] aspect-[3/2] rounded-lg bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center"
    >
      2
    </div>
    <div
      v-gsap.onState-index-2.inherit.from="{ scale: 0, duration: 0.3 }"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] lg:h-[150px] aspect-[3/2] rounded-lg bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center"
    >
      3
    </div>

    <button
      class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-neutral-300 dark:bg-neutral-600"
      @click="increase()"
    >
      Next Card
    </button>
  </section>
</template>

<script setup lang="ts">
const currentIndex = ref<number>(0)

function increase() {
  currentIndex.value++
  if (currentIndex.value > 2) {
    currentIndex.value = 0
  }
}
</script>
