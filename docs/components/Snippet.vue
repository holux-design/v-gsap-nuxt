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
}

const html = await codeToHtml(snippets?.[props.name] || '', {
  lang: 'html',
  theme: 'github-dark',
})
</script>
