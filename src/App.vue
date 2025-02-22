<script setup lang="ts">
  import { ref } from 'vue';
  import WebGL from 'three/addons/capabilities/WebGL.js';
  import MainContainer from './components/MainContainer.vue';

  const isWebGL2Available = ref(WebGL.isWebGL2Available());
</script>

<template>
  <MainContainer v-if="isWebGL2Available" />
  <main v-else>
    <p>Looks like your device doesn't support WebGL 2</p>
  </main>
</template>

<style scoped>
</style>
