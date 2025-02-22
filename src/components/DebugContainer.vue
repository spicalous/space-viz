<script setup lang="ts">
  import type AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';
  import { addAxesHelper } from './../utils/debug-utils.ts';

  const props = defineProps<{
    axesHelpable: AstronomicalObjectViewModel[]
  }>();

  props.axesHelpable.forEach(obj => addAxesHelper(obj.mesh, 10));
</script>

<template>
  <div id="debug-container">
  </div>
</template>

<style scoped>
</style>

