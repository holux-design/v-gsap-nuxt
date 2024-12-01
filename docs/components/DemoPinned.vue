<template>
  <BoxComponent
    class="w-full relative"
  >
    <section>
      <div
        v-gsap.add.to="{ width: '800px' }"
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
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  @apply w-[80%];
  @apply font-bold text-white text-[4rem] leading-[110%] text-center;

	&:nth-child(2) {
		@apply text-black;
	}
}

.Dot {
  @apply w-[100px] aspect-square rounded-full bg-green-500;
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  @apply flex items-center justify-center;
}
</style>
