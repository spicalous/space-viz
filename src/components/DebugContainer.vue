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
      <div class="align-right" data-test="debug-container--fps">
        {{ fps.toFixed(1) }} FPS
      </div>
      <div class="pose-container">
        <template v-for="pose in poses" v-bind:key="pose.name">
          <span>{{pose.name}} position</span>
          <span class="red">x</span> <span class="align-right">{{ pose.position.x.toFixed(2) }}</span>
          <span class="green">y</span> <span class="align-right">{{ pose.position.y.toFixed(2) }}</span>
          <span class="blue">z</span> <span class="align-right">{{ pose.position.z.toFixed(2) }}</span>
          <span>{{pose.name}} rotation</span>
          <span class="red">x</span> <span class="align-right">{{ pose.rotation.x.toFixed(2) }}</span>
          <span class="green">y</span> <span class="align-right">{{ pose.rotation.y.toFixed(2) }}</span>
          <span class="blue">z</span> <span class="align-right">{{ pose.rotation.z.toFixed(2) }}</span>

        </template>
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

  .pose-container {
    display: grid;
    column-gap: 0.5rem;
    grid-template-columns: auto auto auto auto auto auto auto;
  }

  .align-right {
    text-align: right;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .blue {
    color: blue;
  }
</style>

