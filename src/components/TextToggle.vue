<script setup lang="ts">
  import type { Ref } from 'vue';

  const model: Ref<boolean> = defineModel({ default: true });
  const props = defineProps<{
    leftFalseText: string,
    rightTrueText: string
  }>();
</script>

<template>
  <div class="text-toggle">
    <div
      class="toggle-button"
      :class="{ active: !model }"
      @click="model = false"
    >
      {{ props.leftFalseText }}
    </div>
    <div
      class="toggle-button"
      :class="{ active: model }"
      @click="model = true"
    >
      {{ props.rightTrueText }}
    </div>
  </div>
</template>

<style scoped>
  .text-toggle {
    display: inline-block;
    border: solid 2px;
    border-radius: 0.7rem;
    border-color: var(--text-toggle-border-colour);
    padding: 0.2rem;

    .toggle-button {
      cursor: pointer;
      display: inline-block;
      padding: 0.2rem;

      &.active {
        font-weight: bold;
        color: var(--text-toggle-active-text-colour);
        background-color: var(--text-toggle-active-bg-colour);
      }
      &:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        padding-right: 0.3rem;
      }
      &:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding-left: 0.3rem;
      }
    }
  }
</style>