<script setup lang="ts">
  import { inject } from 'vue';
  import type AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';
  import { addAxesHelper, addGridHelper } from './../utils/debug-utils.ts';
  import type { FpsProvider, PoseProvider } from './../provider-types.ts';

  const props = defineProps<{
    axesGridHelpable: AstronomicalObjectViewModel[]
  }>();

  const { fps } = inject('debug:fps') as FpsProvider;
  const { poses } = inject('debug:poses') as PoseProvider;

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
      <template v-for="pose in poses" v-bind:key="pose.name">
        <div :data-test="`debug-container--position-${pose.name}`">
          {{ pose.name }} position
          x {{ pose.position.x.toFixed(1) }}
          y {{ pose.position.y.toFixed(1) }}
          z {{ pose.position.z.toFixed(1) }}
        </div>
        <div :data-test="`debug-container--rotation-${pose.name}`">
          {{ pose.name }} rotation
          x {{ pose.rotation.x.toFixed(1) }}
          y {{ pose.rotation.y.toFixed(1) }}
          z {{ pose.rotation.z.toFixed(1) }}
        </div>
      </template>
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

