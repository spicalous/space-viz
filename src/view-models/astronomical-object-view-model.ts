import { Group, Mesh, MeshPhongMaterial, Object3D, SphereGeometry } from 'three';

const FULL_ROTATION = 2 * Math.PI;
const SPHERE_WIDTH_SEGMENTS = 10;
const SPHERE_HEIGHT_SEGMENTS = 10;

export default class AstronomicalObjectViewModel {

  displayName: string;
  rotationDurationMinutes: number;
  previousScale: number;
  mesh: Mesh;
  group: Group;
  orbits: [Object3D, number][];

  constructor(displayName: string,
              rotationDurationMinutes: number,
              materialProperties: object) {
    this.displayName = displayName;
    this.rotationDurationMinutes = rotationDurationMinutes;
    this.previousScale = 1;
    this.mesh = new Mesh(
      new SphereGeometry(this.previousScale, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS),
      new MeshPhongMaterial(materialProperties))
    this.group = new Group();
    this.orbits = [];
  }

  scale(newScale: number) {
    const backToOne = 1 / this.previousScale;
    this.mesh.geometry.scale(backToOne, backToOne, backToOne);
    this.mesh.geometry.scale(newScale, newScale, newScale);
    this.previousScale = newScale;
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