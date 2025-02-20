<script setup lang="ts">
  import type { WebGLRenderer } from 'three';
  import { useTemplateRef, onMounted, ref } from 'vue';
  import * as THREE from 'three';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';

  const canvas = useTemplateRef('ref-canvas');
  const durationOneYearShouldTakeMs = ref(5000);
  const objects: AstronomicalObjectViewModel[] = [];
  const camera = initCamera();
  const scene = initScene();

  onMounted(() => {
    const renderer: WebGLRenderer = new THREE.WebGLRenderer({ canvas: canvas.value! });
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
      objects.forEach(obj => obj.animate(delta, durationOneYearShouldTakeMs.value));
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  });

  function initCamera() {
    const fieldOfViewDegrees = 75;
    const aspectRatio = getAspectRatio();
    const nearClippingPane = 0.1;
    const farClippingPane = 1000;
    const camera = new THREE.PerspectiveCamera(fieldOfViewDegrees, aspectRatio, nearClippingPane, farClippingPane);
    camera.position.z = 300;
    return camera;
  }

  function initScene() {
    const sun = new AstronomicalObjectViewModel(
      36072,
      new THREE.Mesh(createSphereGeometry(10), new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })));
    const mercury = new AstronomicalObjectViewModel(
      84450,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0x6E6E6E, emissive: 0x6E6E6E })));
    const venus = new AstronomicalObjectViewModel(
      349946,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0xE8DAB2, emissive: 0xE8DAB2 })));
    const earth = new AstronomicalObjectViewModel(
      1436,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0x2F6B9A, emissive: 0x2F6B9A })));
    const mars = new AstronomicalObjectViewModel(
      1477,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0xA64428, emissive: 0xA64428 })));
    const jupiter = new AstronomicalObjectViewModel(
      596,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0xD9A774, emissive: 0xD9A774 })));
    const saturn = new AstronomicalObjectViewModel(
      639,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0xD4A55C, emissive: 0xD4A55C })));
    const uranus = new AstronomicalObjectViewModel(
      1034,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0x88C7C7, emissive: 0x88C7C7 })));
    const neptune = new AstronomicalObjectViewModel(
      967,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 })));
    const pluto = new AstronomicalObjectViewModel(
      9197,
      new THREE.Mesh(createSphereGeometry(5), new THREE.MeshPhongMaterial({ color: 0xC68E76, emissive: 0xC68E76 })));

    const moon = new AstronomicalObjectViewModel(
      39343,
      new THREE.Mesh(createSphereGeometry(2), new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })));

    objects.push(sun);
    objects.push(mercury);
    objects.push(venus);
    objects.push(earth);
    objects.push(mars);
    objects.push(jupiter);
    objects.push(saturn);
    objects.push(uranus);
    objects.push(neptune);
    objects.push(pluto);
    objects.push(moon);

    const scene = new THREE.Scene();
    scene.add(sun.mesh);
    scene.add(sun.group);

    sun.addToOrbit(mercury, 126676);
    sun.addToOrbit(venus, 323568);
    sun.addToOrbit(earth, 525960);
    sun.addToOrbit(mars, 989251);
    sun.addToOrbit(jupiter, 6242514);
    sun.addToOrbit(saturn, 15500087);
    sun.addToOrbit(uranus, 44219318);
    sun.addToOrbit(neptune, 86706432);
    sun.addToOrbit(pluto, 130453946);
    mercury.setX(20);
    venus.setX(40);
    earth.setX(60);
    mars.setX(80);
    jupiter.setX(100);
    saturn.setX(120);
    uranus.setX(140);
    neptune.setX(160);
    pluto.setX(180);

    earth.addToOrbit(moon, 39343);
    moon.setX(8);

    const intensity = 3;
    const light = new THREE.PointLight(0xFFFFFF, intensity);
    scene.add(light);
    return scene;
  }

  function createSphereGeometry(radius: number) {
    const widthSegments = 6;
    const heightSegments = 6;
    return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  }

  function resizeRendererToDisplaySize(canvas: HTMLCanvasElement, renderer: WebGLRenderer) {
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
