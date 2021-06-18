import { mount } from '@vue/test-utils';
import Component from './Component.vue';

describe('Component.vue', () => {
  test('this is a component?', () => {
    const wrapper = mount(Component);
    expect(wrapper.text()).toContain('test');
  });
});
