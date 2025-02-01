<template>
  <div class="container">
    <h1>Playground</h1>

    <section>
      <div id="realworld" class="header">
        <h2>Real world examples</h2>
      </div>
      <div
        v-gsap.timeline.pinned="{ end: '+=1500px' }"
        class="grid grid-cols-1 lg:grid-cols-2 mt-20"
      >
        <SectionPinned />
        <Snippet name="DemoPinned" class="w-full" />
      </div>
    </section>
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
