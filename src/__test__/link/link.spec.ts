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

  test('render an admin link', async () => {
    await wrapper.get('#showAdmin').trigger('click');
    expect(wrapper.get('#admin').text()).toEqual('Admin');
  });

  test('does not show the userDrop, but can get text', async () => {
    expect(wrapper.get('#userDrop').isVisible()).toBe(false);
    expect(wrapper.get('#userDrop').text()).toEqual('userDrop');
    const btn = wrapper.find('#showUserDrop');
    await btn.trigger('click');
    expect(wrapper.findComponent(LinkApp).vm.userDrop).toBe(true);
    expect(wrapper.get('#userDrop').isVisible()).toBe(true);
  });
});
