<script setup lang="ts">
  import type { Ref } from 'vue';
  import { computed } from 'vue';
  import { Speed } from './../models/speed.ts';

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
    <div class="speed-controls">
      <button
        @click="currentSpeed = SPEED_TO_INDEX[currentSpeedIndex - 1]"
        :disabled="minusDisabled"
      >
        -
      </button>
      <span>{{ SPEED_TO_EN[currentSpeed] }}</span>
      <button
        @click="currentSpeed = SPEED_TO_INDEX[currentSpeedIndex + 1]"
        :disabled="plusDisabled"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
  #user-controls-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .speed-controls {
    pointer-events: auto;
    margin-bottom: 2rem;

    button {
      cursor: pointer;
      display: inline-block;
      padding: 10px 13px;
      background-color: transparent;
      color: #EEEEEE;
      border-color: #EEEEEE;
      border-radius: 0.5rem;

      &:disabled {
        cursor: not-allowed;
        border-color: #333333;
        color: #333333;
      }
      &:hover:enabled {
        background-color: #EEEEEE;
        color: #000000;
      }
    }

    span {
      display: inline-block;
      text-align: center;
      padding: 0 8px;
      min-width: 120px;
    }
  }
</style>

