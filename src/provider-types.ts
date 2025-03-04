import type { Ref } from 'vue';

interface FpsProvider {
  fps: Ref<number>,
  updateFps: (newFps: number) => void;
}

interface Pose {
  name: string,
  position: { x: number, y: number, z: number },
  rotation: { x: number, y: number, z: number }
}

interface PoseProvider {
  poses: Ref<Pose[]>,
  updatePoses: (newPoses: Pose[]) => void;
}

export type {
  FpsProvider,
  Pose,
  PoseProvider
};