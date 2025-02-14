<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
</style>
