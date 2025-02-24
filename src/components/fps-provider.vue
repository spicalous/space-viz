<script setup>
  import { provide, ref, readonly } from 'vue';

  const fps = ref(0);

  function updateFps(newFps: number) {
    fps.value = newFps;
  }

  provide('fps', { fps: readonly(fps), updateFps });
</script>
