<template>
  <div class="container flex flex-col gap-20">
    <BoxComponent class="w-full">
      <div
        v-gsap.magnetic
        class="w-[400px] h-[400px] bg-red-500 text-black rounded-xl mx-auto flex items-center justify-center text-center"
      >
        Some big ass element
      </div>
    </BoxComponent>

    <BoxComponent class="w-full py-20">
      <div
        v-gsap.magnetic
        class="w-[800px] h-[800px] bg-red-500 text-black rounded-xl mx-auto flex items-center justify-center text-center"
      >
        Some big ass element
      </div>
    </BoxComponent>
    <BoxComponent class="w-full py-20">
      <div
        v-gsap.magnetic
        class="w-[800px] h-[200px] bg-red-500 text-black rounded-xl mx-auto flex items-center justify-center text-center"
      >
        Some big ass element
      </div>
    </BoxComponent>
    <BoxComponent class="w-full py-20">
      <div
        v-gsap.magnetic
        class="w-[200px] h-[600px] bg-red-500 text-black rounded-xl mx-auto flex items-center justify-center text-center"
      >
        Some big ass element
      </div>
    </BoxComponent>
  </div>
</template>

<style lang="scss" scoped>
div.container {
  @apply max-w-[1280px];
  @apply px-6 py-12 mx-auto;
}
</style>
