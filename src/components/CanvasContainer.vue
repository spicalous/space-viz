<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import * as THREE from 'three';

const canvas = useTemplateRef('ref-canvas');

const scene = new THREE.Scene();
const fieldOfViewDegrees = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
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
  renderer.setSize( window.innerWidth, window.innerHeight );

  function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  renderer.setAnimationLoop( animate );
});
</script>

<template>
  <canvas ref="ref-canvas"></canvas>
</template>

<style scoped>
</style>
