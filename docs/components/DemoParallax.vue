<template>
  <section>
    <div v-gsap.parallax.faster />
    <div v-gsap.parallax.faster-10 />
  </section>
</template>

<style lang="scss" scoped>
section {
	@apply flex !flex-row items-center justify-center;
	@apply relative;

	& > div:nth-child(1) {
		@apply w-[100px] aspect-[2/3] rounded-lg backdrop-blur-md;
		@apply bg-green-400/80;
		@apply ml-[25px];
	}
	& > div:nth-child(2) {
		@apply w-[100px] aspect-[2/3] rounded-lg backdrop-blur-md;
		@apply bg-green-700/80;
		@apply -ml-[50px];
	}
}
</style>
