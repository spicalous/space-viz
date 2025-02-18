<script setup lang="ts">
  import { useTemplateRef, onMounted } from 'vue';
  import * as THREE from 'three';

  const canvas = useTemplateRef('ref-canvas');

  const scene = new THREE.Scene();
  const fieldOfViewDegrees = 75;
  const aspectRatio = getAspectRatio();
  const nearClippingPane = 0.1;
  const farClippingPane = 1000;
  const camera = new THREE.PerspectiveCamera(fieldOfViewDegrees, aspectRatio, nearClippingPane, farClippingPane);

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  onMounted(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value });

    function animate() {
      if (resizeRendererToDisplaySize(canvas, renderer)) {
        camera.aspect = getAspectRatio();
        camera.updateProjectionMatrix();
      }
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
    renderer.setAnimationLoop( animate );
  });

  function resizeRendererToDisplaySize(canvas, renderer) {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      return true;
    }
    return false;
  }

  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }
</script>

<template>
  <canvas ref="ref-canvas"></canvas>
</template>

<style scoped>
</style>
