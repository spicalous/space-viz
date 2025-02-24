<script setup lang="ts">
  import type { Ref } from 'vue';
  import { computed } from 'vue';
  import { Speed } from './../models/speed.ts';
  import IconFastForward from './icons/IconFastForward.vue';
  import IconRewind from './icons/IconRewind.vue';
  import IconList from './icons/IconList.vue';

  const currentSpeed: Ref<Speed> = defineModel('currentSpeed', { required: true });
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
    <div class="bottom">
      <div class="off-screen-toggle">
        <button style="display: none"
        >
          <IconList />TODO
        </button>
      </div>
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
    </div>
  </div>
</template>

<style scoped>
  #user-controls-container {
    display: flex;
  }

  .bottom {
    width: 100%;
    align-self: flex-end;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .off-screen-toggle {
    padding-left: 2rem;

    button {
      border-radius: 2rem;
      padding: 0.7rem;
    }
  }

  .speed-controls {
    text-align: center;
    margin-bottom: 2rem;

    button {
      padding: 0.5rem;
      border-radius: 0.5rem;
    }

    span {
      display: inline-block;
      text-align: center;
      padding: 0 8px;
      min-width: 120px;
    }
  }
</style>

