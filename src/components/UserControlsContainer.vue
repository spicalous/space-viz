<script setup lang="ts">
  import type { Ref } from 'vue';
  import { computed, ref } from 'vue';
  import { Speed } from './../models/speed.ts';
  import IconClose from './icons/IconClose.vue';
  import IconFastForward from './icons/IconFastForward.vue';
  import IconRewind from './icons/IconRewind.vue';
  import IconList from './icons/IconList.vue';
  import TextToggle from './TextToggle.vue';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';

  const currentSpeed: Ref<Speed> = defineModel('currentSpeed', { required: true });
  const equidistantOrbits: Ref<boolean> = defineModel('equidistantOrbits', { required: true });
  const emit = defineEmits(['lookAt', 'recenter']);
  const props = defineProps<{
    lookAtControlData: AstronomicalObjectViewModel[]
  }>();

  const showMenu = ref(false);

  const SPEED_TO_INDEX = [
    Speed.REAL_TIME,
    Speed.ONE_MINUTE_PER_SECOND,
    Speed.ONE_HOUR_PER_SECOND,
    Speed.ONE_DAY_PER_SECOND,
    Speed.ONE_WEEK_PER_SECOND,
    Speed.TWO_WEEKS_PER_SECOND,
    Speed.FOUR_WEEKS_PER_SECOND,
    Speed.ONE_YEAR_PER_SECOND,
  ];
  const SPEED_TO_EN: { [key in Speed]: string } = {
    [Speed.REAL_TIME]: 'Real time',
    [Speed.ONE_MINUTE_PER_SECOND]: '1 minute / sec',
    [Speed.ONE_HOUR_PER_SECOND]: '1 hour / sec',
    [Speed.ONE_DAY_PER_SECOND]: '1 day / sec',
    [Speed.ONE_WEEK_PER_SECOND]: '1 week / sec',
    [Speed.TWO_WEEKS_PER_SECOND]: '2 weeks / sec',
    [Speed.FOUR_WEEKS_PER_SECOND]: '4 weeks / sec',
    [Speed.ONE_YEAR_PER_SECOND]: '1 year / sec'
  };

  const currentSpeedIndex = computed(() => SPEED_TO_INDEX.indexOf(currentSpeed.value));
  const minusDisabled = computed(() => currentSpeedIndex.value <= 0);
  const plusDisabled = computed(() => SPEED_TO_INDEX.length - 1 <= currentSpeedIndex.value);
</script>

<template>
  <div id="user-controls-container">
    <div class="speed-controls interactive">
      <button
        @click="currentSpeed = SPEED_TO_INDEX[currentSpeedIndex - 1]"
        :disabled="minusDisabled"
      >
        <IconRewind />
      </button>
      <span>{{ SPEED_TO_EN[currentSpeed] }}</span>
      <button
        @click="currentSpeed = SPEED_TO_INDEX[currentSpeedIndex + 1]"
        :disabled="plusDisabled"
      >
        <IconFastForward />
      </button>
    </div>

    <div v-if="showMenu" class="menu">
      <div class="menu-content">
        <div class="menu-row">
          <button
            @click="emit('recenter')"
          >
            Recenter
          </button>
        </div>
        <div class="menu-row hidden">
          Look at:
          <button
            v-for="astronomicalObjectViewModel in props.lookAtControlData"
            :key="astronomicalObjectViewModel.displayName"
            style="margin-right: 0.2rem;"
            @click="emit('lookAt', astronomicalObjectViewModel)"
          >
            {{ astronomicalObjectViewModel.displayName }}
          </button>
        </div>
        <div class="menu-row hidden">
          Orbit:
          <TextToggle
            v-model="equidistantOrbits"
            left-false-text="Realistic"
            right-true-text="Equidistant"
          />
        </div>
      </div>
    </div>
    <div class="off-screen-toggle">
      <button
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
    background-color: rgba(50, 50, 50, 0.98);

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

