<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import { PerspectiveCamera, PointLight, Scene, Vector3 } from 'three';
  import CanvasContainer from './CanvasContainer.vue';
  import UserControlsContainer from './UserControlsContainer.vue';
  import DebugContainer from './DebugContainer.vue';
  import { AstronomicalObjects, DISPLAY_NAMES, EQUITORIAL_RADI_KILOMETERS, ROTATION_MINUTES, SUN_ORBIT_DURATION_MINUTES } from './../models/astronomical-objects.ts';
  import { Speed } from './../models/speed.ts';
  import AstronomicalObjectViewModel from './../view-models/astronomical-object-view-model.ts';

  const props = defineProps<{
    debugEnabled: boolean
  }>();

  const speed = ref(Speed.FOUR_WEEKS_PER_SECOND);
  const equidistantOrbits = ref(true);
  const canvasContainerRef = useTemplateRef('ref-canvas-container')

  const MATERIAL_PROPERTIES = {
    [AstronomicalObjects.SUN]: { emissive: 0xFFFF00 },
    [AstronomicalObjects.MERCURY]: { color: 0x6E6E6E, emissive: 0x6E6E6E },
    [AstronomicalObjects.VENUS]: { color: 0xE8DAB2, emissive: 0xE8DAB2 },
    [AstronomicalObjects.EARTH]: { color: 0x2F6B9A, emissive: 0x2F6B9A },
    [AstronomicalObjects.MARS]: { color: 0xA64428, emissive: 0xA64428 },
    [AstronomicalObjects.JUPITER]: { color: 0xD9A774, emissive: 0xD9A774 },
    [AstronomicalObjects.SATURN]: { color: 0xD4A55C, emissive: 0xD4A55C },
    [AstronomicalObjects.URANUS]: { color: 0x88C7C7, emissive: 0x88C7C7 },
    [AstronomicalObjects.NEPTUNE]: { color: 0x2233FF, emissive: 0x112244 },
    [AstronomicalObjects.PLUTO]: { color: 0xC68E76, emissive: 0xC68E76 },
    [AstronomicalObjects.MOON]: { color: 0x888888, emissive: 0x222222 }
  }

  const objects: { [key in AstronomicalObjects]: AstronomicalObjectViewModel } = {} as { [key in AstronomicalObjects]: AstronomicalObjectViewModel };

  for (const key of Object.keys(AstronomicalObjects) as Array<keyof typeof AstronomicalObjects>) {
    objects[key] = new AstronomicalObjectViewModel(
      DISPLAY_NAMES[key],
      EQUITORIAL_RADI_KILOMETERS[key],
      ROTATION_MINUTES[key],
      MATERIAL_PROPERTIES[key]);
  }

  const camera = initCamera();
  const scene = initScene();

  function initScene() {
    const sun = objects[AstronomicalObjects.SUN];
    const scene = new Scene();
    scene.add(sun.mesh);
    scene.add(sun.group);

    const distanceBetweenPlanets = 10;
    let distanceFromSun = objects[AstronomicalObjects.SUN].getEquitorialRadiKilometers();
    for (const key of Object.keys(SUN_ORBIT_DURATION_MINUTES) as Array<keyof typeof SUN_ORBIT_DURATION_MINUTES>) {
      const planet = objects[key];
      sun.addToOrbit(planet, SUN_ORBIT_DURATION_MINUTES[key]);
      distanceFromSun = distanceFromSun + distanceBetweenPlanets + planet.getEquitorialRadiKilometers();
      planet.setX(distanceFromSun);
      distanceFromSun = distanceFromSun + planet.getEquitorialRadiKilometers()
    }

    const moon = objects[AstronomicalObjects.MOON];
    const earth = objects[AstronomicalObjects.EARTH];
    objects[AstronomicalObjects.EARTH].addToOrbit(moon, 39343);
    moon.setX(earth.getEquitorialRadiKilometers() + 2 + moon.getEquitorialRadiKilometers());

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
      :objects="Object.values(objects)"
      :camera="camera"
      :scene="scene"
      :speed="speed"
      :on-resize="onResize"
    />
    <UserControlsContainer
      v-model:current-speed="speed"
      v-model:equidistant-orbits="equidistantOrbits"
      :look-at-control-data="[
        objects[AstronomicalObjects.SUN],
        objects[AstronomicalObjects.MERCURY],
        objects[AstronomicalObjects.VENUS],
        objects[AstronomicalObjects.EARTH],
        objects[AstronomicalObjects.MARS],
        objects[AstronomicalObjects.JUPITER],
        objects[AstronomicalObjects.SATURN],
        objects[AstronomicalObjects.URANUS],
        objects[AstronomicalObjects.NEPTUNE],
        objects[AstronomicalObjects.PLUTO]
      ]"
      @on:recenter="recenter"
      @on:look-at="lookAt"
    />
    <DebugContainer
      v-if="props.debugEnabled"
      :axes-grid-helpable="Object.values(objects)"
    />
  </main>
</template>

<style scoped>
</style>
