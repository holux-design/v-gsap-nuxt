<template>
  <div class="container">
    <h1>Playground</h1>

    <section>
      <div
        id="realworld"
        class="header"
      >
        <h2>Real world examples</h2>
      </div>
      <div class="Grid !grid-cols-1 lg:!grid-cols-2">
        <BoxComponent class="w-full">
          <DemoParallax />
        </BoxComponent>

        <Snippet
          name="DemoParallax"
          class="w-full"
        />
      </div>
      <div class="Grid !grid-cols-1 lg:!grid-cols-2 mt-20">
        <BoxComponent class="w-full">
          <DemoCard />
        </BoxComponent>
        <Snippet
          name="DemoCard"
          class="w-full"
        />
      </div>
      <div class="Grid !grid-cols-1 lg:!grid-cols-2 mt-20">
        <BoxComponent class="w-full">
          <DemoTextflow />
        </BoxComponent>
        <div>
          <Snippet
            name="DemoTextflow"
            class="w-full"
          />
          <div class="my-4">
            Or with timeline:
          </div>
          <Snippet
            name="DemoTextflowTimeline"
            class="w-full"
          />
        </div>
      </div>
      <div class="Grid !grid-cols-1 lg:!grid-cols-2 mt-20">
        <BoxComponent class="w-full">
          <DemoStateToggle />
        </BoxComponent>
        <Snippet
          name="DemoStateToggle"
          class="w-full"
        />
      </div>
      <div class="Grid !grid-cols-1 lg:!grid-cols-2 mt-20">
        <BoxComponent class="w-full">
          <DemoStateArray />
        </BoxComponent>
        <Snippet
          name="DemoStateArray"
          class="w-full"
        />
      </div>
      <div
        v-gsap.timeline.pinned="{ end: '+=1500px' }"
        class="Grid !grid-cols-1 lg:!grid-cols-2 mt-20"
      >
        <DemoPinned />
        <Snippet
          name="DemoPinned"
          class="w-full"
        />
      </div>
    </section>

    <section>
      <div
        id="parallax"
        class="header"
      >
        <h2>
          <pre>.parallax</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#parallax"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.parallax.slower"
          title=".slower"
        >
          <DemoComponent v-gsap.parallax.slower />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.parallax.faster"
          title=".faster"
        >
          <DemoComponent v-gsap.parallax.faster />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.parallax.slower-10"
          title=".slower-10"
        >
          <DemoComponent v-gsap.parallax.slower-10 />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.parallax.slower-20"
          title=".slower-20"
        >
          <DemoComponent v-gsap.parallax.slower-20 />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.parallax.faster-10"
          title=".faster-10"
        >
          <DemoComponent v-gsap.parallax.faster-10 />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.parallax.faster-20"
          title=".faster-20"
        >
          <DemoComponent v-gsap.parallax.faster-20 />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="magnetic"
        class="header"
      >
        <h2>
          <pre>.magnetic</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#magnetic"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.magnetic"
          title="Default"
        >
          <DemoComponent
            v-gsap.magnetic
            text="Hover me"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.weak"
          title=".weak"
        >
          <DemoComponent
            v-gsap.magnetic.weak
            text="Hover me"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.weaker"
          title=".weaker"
        >
          <DemoComponent
            v-gsap.magnetic.weaker
            text="Hover me"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.stronger"
          title=".stronger"
        >
          <DemoComponent
            v-gsap.magnetic.stronger
            text="Hover me"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.strong"
          title=".strong"
        >
          <DemoComponent
            v-gsap.magnetic.strong
            text="Hover me"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.refuse"
          title=".refuse (lol)"
        >
          <DemoComponent
            v-gsap.magnetic.refuse
            text="Try me"
          />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="whenvisible"
        class="header"
      >
        <h2>
          <pre>.whenVisible</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#whenVisible"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0 }'"
          title="Fade"
        >
          <DemoComponent v-gsap.whenVisible.from="{ autoAlpha: 0 }" />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0, rotate: '-45deg' }'"
          title="Fade Rotate"
        >
          <DemoComponent
            v-gsap.whenVisible.from="{ autoAlpha: 0, rotate: '-45deg' }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0, rotate: '-45deg' }'"
          title="Fade Rotate (once)"
        >
          <DemoComponent
            v-gsap.whenVisible.once.from="{
              autoAlpha: 0,
              rotate: '-45deg',
            }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0, x: -50 }'"
          title="Fade from left"
        >
          <DemoComponent v-gsap.whenVisible.from="{ autoAlpha: 0, x: -50 }" />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.once.from='{ autoAlpha: 0, rotate: -45, duration: 2 }'"
          title="Once (stays in final state)"
        >
          <DemoComponent
            v-gsap.whenVisible.once.from="{
              autoAlpha: 0,
              rotate: -45,
              duration: 2,
            }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.once.reversible.from='{ autoAlpha: 0, rotate: -45, duration: 2 }'"
          title="Once Reversible (old behavior)"
        >
          <DemoComponent
            v-gsap.whenVisible.once.reversible.from="{
              autoAlpha: 0,
              rotate: -45,
              duration: 2,
            }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0, start: 'top 60%', end: 'bottom 40%' }'"
          title="Custom start/end"
        >
          <DemoComponent
            v-gsap.whenVisible.from="{
              autoAlpha: 0,
              start: 'top 60%',
              end: 'bottom 40%',
            }"
          />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="animatetext"
        class="header"
      >
        <h2>
          <pre>.animateText</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#animatetext"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.whenVisible.animateText"
          title="Default"
        >
          <DemoComponent
            v-gsap.whenVisible.animateText="'Lorem ipsum dolor sit amed'"
          />
        </BoxComponent>

        <BoxComponent
          code="v-gsap.whenVisible.animateText.slow"
          title=".slow"
        >
          <DemoComponent
            v-gsap.whenVisible.animateText.slow="'Lorem ipsum dolor sit amed'"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.animateText.fast"
          title=".fast"
        >
          <DemoComponent
            v-gsap.whenVisible.animateText.fast="'Lorem ipsum dolor sit amed'"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.once.animateText"
          title=".once"
        >
          <DemoComponent
            v-gsap.whenVisible.once.animateText="'Lorem ipsum dolor sit amed'"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.animateText.once.slow"
          title=".once.slow"
        >
          <DemoComponent
            v-gsap.whenVisible.animateText.once.slow="
              'Lorem ipsum dolor sit amed'
            "
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.animateText.once.fast"
          title=".once.fast"
        >
          <DemoComponent
            v-gsap.whenVisible.animateText.once.fast="
              'Lorem ipsum dolor sit amed'
            "
          />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="stagger"
        class="header"
      >
        <h2>
          <pre>.stagger</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#stagger"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          v-gsap.whenVisible.stagger.from="{ opacity: 0, y: 50, stagger: 0.4 }"
          code="v-gsap.whenVisible.stagger.from='{ opacity: 0, y: 50, stagger: 0.4 }'"
          title="Default"
        >
          <DemoComponent />
          <DemoComponent />
          <DemoComponent />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="whilehover"
        class="header"
      >
        <h2>
          <pre>.whileHover</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#whilehover"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.whileHover.to='{ rotate: '-15deg', y: -12 }'"
          title="Default"
        >
          <DemoComponent v-gsap.whileHover.to="{ rotate: '-15deg', y: -12 }" />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whileHover.noReverse.to='{ rotate: '-15deg', y: -12 }'"
          title=".noReverse"
        >
          <DemoComponent
            v-gsap.whileHover.noReverse.to="{ rotate: '-15deg', y: -12 }"
          />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="delay"
        class="header"
      >
        <h2>
          <pre>.delay-</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#delay-milliseconds"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.whileHover.delay-500.to='{ rotate: '-15deg', y: -12 }'"
          title=".delay-500"
        >
          <DemoComponent v-gsap.whileHover.delay-500.to="{ scale: 1.2 }" />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whileHover.delay-789.to='{ rotate: '-15deg', y: -12 }'"
          title=".delay-789"
        >
          <DemoComponent v-gsap.whileHover.delay-789.to="{ scale: 1.2 }" />
        </BoxComponent>

        <BoxComponent
          code="v-gsap.whenVisible.once.delay-1000.to='{ x: 100 }'"
          title="delay after visible"
        >
          <DemoComponent v-gsap.whenVisible.once.delay-1000.to="{ x: 100 }" />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="infinitely"
        class="header"
      >
        <h2>
          <pre>.infinitely</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#infinitely"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.whileHover.to='{ rotate: '-15deg', y: -12 }'"
          title="Default"
        >
          <DemoComponent
            v-gsap.infinitely.to="{
              rotate: '360deg',
              ease: 'linear',
              duration: 10,
            }"
          />
        </BoxComponent>
      </div>
    </section>

    <section id="draggable">
      <div class="header">
        <h2>
          <pre>.draggable</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#draggable"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.draggable"
          title="Default"
        >
          <DemoComponent v-gsap.draggable />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.draggable.x"
          title=".x"
        >
          <DemoComponent v-gsap.draggable.x />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.draggable.y"
          title=".y"
        >
          <DemoComponent v-gsap.draggable.y />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.draggable.rotation"
          title=".rotation"
        >
          <DemoComponent v-gsap.draggable.rotation />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.draggable.bounds='#draggable'"
          title=".bounds (selector)"
          overflow="visible"
        >
          <DemoComponent v-gsap.draggable.bounds="'#draggable'" />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="desktop"
        class="header"
      >
        <h2 class="!flex items-center gap-2">
          <pre>.desktop</pre>
          <pre>.mobile</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#desktop"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.desktop.infinitely.to"
          title="Desktop only"
        >
          <DemoComponent
            v-gsap.desktop.infinitely.to="{
              rotate: '360deg',
              ease: 'linear',
              duration: 10,
            }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.mobile.infinitely.to"
          title="Mobile only"
        >
          <DemoComponent
            v-gsap.mobile.infinitely.to="{
              rotate: '360deg',
              ease: 'linear',
              duration: 10,
            }"
          />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div
        id="preset"
        class="header"
      >
        <h2>
          <pre>.preset</pre>
        </h2>
        <NuxtLink
          to="/usage/modifiers#preset"
          target="_blank"
        >
          See reference
        </NuxtLink>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.preset='rotate'"
          title="Preset 'rotate' from nuxt.config"
        >
          <DemoComponent v-gsap.preset="'rotate'" />
        </BoxComponent>
      </div>
    </section>

    <div class="h-[25vh]" />
  </div>
</template>

<script setup lang="ts">
const { tree } = useDocus()
</script>

<style lang="scss" scoped>
div.container {
  @apply max-w-[1280px];
  @apply px-6 py-12 mx-auto;
}

h1 {
  font-family: var(--typography-font-display);
  font-weight: var(--prose-h1-fontWeight);
  font-size: var(--text-5xl-fontSize);
  line-height: var(--text-5xl-lineHeight);
  letter-spacing: var(--prose-h1-letterSpacing);
}

h2 {
  font-family: var(--typography-font-display);
  display: block;
  margin: var(--prose-h2-margin);
  font-size: var(--prose-h2-fontSize);
  line-height: var(--prose-h2-lineHeight);
  font-weight: var(--prose-h2-fontWeight);
  letter-spacing: var(--prose-h2-letterSpacing);
}

h3 {
  font-family: var(--typography-font-display);
  display: block;
  margin: var(--prose-h3-margin);
  font-size: var(--prose-h3-fontSize);
  line-height: var(--prose-h3-lineHeight);
  font-weight: var(--prose-h3-fontWeight);
  letter-spacing: var(--prose-h3-letterSpacing);
}

section {
  @apply flex flex-col items-center justify-center;
  @apply my-8;

  div.header {
    @apply w-full flex flex-col items-start justify-start md:flex-row md:items-end  gap-6;
    @apply my-12;

    h2 {
      @apply my-0;
    }

    a {
      @apply text-green-500;
    }

    pre {
      @apply py-1 px-3 bg-black/5 text-gray-700  rounded-lg;
      @apply dark:text-white dark:bg-white/10;
    }
  }

  div.Grid {
    @apply w-full grid grid-cols-1 gap-4;
    @apply md:grid-cols-2 lg:grid-cols-3;
  }
}
</style>
