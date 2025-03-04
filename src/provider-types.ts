import type { Ref } from 'vue';

interface FpsProvider {
  fps: Ref<number>,
  updateFps: (newFps: number) => void;
}

interface CameraData {
  position: { x: number, y: number, z: number },
  rotation: { x: number, y: number, z: number }
}

interface CameraProvider {
  camera: Ref<CameraData>,
  updateCamera: (data: CameraData) => void;
}

export type {
  FpsProvider,
  CameraProvider,
  CameraData
};