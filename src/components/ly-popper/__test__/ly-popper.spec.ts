import { mount, VueWrapper } from '@vue/test-utils';
import LyPopper from '../index.vue';
import { h } from 'vue';

type UnknownProps = Record<string, unknown>;
const TEST_TRIGGER = 'test-trigger';
const AXIOM = 'popper';
const POPPER = '[role="popper"]';
const MOUSE_ENTER_EVENT = 'mouseenter';
const MOUSE_LEAVE_EVENT = 'mouseleave';
const CLICK_EVENT = 'click';
const FOCUS_EVENT = 'focus';
const BLUR_EVENT = 'blur';
const DISPLAY_NONE = 'display: none';

const Wrapper = (props: UnknownProps, { slots }: any) => h('div', {}, h(LyPopper, props, slots));

const _mount = (props: UnknownProps = {}, slots = {}): VueWrapper<any> =>
  mount(Wrapper, {
    props,
    slots: {
      trigger: () =>
        h('div', {
          class: TEST_TRIGGER
        }),
      ...slots
    },
    attachTo: 'body'
  });

describe('ly-popper.vue', () => {
  test('render component', () => {
    let wrapper = _mount(
      {
        appendBody: false
      },
      {
        default: () => AXIOM
      }
    );
    expect(wrapper.html()).toContain(AXIOM);
    expect(wrapper.find(POPPER).exists()).toBe(true);

    wrapper = _mount({
      content: AXIOM,
      appendBody: false
    });
    expect(wrapper.text()).toContain(AXIOM);
  });

  test('render append to body', () => {
    let wrapper = _mount();
    expect(wrapper.find(POPPER).exists()).toBe(false);

    wrapper = _mount({
      appendBody: false
    });
    expect(wrapper.find(POPPER).exists()).toBe(true);
  });

  test('popper show or hide by trigger', async () => {
    const wrapper = _mount({
      appendBody: false
    });

    const $popper = wrapper.find(POPPER);
    expect($popper.attributes('style')).toContain(DISPLAY_NONE);
    const popper = wrapper.findComponent(LyPopper);
    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(true);

    //Transition
    setTimeout(() => {
      expect($popper.attributes('style')).not.toContain(DISPLAY_NONE);
    }, 1000);
  });
});
