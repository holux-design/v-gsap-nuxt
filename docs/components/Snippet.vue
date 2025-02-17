<template>
  <pre
    class="Snippet"
    v-html="html"
  />
</template>

<script setup lang="ts">
import { codeToHtml, codeToTokens } from 'shiki'

const props = withDefaults(
  defineProps<{
    name: string
  }>(),
  {},
)

const snippets = {
  DemoCard: `<article v-gsap.whenVisible.from="{ scale: 0.8, height: 0, padding: 0 }">
	<div v-gsap.whenVisible.from="{ y: 100 }"></div>
	<div v-gsap.whenVisible.delay-1000.stagger.from="{ opacity: 0, x: -40 }">
		<div class="h-[20px] w-[200px]"></div>
		<div class="h-[14px] w-[140px]"></div>
		<div class="h-[14px] w-[120px]"></div>
	</div>
</article>`,
  DemoParallax: `<section>
	<div v-gsap.parallax.faster></div>
	<div v-gsap.parallax.faster-10></div>
</section>`,
  DemoPinned: `<section v-gsap.timeline.pinned>
  <div class="Dot" v-gsap.add.to="{ width: '800px' }"></div>
  <h1
    v-gsap.add.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
    v-gsap.add.to="{ opacity: 0, y: -32 }">New era of</h1>
  <h1
    v-gsap.add.withPrevious.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
    v-gsap.add.to="{ opacity: 0, y: -32 }">animation</h1>
</section>`,
  DemoTextflow: `<section>
  <div v-gsap.whenVisible.to="{ x: -300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
  <div v-gsap.whenVisible.to="{ x: 300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
</section>`,
  DemoTextflowTimeline: `<section v-gsap.timeline.whenVisible="{ start: 'top bottom', end: 'bottom top', scrub: 1.5 }">
  <div v-gsap.add.to="{ x: -300 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
  <div v-gsap.add.withPrevious.to="{ x: 300 }">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
</section>`,
  DemoStateToggle: `<div
  :data-visible="isVisible"
  v-gsap.onState-visible.from="{ scale: 0, rotate: -25 }"></div>`,
  DemoStateArray: `<section :data-index="currentIndex">
  <div v-gsap.onState-index-0.inherit.from="{ scale: 0 }"></div>
  <div v-gsap.onState-index-1.inherit.from="{ scale: 0 }"></div>
  <div v-gsap.onState-index-2.inherit.from="{ scale: 0 }"></div>
</section>`,
  DemoVIF: `<GSAPTransition :hidden="{ scale: 0, rotate: -25 }">
  <div v-if="index == 0"></div>
</GSAPTransition>`,
}

const html = await codeToHtml(snippets?.[props.name] || '', {
  lang: 'html',
  theme: 'github-dark',
})
</script>
