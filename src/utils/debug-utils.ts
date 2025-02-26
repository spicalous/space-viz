import type { Object3D } from 'three';
import { AxesHelper, GridHelper } from 'three';

export function debugFlagEnabled(): boolean {
  try {
    const params = new URLSearchParams(document.location.search);
    return params.get('debug') !== null;
  }
  catch (e) {
    console.error('Failed to check debug flag', e);
  }
  return false;
}

export function addGridHelper(object: Object3D, size: number) {
  const gridHelper = new GridHelper(size, size);
  gridHelper.material.depthTest = false;
  gridHelper.renderOrder = 1;
  object.add(gridHelper);
}

export function addAxesHelper(object: Object3D, size: number) {
  const axesHelper = new AxesHelper(size);
  // https://threejs.org/docs/index.html#api/en/materials/Material.depthTest
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c03bddd4d3c7774d00fa256a9e165d68c7534ccc/types/three/src/materials/Material.d.ts#L45
  // @ts-expect-error 2025-FEB-22 depthTest exists
  axesHelper.material.depthTest = false;
  axesHelper.renderOrder = 2;
  object.add(axesHelper);
}