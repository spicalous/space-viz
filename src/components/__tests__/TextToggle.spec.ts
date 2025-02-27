import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextToggle from '../TextToggle.vue';

describe('TextToggle', () => {

  it('text toggle button text', () => {
    const wrapper = mount(TextToggle, { props: {
      modelValue: true,
      leftFalseText: 'leftFalseText',
      rightTrueText: 'rightTrueText'
    }});
    expect(wrapper.find('.toggle-button:first-child').text()).toBe('leftFalseText');
    expect(wrapper.find('.toggle-button:last-child').text()).toBe('rightTrueText');
  });

  it('clicking first button sets active class', async () => {
    const wrapper = mount(TextToggle, { props: {
      modelValue: true,
      leftFalseText: 'leftFalseText',
      rightTrueText: 'rightTrueText'
    }});
    expect(wrapper.find('.toggle-button:first-child').classes('active')).toBe(false);
    expect(wrapper.find('.toggle-button:last-child').classes('active')).toBe(true);

    await wrapper.find('.toggle-button:first-child').trigger('click');

    expect(wrapper.find('.toggle-button:first-child').classes('active')).toBe(true);
    expect(wrapper.find('.toggle-button:last-child').classes('active')).toBe(false);
  });

  it('clicking second button sets active class', async () => {
    const wrapper = mount(TextToggle, { props: {
      modelValue: false,
      leftFalseText: 'leftFalseText',
      rightTrueText: 'rightTrueText'
    }});
    expect(wrapper.find('.toggle-button:first-child').classes('active')).toBe(true);
    expect(wrapper.find('.toggle-button:last-child').classes('active')).toBe(false);

    await wrapper.find('.toggle-button:last-child').trigger('click');

    expect(wrapper.find('.toggle-button:first-child').classes('active')).toBe(false);
    expect(wrapper.find('.toggle-button:last-child').classes('active')).toBe(true);
  });
});
