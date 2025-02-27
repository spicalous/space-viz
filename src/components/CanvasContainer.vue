<script setup lang="ts">
  import type { PerspectiveCamera, Scene } from 'three';
  import { useTemplateRef, onMounted } from 'vue';
  import { WebGLRenderer } from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { Speed, SPEED_TO_MS_PER_MS } from './../models/speed.ts';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model.ts';

  const props = defineProps<{
    objects: AstronomicalObjectViewModel[],
    camera: PerspectiveCamera,
    scene: Scene,
    speed: Speed,
    onResize: () => void
  }>();
  const emit = defineEmits<{
    'update:fps': [newFps: number]
  }>();

  const canvas = useTemplateRef('ref-canvas');

  onMounted(() => {
    const renderer = new WebGLRenderer({ canvas: canvas.value! });
    const controls = new OrbitControls(props.camera, canvas.value!);
    let lastAnimationTimestamp: number | undefined;
    let lastFpsTimestamp = performance.now();
    let frameCount = 0;

    function animate(timestamp: number) {
      const delta = lastAnimationTimestamp ? timestamp - lastAnimationTimestamp : 0;
      const fpsDelta = (timestamp - lastFpsTimestamp) / 1000;
      lastAnimationTimestamp = timestamp;
      if (delta === 0) {
        return;
      }
      frameCount++;
      if (fpsDelta >= 1) {
        emit('update:fps', frameCount / fpsDelta);
        frameCount = 0;
        lastFpsTimestamp = timestamp;
      }

      if (resizeRendererToDisplaySize(canvas.value!, renderer)) {
        props.onResize();
      }
      props.objects.forEach(obj => obj.animate(delta, SPEED_TO_MS_PER_MS[props.speed]));
      controls.update();
      renderer.render(props.scene, props.camera);
    }
    renderer.setAnimationLoop(animate);
  });

  function resizeRendererToDisplaySize(canvas: HTMLCanvasElement, renderer: WebGLRenderer): boolean {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      return true;
    }
    return false;
  }
</script>

<template>
  <canvas ref="ref-canvas"></canvas>
</template>
