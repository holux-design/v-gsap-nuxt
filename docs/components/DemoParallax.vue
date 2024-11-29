<template>
	<section>
		<div v-gsap.parallax.faster></div>
		<div v-gsap.parallax.faster-10></div>
	</section>
</template>

<style lang="scss" scoped>
section {
	@apply flex !flex-row items-center justify-center;
	@apply relative;

	& > div:nth-child(1) {
		@apply w-[100px] aspect-[2/3] rounded-lg;
		@apply dark:bg-green-500 border dark:border-green-800;
		@apply bg-green-300 border border-green-500;
		@apply ml-[25px];
	}
	& > div:nth-child(2) {
		@apply w-[100px] aspect-[2/3] rounded-lg;
		@apply dark:bg-green-700 border dark:border-green-800;
		@apply bg-green-500 border border-green-700;
		@apply -ml-[50px];
	}
}
</style>