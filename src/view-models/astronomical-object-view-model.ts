import { Group, Mesh, MeshPhongMaterial, Object3D, SphereGeometry } from 'three';

const FULL_ROTATION = 2 * Math.PI;
const SPHERE_WIDTH_SEGMENTS = 10;
const SPHERE_HEIGHT_SEGMENTS = 10;

export default class AstronomicalObjectViewModel {

  displayName: string;
  equitorialRadiKilometers: number;
  rotationDurationMinutes: number;
  mesh: Mesh;
  group: Group;
  orbits: [Object3D, number][];

  constructor(displayName: string,
              equitorialRadiKilometers: number,
              rotationDurationMinutes: number,
              materialProperties: object) {
    this.displayName = displayName;
    this.equitorialRadiKilometers = equitorialRadiKilometers;
    this.rotationDurationMinutes = rotationDurationMinutes;
    this.mesh = new Mesh(
      new SphereGeometry(equitorialRadiKilometers, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS),
      new MeshPhongMaterial(materialProperties))
    this.group = new Group();
    this.orbits = [];
  }

  getEquitorialRadiKilometers() {
    return this.equitorialRadiKilometers;
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
    if (this.rotationDurationMinutes > 0) {
      const rotationDurationMs = this.rotationDurationMinutes * 60 * 1000;
      const rotationAmount = (delta * (durationMsPerSecond / 1000)) / rotationDurationMs;
      this.mesh.rotation.y = this.mesh.rotation.y + (rotationAmount * FULL_ROTATION);
    }
    this.orbits.forEach(([orbit, orbitDurationMinutes]) => {
      const orbitDurationMs = orbitDurationMinutes * 60 * 1000;
      const orbitAmount = (delta * (durationMsPerSecond / 1000)) / orbitDurationMs;
      orbit.rotation.y = orbit.rotation.y + (orbitAmount * FULL_ROTATION);
    });
  }
}