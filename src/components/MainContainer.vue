<script setup lang="ts">
  import { ref } from 'vue';
  import { Mesh, MeshPhongMaterial, PointLight, Scene, SphereGeometry } from 'three';
  import CanvasContainer from './CanvasContainer.vue';
  import UserControlsContainer from './UserControlsContainer.vue';
  import DebugContainer from './DebugContainer.vue';
  import { Speed } from './../models/speed.ts';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model';

  const props = defineProps<{
    debugEnabled: boolean
  }>();

  const speed = ref(Speed.FOUR_WEEKS_PER_SECOND);
  const equidistantOrbits = ref(true);
  const fps = ref(0);
  const objects: AstronomicalObjectViewModel[] = [];
  const scene = initScene();

  function initScene() {
    const sun = new AstronomicalObjectViewModel(
      36072,
      new Mesh(createSphereGeometry(10), new MeshPhongMaterial({ emissive: 0xFFFF00 })));
    const mercury = new AstronomicalObjectViewModel(
      84450,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0x6E6E6E, emissive: 0x6E6E6E })));
    const venus = new AstronomicalObjectViewModel(
      349946,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0xE8DAB2, emissive: 0xE8DAB2 })));
    const earth = new AstronomicalObjectViewModel(
      1436,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0x2F6B9A, emissive: 0x2F6B9A })));
    const mars = new AstronomicalObjectViewModel(
      1477,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0xA64428, emissive: 0xA64428 })));
    const jupiter = new AstronomicalObjectViewModel(
      596,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0xD9A774, emissive: 0xD9A774 })));
    const saturn = new AstronomicalObjectViewModel(
      639,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0xD4A55C, emissive: 0xD4A55C })));
    const uranus = new AstronomicalObjectViewModel(
      1034,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0x88C7C7, emissive: 0x88C7C7 })));
    const neptune = new AstronomicalObjectViewModel(
      967,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 })));
    const pluto = new AstronomicalObjectViewModel(
      9197,
      new Mesh(createSphereGeometry(5), new MeshPhongMaterial({ color: 0xC68E76, emissive: 0xC68E76 })));

    const moon = new AstronomicalObjectViewModel(
      39343,
      new Mesh(createSphereGeometry(2), new MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })));

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

    const scene = new Scene();
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

    const intensity = 10000;
    const distance = 5000;
    const light = new PointLight(0xFFFFFF, intensity, distance);
    scene.add(light);
    return scene;
  }

  function createSphereGeometry(radius: number): SphereGeometry {
    const widthSegments = 10;
    const heightSegments = 10;
    return new SphereGeometry(radius, widthSegments, heightSegments);
  }

</script>

<template>
  <main id="main-container">
    <CanvasContainer
      :objects="objects"
      :scene="scene"
      :speed="speed"
      @update:fps="(newFps) => fps = newFps"
    />
    <UserControlsContainer
      v-model:current-speed="speed"
      v-model:equidistant-orbits="equidistantOrbits"
    />
    <DebugContainer
      v-if="props.debugEnabled"
      :fps="fps"
      :axes-grid-helpable="objects"
    />
  </main>
</template>

<style scoped>
</style>
