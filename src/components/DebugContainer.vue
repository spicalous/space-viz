<script setup lang="ts">
  import { inject } from 'vue';
  import type AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';
  import { addAxesHelper, addGridHelper } from './../utils/debug-utils.ts';
  import type { FpsProvider, CameraProvider } from './../provider-types.ts';

  const props = defineProps<{
    axesGridHelpable: AstronomicalObjectViewModel[]
  }>();

  const { fps } = inject('debug:fps') as FpsProvider;
  const { camera } = inject('debug:camera') as CameraProvider;

  props.axesGridHelpable.forEach(obj => {
    addAxesHelper(obj.mesh, 10);
    addGridHelper(obj.mesh, 10);
  });
</script>

<template>
  <div id="debug-container">
    <div class="container">
      <div data-test="debug-container--fps">
        {{ fps.toFixed(1) }} FPS
      </div>
      <div data-test="debug-container--position">
        position
        x {{ camera.position.x.toFixed(1) }}
        y {{ camera.position.y.toFixed(1) }}
        z {{ camera.position.z.toFixed(1) }}
      </div>
      <div data-test="debug-container--rotation">
        rotation
        x {{ camera.rotation.x.toFixed(1) }}
        y {{ camera.rotation.y.toFixed(1) }}
        z {{ camera.rotation.z.toFixed(1) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  #debug-container {
    background-color: rgba(50, 50, 50, 0.7);
  }
  .container {
    padding: 1rem;
  }
</style>

