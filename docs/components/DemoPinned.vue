<template>
  <BoxComponent
    class="w-full relative"
  >
    <section>
      <div
        v-gsap.add.to="{ width: '800px', backgroundColor: `rgb(34 197 94)` }"
        class="Dot"
      />
      <h1
        v-gsap.add.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
        v-gsap.add.to="{ opacity: 0, y: -32 }"
      >
        New era of
      </h1>
      <h1
        v-gsap.add.withPrevious.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
        v-gsap.add.to="{ opacity: 0, y: -32 }"
      >
        animation
      </h1>
    </section>
  </BoxComponent>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
section {
}
h1 {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -mt-[8%];
  @apply w-[80%];
  @apply font-bold text-white text-[3rem] lg:text-[4rem] leading-[110%] text-center;

	&:nth-child(2) {
		@apply text-black;
	}
}

.Dot {
  @apply w-[100px] aspect-square rounded-full border;
  @apply bg-neutral-200 border-neutral-300;
  @apply dark:bg-neutral-600 dark:border-neutral-500;
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  @apply flex items-center justify-center;
}
</style>
