import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UserControlsContainer from '../UserControlsContainer.vue';
import { Speed } from '../../models/speed.ts';

describe('UserControlsContainer', () => {

  it('sets speed via props', () => {
    const wrapper = mount(UserControlsContainer, { props: {
      currentSpeed: Speed.ONE_MINUTE_PER_SECOND,
      equidistantOrbits: true,
      lookAtControlData: []
    }});
    expect(wrapper.find('.speed-controls span').text()).toBe('1 minute / sec');
  });

  it('decrement speed is disabled when lowest speed is selected', async () => {
    const wrapper = mount(UserControlsContainer, { props: {
      currentSpeed: Speed.ONE_MINUTE_PER_SECOND,
      'onUpdate:currentSpeed': (e) => wrapper.setProps({ currentSpeed: e }),
      equidistantOrbits: true,
      lookAtControlData: []
    }});
    // @ts-expect-error disabled is an attribute of element
    expect(wrapper.findAll('.speed-controls button')[0].element.disabled).toBe(false);

    await wrapper.findAll('.speed-controls button')[0].trigger('click');

    // @ts-expect-error disabled is an attribute of element
    expect(wrapper.findAll('.speed-controls button')[0].element.disabled).toBe(true);
  });

  it('increment speed is disabled when highest speed is selected', async () => {
    const wrapper = mount(UserControlsContainer, { props: {
      currentSpeed: Speed.FOUR_WEEKS_PER_SECOND,
      'onUpdate:currentSpeed': (e) => wrapper.setProps({ currentSpeed: e }),
      equidistantOrbits: true,
      lookAtControlData: []
    }});
    // @ts-expect-error disabled is an attribute of element
    expect(wrapper.findAll('.speed-controls button')[1].element.disabled).toBe(false);

    await wrapper.findAll('.speed-controls button')[1].trigger('click');

    // @ts-expect-error disabled is an attribute of element
    expect(wrapper.findAll('.speed-controls button')[1].element.disabled).toBe(true);
  });
});
