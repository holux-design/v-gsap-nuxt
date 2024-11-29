<template>
  <pre v-html="html" />
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
}

const html = await codeToHtml(snippets?.[props.name] || '', {
  lang: 'html',
  theme: 'github-dark',
})
</script>
