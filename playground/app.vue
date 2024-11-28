<template>
  <div
    style="
      height: 300vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 200px;
    "
  >
    <div
      v-gsap.whenVisible.from="{ x: -100, opacity: 0 }"
      style="width: 100px; height: 100px; background: red"
    />
  </div>
</template>

<script setup></script>
