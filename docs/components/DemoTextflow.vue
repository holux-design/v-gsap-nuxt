<template>
  <!-- <section>
		<div v-gsap.whenVisible.to="{ x: -300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
		<div v-gsap.whenVisible.to="{ x: 300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
	</section> -->
  <section v-gsap.timeline.whenVisible="{ start: 'top bottom', end: 'bottom top', scrub: 1.5 }">
    <div v-gsap.add.to="{ x: -300 }">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>
    <div v-gsap.add.withPrevious.to="{ x: 300 }">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
	@apply w-full h-full;
	@apply relative;
	@apply flex flex-col items-start justify-center;

	div {
		@apply text-[8rem] text-neutral-300 dark:text-neutral-600 leading-[100%] uppercase font-black whitespace-nowrap;

		&:nth-child(1) {
		}
		&:nth-child(2) {
		}
	}
}
</style>
