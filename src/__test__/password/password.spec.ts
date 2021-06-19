import { mount } from '@vue/test-utils';
import Password from './index.vue';

describe('Password.vue', () => {
  test(' render error by password length less than minLength', async () => {
    const wrapper = mount(Password, {
      props: {
        minLength: 6
      }
    });
    await wrapper.find('input').setValue('12345');
    expect(wrapper.html()).toContain('Password must be at least 6 characters.');
  });
  test('set props', async () => {
    const wrapper = mount(Password);
    await wrapper.setProps({
      minLength: 7
    });
    await wrapper.find('input').setValue('12345');
    expect(wrapper.html()).toContain('Password must be at least');
  });
});
