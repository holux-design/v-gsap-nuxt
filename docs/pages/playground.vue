<template>
  <div class="container">
    <h1>Playground</h1>

    <section>
      <div class="header">
        <h2>
          <pre>.magnetic</pre>
        </h2>
        <a
          href="/usage/modifiers#magnetic"
          target="_blank"
        >See reference</a>
      </div>
      <div class="Grid">
        <BoxComponent
          code="v-gsap.magnetic"
          title="Default"
        >
          <DemoComponent v-gsap.magnetic />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.weak"
          title=".weak"
        >
          <DemoComponent v-gsap.magnetic.weak />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.weaker"
          title=".weaker"
        >
          <DemoComponent v-gsap.magnetic.weaker />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.stronger"
          title=".stronger"
        >
          <DemoComponent v-gsap.magnetic.stronger />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.magnetic.strong"
          title=".strong"
        >
          <DemoComponent v-gsap.magnetic.strong />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div class="header">
        <h2>
          <pre>.parallax</pre>
        </h2>
        <a
          href="/usage/modifiers#parallax"
          target="_blank"
        >See reference</a>
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
          code="v-gsap.parallax.faster-10"
          title=".faster-10"
        >
          <DemoComponent v-gsap.parallax.faster-10 />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div class="header">
        <h2>
          <pre>.whenVisible</pre>
        </h2>
        <a
          href="/usage/modifiers#whenVisible"
          target="_blank"
        >See reference</a>
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
            v-gsap.whenVisible.once.from="{ autoAlpha: 0, rotate: '-45deg' }"
          />
        </BoxComponent>
        <BoxComponent
          code="v-gsap.whenVisible.from='{ autoAlpha: 0, x: -50 }'"
          title="Fade from left"
        >
          <DemoComponent v-gsap.whenVisible.from="{ autoAlpha: 0, x: -50 }" />
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
      <div class="header">
        <h2>
          <pre>.animateText</pre>
        </h2>
        <a
          href="/usage/modifiers#animatetext"
          target="_blank"
        >See reference</a>
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
          code="v-gsap.whenVisible.once.animateText"
          title=".once"
        >
          <DemoComponent
            v-gsap.whenVisible.once.animateText="'Lorem ipsum dolor sit amed'"
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
      <div class="header">
        <h2>
          <pre>.stagger</pre>
        </h2>
        <a
          href="/usage/modifiers#stagger"
          target="_blank"
        >See reference</a>
      </div>
      <div class="Grid">
        <BoxComponent
          v-gsap.whenVisible.stagger.from="{ opacity: 0 }"
          code="v-gsap.whenVisible.stagger.from='{ opacity: 0 }'"
          title="Default"
        >
          <DemoComponent />
          <DemoComponent />
          <DemoComponent />
        </BoxComponent>
      </div>
    </section>

    <section>
      <div class="header">
        <h2>
          <pre>.whileHover</pre>
        </h2>
        <a
          href="/usage/modifiers#whilehover"
          target="_blank"
        >See reference</a>
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
      <div class="header">
        <h2>
          <pre>.infinitely</pre>
        </h2>
        <a
          href="/usage/modifiers#infinitely"
          target="_blank"
        >See reference</a>
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
        <a
          href="/usage/modifiers#draggable"
          target="_blank"
        >See reference</a>
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
      <div class="header">
        <h2 class="!flex items-center gap-2">
          <pre>.desktop</pre>
          <pre>.mobile</pre>
        </h2>
        <a
          href="/usage/modifiers#desktop"
          target="_blank"
        >See reference</a>
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
      <div class="header">
        <h2>
          <pre>.preset</pre>
        </h2>
        <a
          href="/usage/modifiers#preset"
          target="_blank"
        >See reference</a>
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
  </div>
</template>

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
    @apply w-full flex items-end justify-start gap-6;
    @apply my-12;

    h2 {
      @apply my-0;
    }

    a {
      @apply text-green-500;
    }

    pre {
      @apply py-1 px-3 bg-white/10 text-white rounded-lg;
    }
  }

  div.Grid {
    @apply w-full grid grid-cols-1 gap-4;
    @apply md:grid-cols-2 lg:grid-cols-3;
  }
}
</style>
