<script setup lang="ts">
  import { ref } from 'vue';
  import WebGL from 'three/addons/capabilities/WebGL.js';
  import CanvasContainer from './components/CanvasContainer.vue';

  const isWebGL2Available = ref(WebGL.isWebGL2Available());
</script>

<template>
  <main v-if="isWebGL2Available">
    <CanvasContainer msg="You did it!" />
  </main>
  <main v-else>
    <p>Looks like your device doesn't support WebGL 2</p>
  </main>
</template>

<style scoped>
</style>
