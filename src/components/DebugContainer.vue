<script setup lang="ts">
  import type AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';
  import { addAxesHelper, addGridHelper } from './../utils/debug-utils.ts';

  const props = defineProps<{
    fps: number,
    axesGridHelpable: AstronomicalObjectViewModel[]
  }>();

  props.axesGridHelpable.forEach(obj => {
    addAxesHelper(obj.mesh, 10);
    addGridHelper(obj.mesh, 10);
  });
</script>

<template>
  <div id="debug-container">
    <div class="container">{{ fps.toFixed(1) }} FPS</div>
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

