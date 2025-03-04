<script setup lang="ts">
  import type { PerspectiveCamera, Scene } from 'three';
  import type { FpsProvider, CameraProvider } from './../provider-types.ts';
  import { inject, ref, useTemplateRef, onMounted } from 'vue';
  import { WebGLRenderer } from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { Speed, SPEED_TO_MS_PER_MS } from './../models/speed.ts';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model.ts';

  const ONE_SECOND_MS = 1000;

  const props = defineProps<{
    objects: AstronomicalObjectViewModel[],
    camera: PerspectiveCamera,
    scene: Scene,
    speed: Speed,
    onResize: () => void
  }>();

  const { updateFps } = inject('debug:fps') as FpsProvider;
  const { updateCamera } = inject('debug:camera') as CameraProvider;
  const orbitControlsRef = ref<OrbitControls>();
  const canvas = useTemplateRef('ref-canvas');

  defineExpose({ orbitControlsRef });

  onMounted(() => {
    const renderer = new WebGLRenderer({ canvas: canvas.value! });
    orbitControlsRef.value = new OrbitControls(props.camera, canvas.value!);
    orbitControlsRef.value.addEventListener('change', onControlsChanged);
    let lastAnimationTimestamp: number | undefined;
    let lastFpsTimestamp = performance.now();
    let frameCount = 0;

    function animate(timestamp: number) {
      const delta = lastAnimationTimestamp ? timestamp - lastAnimationTimestamp : 0;
      lastAnimationTimestamp = timestamp;
      if (delta === 0) {
        return;
      }

      if (resizeRendererToDisplaySize(canvas.value!, renderer)) {
        props.onResize();
      }

      props.objects.forEach(obj => obj.animate(delta, SPEED_TO_MS_PER_MS[props.speed]));

      orbitControlsRef.value!.update();
      renderer.render(props.scene, props.camera);

      const fpsDelta = timestamp - lastFpsTimestamp;
      frameCount++;
      if (fpsDelta >= ONE_SECOND_MS) {
        updateFps(frameCount / (fpsDelta / ONE_SECOND_MS));
        frameCount = 0;
        lastFpsTimestamp = timestamp;
      }
    }
    renderer.setAnimationLoop(animate);
  });

  function onControlsChanged() {
    updateCamera({
      position: props.camera.position,
      rotation: props.camera.rotation
    });
  }

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
