<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import { PerspectiveCamera, PointLight, Scene, Vector3 } from 'three';
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
  const canvasContainerRef = useTemplateRef('ref-canvas-container')

                                                        // | radius 100km | rotation mins | mesh properties                       |
                                                        // |==============|===============|=======================================|
  const sun = new AstronomicalObjectViewModel("Sun",                   10,          36072, { emissive: 0xFFFF00 });
  const mercury = new AstronomicalObjectViewModel("Mercury",            5,          84450, { color: 0x6E6E6E, emissive: 0x6E6E6E });
  const venus = new AstronomicalObjectViewModel("Venus",                5,         349946, { color: 0xE8DAB2, emissive: 0xE8DAB2 });
  const earth = new AstronomicalObjectViewModel("Earth",                5,           1436, { color: 0x2F6B9A, emissive: 0x2F6B9A });
  const mars = new AstronomicalObjectViewModel("Mars",                  5,           1477, { color: 0xA64428, emissive: 0xA64428 });
  const jupiter = new AstronomicalObjectViewModel("Jupiter",            5,            596, { color: 0xD9A774, emissive: 0xD9A774 });
  const saturn = new AstronomicalObjectViewModel("Saturn",              5,            639, { color: 0xD4A55C, emissive: 0xD4A55C });
  const uranus = new AstronomicalObjectViewModel("Uranus",              5,           1034, { color: 0x88C7C7, emissive: 0x88C7C7 });
  const neptune = new AstronomicalObjectViewModel("Neptune",            5,            967, { color: 0x2233FF, emissive: 0x112244 });
  const pluto = new AstronomicalObjectViewModel("Pluto",                5,           9197, { color: 0xC68E76, emissive: 0xC68E76 });
  const moon = new AstronomicalObjectViewModel("Moon",                  2,          39343, { color: 0x888888, emissive: 0x222222 });

  const objects: AstronomicalObjectViewModel[] = [
    sun,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    moon
  ];
  const camera = initCamera();
  const scene = initScene();

  function initScene() {
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

  function initCamera(): PerspectiveCamera {
    const fieldOfViewDegrees = 75;
    const aspectRatio = getAspectRatio();
    const nearClippingPane = 0.1;
    const farClippingPane = 1000;
    const camera = new PerspectiveCamera(fieldOfViewDegrees, aspectRatio, nearClippingPane, farClippingPane);
    camera.position.set(0, 300, 0);
    camera.up.set(0, 0, 1);
    return camera;
  }

  function onResize() {
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
  }

  function getAspectRatio(): number {
    return window.innerWidth / window.innerHeight;
  }

  const lookAtControlData: AstronomicalObjectViewModel[] = [
    sun,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto
  ];

  function recenter() {
    if (canvasContainerRef && canvasContainerRef.value && canvasContainerRef.value.orbitControlsRef) {
      canvasContainerRef.value.orbitControlsRef.target.x = 0;
      canvasContainerRef.value.orbitControlsRef.target.y = 0;
      canvasContainerRef.value.orbitControlsRef.target.z = 0;
      camera.position.x = 0;
      camera.position.y = 300;
      camera.position.z = 0;
    }
  }

  function lookAt(object: AstronomicalObjectViewModel) {
    if (canvasContainerRef && canvasContainerRef.value && canvasContainerRef.value.orbitControlsRef) {
      const targetPosition = new Vector3();
      object.mesh.getWorldPosition(targetPosition);
      canvasContainerRef.value.orbitControlsRef.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
    }
  }
</script>

<template>
  <main id="main-container">
    <CanvasContainer
      ref="ref-canvas-container"
      :objects="objects"
      :camera="camera"
      :scene="scene"
      :speed="speed"
      :on-resize="onResize"
    />
    <UserControlsContainer
      v-model:current-speed="speed"
      v-model:equidistant-orbits="equidistantOrbits"
      :look-at-control-data="lookAtControlData"
      @on:recenter="recenter"
      @on:look-at="lookAt"
    />
    <DebugContainer
      v-if="props.debugEnabled"
      :axes-grid-helpable="objects"
    />
  </main>
</template>

<style scoped>
</style>
