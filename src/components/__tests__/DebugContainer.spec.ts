import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DebugContainer from '../DebugContainer.vue';

describe('DebugContainer', () => {

  it('displays fps info', () => {
    const wrapper = mount(DebugContainer, { props: { axesGridHelpable: [], fps: 42 }});
    expect(wrapper.find('div').text()).toBe('42.0 FPS');
  });
});
