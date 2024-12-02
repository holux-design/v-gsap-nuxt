<template>
  <article v-gsap.whenVisible.from="{ scale: 0.8, height: 0, padding: 0 }">
    <div v-gsap.whenVisible.from="{ y: 100 }" />
    <div v-gsap.whenVisible.delay-1000.stagger.from="{ opacity: 0, x: -40 }">
      <div class="h-[20px] w-[200px]" />
      <div class="h-[14px] w-[140px]" />
      <div class="h-[14px] w-[120px]" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
	article {
		@apply overflow-hidden p-6 rounded-xl flex gap-6 border;
		@apply dark:bg-neutral-600 dark:border-neutral-900;
		@apply bg-neutral-200 border-neutral-300;

		& > div:first-child {
			@apply w-[64px] aspect-square rounded-full border;
			@apply dark:bg-neutral-700 dark:border-neutral-800;
			@apply bg-neutral-300 border-neutral-400/25;
		}
		& > div:nth-child(2) {
			@apply flex flex-col gap-2;

			& > div {
				@apply rounded-md border ;
				@apply dark:bg-neutral-700 dark:border-neutral-800;
				@apply bg-neutral-300 border-neutral-400/25;
			}
		}
	}
</style>
