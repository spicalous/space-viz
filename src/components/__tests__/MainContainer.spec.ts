import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MainContainer from '../MainContainer.vue'

describe('MainContainer', () => {

  const globalMountOptions = {
    global: {
      stubs: { CanvasContainer: true },
      provide: {
        'debug:fps': { fps: 42 },
        'debug:camera': { camera: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }}}
      }
    }
  };

  it('debug is disabled by default', () => {
    const wrapper = mount(MainContainer, { props: { debugEnabled: false }, ...globalMountOptions });
    expect(wrapper.find('#debug-container').exists()).toBe(false);
  });

  it('renders debug container when debug flag is true', () => {
    const wrapper = mount(MainContainer, { props: { debugEnabled: true }, ...globalMountOptions });
    expect(wrapper.find('#debug-container').exists()).toBe(true);
  });
});
