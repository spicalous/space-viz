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
    background: var(--toggle-btn-bg-colour);
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(var(--neon-purple-r), var(--neon-purple-g), var(--neon-purple-b), 0.5);
    transition: all 0.3s ease;
    color: var(--btn-text-colour);

    .toggle-button {
      cursor: pointer;
      display: inline-block;
      padding: 0.5rem;

      &.active {
        background-color: var(--toggle-btn-active-bg-colour);
      }
      &:first-child {
        padding-right: 0.3rem;
      }
      &:last-child {
        padding-left: 0.3rem;
      }
    }
  }
</style>