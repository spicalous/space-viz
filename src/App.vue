<script setup lang="ts">
  import type { FpsProvider, CameraProvider, CameraData } from './provider-types.ts';
  import { ref, provide } from 'vue';
  import WebGL from 'three/addons/capabilities/WebGL.js';
  import MainContainer from './components/MainContainer.vue';
  import { debugFlagEnabled } from './utils/debug-utils.ts';

  const isWebGL2Available = ref(WebGL.isWebGL2Available());
  const debugEnabled = debugFlagEnabled();

  const fps: FpsProvider['fps'] = ref(0);
  const camera: CameraProvider['camera'] = ref({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  });

  const updateFps: FpsProvider['updateFps'] = function(newFps: number) {
    fps.value = newFps;
  }

  const updateCamera: CameraProvider['updateCamera'] = function(data: CameraData) {
    camera.value = data;
  }

  provide('debug:fps', { fps, updateFps });
  provide('debug:camera', { camera, updateCamera });
</script>

<template>
  <MainContainer v-if="isWebGL2Available" :debug-enabled="debugEnabled" />
  <main v-else>
    <p>Looks like your device doesn't support WebGL 2</p>
  </main>
</template>

<style scoped>
</style>
