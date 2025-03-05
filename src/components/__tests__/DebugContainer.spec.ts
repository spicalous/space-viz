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
    expect(wrapper.find('.pose-container').text()).toBe('camera positionx 1.00y 2.00z 3.00camera rotationx 4.00y 5.00z 6.00');
  });
});
