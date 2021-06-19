import { mount } from '@vue/test-utils';
import Count from './index.vue';

const wrapper = mount(Count);

wrapper.find('button').trigger('click');
wrapper.find('button').trigger('click');

describe('Count.vue', () => {
  test('emits an event when clicked', () => {
    expect(wrapper.emitted()).toHaveProperty('increment');
  });

  test('emit increment get count value', () => {
    const event = wrapper.emitted('increment');
    expect(event).toHaveLength(2);
    expect(event![0]).toEqual([1]);
    expect(event![1]).toEqual([2]);
  });

  test('emit an event get obj', () => {
    const event = wrapper.emitted('emitObject');
    expect(event).toHaveLength(2);
    expect(event![0]).toEqual([{ count: 1, isEven: false }]);
    expect(event![1]).toEqual([{ count: 2, isEven: true }]);
  });
});
