<script setup lang="ts">
  import { ref } from 'vue';
  import WebGL from 'three/addons/capabilities/WebGL.js';
  import MainContainer from './components/MainContainer.vue';
  import { debugFlagEnabled } from './utils/debug-utils.ts';

  const isWebGL2Available = ref(WebGL.isWebGL2Available());
  const debugEnabled = debugFlagEnabled();
</script>

<template>
  <MainContainer v-if="isWebGL2Available" :debug-enabled="debugEnabled" />
  <main v-else>
    <p>Looks like your device doesn't support WebGL 2</p>
  </main>
</template>

<style scoped>
</style>
