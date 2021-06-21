import { mount } from '@vue/test-utils';
import VShow from './index.vue';

describe('vShow.vue', () => {
  test('this is a question', async () => {
    const wrapper = mount(VShow, {
      attachTo: 'body',
      props: {
        appendToBody: true
      }
    });

    const div = wrapper.find('.show-div');
    const btn = wrapper.find('button');
    const app = wrapper.findComponent(VShow);

    console.log(app);
    expect(div.exists()).toBe(true);
    expect(btn.exists()).toBe(true);
    expect(app.vm.show).toBe(false);
    expect(div.isVisible()).toBe(false);
    await btn.trigger('click');
    expect(app.vm.show).toBe(true);
    expect(div.isVisible()).toBe(true);
  });
});
