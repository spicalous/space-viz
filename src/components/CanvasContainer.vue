<script setup lang="ts">
  import type { Scene } from 'three';
  import { useTemplateRef, onMounted } from 'vue';
  import { PerspectiveCamera, WebGLRenderer } from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';

  const props = defineProps<{
    objects: AstronomicalObjectViewModel[],
    scene: Scene,
    oneYearDurationMs: number
  }>();

  const canvas = useTemplateRef('ref-canvas');
  const camera = initCamera();

  onMounted(() => {
    const renderer = new WebGLRenderer({ canvas: canvas.value! });
    const controls = new OrbitControls(camera, canvas.value!);
    let lastAnimationTimestamp: number | undefined;

    function animate(timestamp: number) {
      const delta = lastAnimationTimestamp ? timestamp - lastAnimationTimestamp : 0;
      lastAnimationTimestamp = timestamp;
      if (delta === 0) {
        return;
      }

      if (resizeRendererToDisplaySize(canvas.value!, renderer)) {
        camera.aspect = getAspectRatio();
        camera.updateProjectionMatrix();
      }
      props.objects.forEach(obj => obj.animate(delta, props.oneYearDurationMs));
      controls.update();
      renderer.render(props.scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });

  function initCamera(): PerspectiveCamera {
    const fieldOfViewDegrees = 75;
    const aspectRatio = getAspectRatio();
    const nearClippingPane = 0.1;
    const farClippingPane = 1000;
    const camera = new PerspectiveCamera(fieldOfViewDegrees, aspectRatio, nearClippingPane, farClippingPane);
    camera.position.z = 300;
    return camera;
  }

  function resizeRendererToDisplaySize(canvas: HTMLCanvasElement, renderer: WebGLRenderer): boolean {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      return true;
    }
    return false;
  }

  function getAspectRatio(): number {
    return window.innerWidth / window.innerHeight;
  }
</script>

<template>
  <canvas ref="ref-canvas"></canvas>
</template>

<style scoped>
</style>
