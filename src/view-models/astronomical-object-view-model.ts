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

  animate(delta: number, durationOneYearShouldTakeMs: number) {
    const rotationDurationYears = this.rotationDurationMinutes / 60 / 24 / 365;
    const rotationDuration = durationOneYearShouldTakeMs * rotationDurationYears;
    const rotationFraction = delta / rotationDuration;
    this.mesh.rotation.z = this.mesh.rotation.z + rotationFraction * FULL_ROTATION;

    this.orbits.forEach(([orbit, orbitDurationMinutes]) => {
      const orbitDurationYears = orbitDurationMinutes / 60 / 24 / 365;
      const orbitDuration = durationOneYearShouldTakeMs * orbitDurationYears;
      const orbitFraction = delta / orbitDuration;
      orbit.rotation.z = orbit.rotation.z + orbitFraction * FULL_ROTATION;
    });
  }
}