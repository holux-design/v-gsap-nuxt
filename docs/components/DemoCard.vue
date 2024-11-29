<template>
	<article v-gsap.whenVisible.from="{ scale: 0.8, height: 0, padding: 0 }">
		<div v-gsap.whenVisible.from="{ y: 100 }"></div>
		<div v-gsap.whenVisible.delay-1000.stagger.from="{ opacity: 0, x: -40 }">
			<div class="h-[20px] w-[200px]"></div>
			<div class="h-[14px] w-[140px]"></div>
			<div class="h-[14px] w-[120px]"></div>
		</div>
	</article>
</template>

<style lang="scss" scoped>
	article {
		@apply overflow-hidden p-6 rounded-xl flex gap-6;
		@apply dark:bg-green-700 dark:border-black;
		@apply bg-green-400 border-black;

		& > div:first-child {
			@apply w-[64px] aspect-square rounded-full border;
			@apply dark:bg-green-500 dark:border-green-800;
			@apply bg-green-500 border-green-600;
		}
		& > div:nth-child(2) {
			@apply flex flex-col gap-2;

			& > div {
				@apply rounded-md border ;
				@apply dark:bg-green-500 dark:border-green-800;
				@apply bg-green-500 border-green-600;
			}
		}
	}
</style>