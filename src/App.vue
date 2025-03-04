<script setup lang="ts">
  import type { FpsProvider, Pose, PoseProvider } from './provider-types.ts';
  import { ref, provide } from 'vue';
  import WebGL from 'three/addons/capabilities/WebGL.js';
  import MainContainer from './components/MainContainer.vue';
  import { debugFlagEnabled } from './utils/debug-utils.ts';

  const isWebGL2Available = ref(WebGL.isWebGL2Available());
  const debugEnabled = debugFlagEnabled();

  const fps: FpsProvider['fps'] = ref(0);
  const poses: PoseProvider['poses'] = ref([]);

  const updateFps: FpsProvider['updateFps'] = function(newFps: number) {
    fps.value = newFps;
  }

  const updatePoses: PoseProvider['updatePoses'] = function(newPoses: Pose[]) {
    poses.value = newPoses;
  }

  provide('debug:fps', { fps, updateFps });
  provide('debug:poses', { poses, updatePoses });
</script>

<template>
  <MainContainer v-if="isWebGL2Available" :debug-enabled="debugEnabled" />
  <main v-else>
    <p>Looks like your device doesn't support WebGL 2</p>
  </main>
</template>

<style scoped>
</style>
