import type { Mesh } from 'three';
import { Group, Object3D } from 'three';

const FULL_ROTATION = 2 * Math.PI;

export default class AstronomicalObjectViewModel {

  rotationDurationMinutes: number;
  mesh: Mesh;
  group: Group;
  orbits: [Object3D, number][];

  constructor(rotationDurationMinutes: number, mesh: Mesh) {
    this.rotationDurationMinutes = rotationDurationMinutes;
    this.mesh = mesh;
    this.group = new Group();
    this.orbits = [];
  }

  addToOrbit(aovm: AstronomicalObjectViewModel, orbitDurationMinutes: number) {
    const orbit = new Object3D();
    orbit.add(aovm.mesh);
    orbit.add(aovm.group);
    this.group.add(orbit);
    this.orbits.push([orbit, orbitDurationMinutes]);
  }

  setX(x: number) {
    this.mesh.position.x = x;
    this.group.position.x = x;
  }

  animate(delta: number, durationMsPerSecond: number) {
    const rotationDurationMs = this.rotationDurationMinutes * 60 * 1000;
    const rotationAmount = (delta * (durationMsPerSecond / 1000)) / rotationDurationMs;
    this.mesh.rotation.y = this.mesh.rotation.y + (rotationAmount * FULL_ROTATION);
    this.orbits.forEach(([orbit, orbitDurationMinutes]) => {
      const orbitDurationMs = orbitDurationMinutes * 60 * 1000;
      const orbitAmount = (delta * (durationMsPerSecond / 1000)) / orbitDurationMs;
      orbit.rotation.y = orbit.rotation.y + (orbitAmount * FULL_ROTATION);
    });
  }
}