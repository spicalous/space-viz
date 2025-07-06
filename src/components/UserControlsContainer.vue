<script setup lang="ts">
  import type { Ref } from 'vue';
  import { computed, ref } from 'vue';
  import { Speed, SPEED_DISPLAY_NAME } from './../models/speed.ts';
  import IconClose from './icons/IconClose.vue';
  import IconFastForward from './icons/IconFastForward.vue';
  import IconRewind from './icons/IconRewind.vue';
  import IconList from './icons/IconList.vue';
  import TextToggle from './TextToggle.vue';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';

  const currentSpeed: Ref<Speed> = defineModel('currentSpeed', { required: true });
  const equidistantOrbits: Ref<boolean> = defineModel('equidistantOrbits', { required: true });
  const equalPlanetSize: Ref<boolean> = defineModel('equalPlanetSize', { required: true });
  const emit = defineEmits(['on:look-at', 'on:recenter']);
  const props = defineProps<{
    lookAtControlData: AstronomicalObjectViewModel[]
  }>();

  const showMenu = ref(false);

  const SPEED_ARRAY = Object.values(Speed);
  const currentSpeedIndex = computed(() => SPEED_ARRAY.indexOf(currentSpeed.value));
  const minusDisabled = computed(() => currentSpeedIndex.value <= 0);
  const plusDisabled = computed(() => SPEED_ARRAY.length - 1 <= currentSpeedIndex.value);
</script>

<template>
  <div id="user-controls-container">
    <div class="speed-controls interactive">
      <button
        class="neon-btn"
        @click="currentSpeed = SPEED_ARRAY[currentSpeedIndex - 1]"
        :disabled="minusDisabled"
      >
        <IconRewind />
      </button>
      <span>{{ SPEED_DISPLAY_NAME[currentSpeed] }}</span>
      <button
        class="neon-btn"
        @click="currentSpeed = SPEED_ARRAY[currentSpeedIndex + 1]"
        :disabled="plusDisabled"
      >
        <IconFastForward />
      </button>
    </div>

    <div v-if="showMenu" class="menu">
      <div class="menu-content">
        <div class="menu-row">
          <button
            class="neon-btn"
            @click="emit('on:recenter')"
          >
            Recenter
          </button>
        </div>
        <div class="menu-row">
          <fieldset class="button-list">
            <legend>Look at</legend>
            <button
              class="neon-btn btn-siblings"
              v-for="astronomicalObjectViewModel in props.lookAtControlData"
              :key="astronomicalObjectViewModel.displayName"
              @click="emit('on:look-at', astronomicalObjectViewModel)"
            >
              {{ astronomicalObjectViewModel.displayName }}
            </button>
          </fieldset>
        </div>
        <div class="menu-row">
          <fieldset>
            <legend>Planet size</legend>
            <TextToggle
              v-model="equalPlanetSize"
              left-false-text="Realistic"
              right-true-text="Model"
            />
          </fieldset>
          <fieldset class="hidden">
            <legend>Orbits</legend>
            <TextToggle
              v-model="equidistantOrbits"
              left-false-text="Realistic"
              right-true-text="Equidistant"
            />
          </fieldset>
        </div>
      </div>
    </div>
    <div class="off-screen-toggle">
      <button
        class="neon-btn"
        @click="showMenu = !showMenu"
      >
        <component :is="showMenu ? IconClose : IconList"></component>
      </button>
    </div>
  </div>
</template>

<style scoped>
  #user-controls-container {
    display: flex;
  }

  .menu {
    pointer-events: auto;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding-bottom: 5rem;
    background-color: rgba(0, 0, 0, 0.95);

    .menu-content {
      padding: 1rem;
    }
  }

  .off-screen-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
  }

  .menu-row {
    margin-bottom: 0.5rem;
  }

  fieldset {
    display: inline-flex;
    border-color: var(--neon-purple);
  }

  .button-list {
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .speed-controls {
    align-self: flex-end;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;

    span {
      display: inline-block;
      text-align: center;
      padding: 0 8px;
      min-width: 120px;
    }
  }

  .hidden {
    display: none;
  }
</style>

