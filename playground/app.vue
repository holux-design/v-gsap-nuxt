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
      style="width: 100px; height: 100px; background: red"
      v-gsap.whenVisible.from="{ x: -100, opacity: 0 }"
    ></div>
  </div>
</template>

<script setup></script>
