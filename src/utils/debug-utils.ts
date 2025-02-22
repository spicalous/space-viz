import type { Object3D } from 'three';
import { AxesHelper } from 'three';

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

export function addAxesHelper(object: Object3D, size: number) {
  const axesHelper = new AxesHelper(size);
  // https://threejs.org/docs/index.html#api/en/materials/Material.depthTest
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c03bddd4d3c7774d00fa256a9e165d68c7534ccc/types/three/src/materials/Material.d.ts#L45
  // @ts-expect-error 2025-FEB-22 depthTest exists
  axesHelper.material.depthTest = false;
  axesHelper.renderOrder = 1;
  object.add(axesHelper);
}