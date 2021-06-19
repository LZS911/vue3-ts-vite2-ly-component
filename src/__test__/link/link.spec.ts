import { mount } from '@vue/test-utils';
import LinkApp from './index.vue';

const wrapper = mount(LinkApp);

describe('Link.vue', () => {
  test('equal profile text and "My Profile"', () => {
    expect(wrapper.get('#profile').text()).toEqual('My Profile');
  });

  test('admin cannot render', () => {
    expect(wrapper.find('#admin').exists()).toBe(false);
  });

  test('render an admin link', () => {
    const Wrapper = mount(LinkApp, {
      data() {
        return {
          admin: true
        };
      }
    });
  });
});
