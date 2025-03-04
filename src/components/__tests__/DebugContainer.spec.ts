import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DebugContainer from '../DebugContainer.vue';

describe('DebugContainer', () => {

  it('displays debug info', () => {
    const wrapper = mount(DebugContainer, {
      global: {
        provide: {
          'debug:fps': { fps: 42 },
          'debug:poses': { poses: [{ name: 'camera', position: { x: 1, y: 2, z: 3 }, rotation: { x: 4, y: 5, z: 6 }}]}
        }
      },
      props: { axesGridHelpable: [] }
    });
    expect(wrapper.find('div[data-test="debug-container--fps"]').text()).toBe('42.0 FPS');
    expect(wrapper.find('div[data-test="debug-container--position-camera"]').text()).toBe('camera position x 1.0 y 2.0 z 3.0');
    expect(wrapper.find('div[data-test="debug-container--rotation-camera"]').text()).toBe('camera rotation x 4.0 y 5.0 z 6.0');
  });
});
