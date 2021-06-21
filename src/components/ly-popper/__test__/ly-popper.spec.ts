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
    attachTo: 'body',

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

    const popper = wrapper.findComponent(LyPopper);
    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    expect(popper.vm.visibility).toBe(false);
    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(true);
  });

  test('when exist manualMode need provide v-model control show or hide', async () => {
    const wrapper = _mount({
      appendBody: false,
      manualMode: true,
      visible: false,
    });
    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);

    expect(popper.vm.visibility).toBe(false);
    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await wrapper.setProps({
      visible: true,
    });
    expect(popper.vm.visibility).toBe(true);
  });

  test('disabled model can not show', async () => {
    const wrapper = _mount({
      disabled: true,
      visible: false,
      appendBody: false,
    });
    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);

    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(false);

    wrapper.setProps({
      visible: true
    });
    expect(popper.vm.visibility).toBe(false);
  });

  test('class and style', () => {
    const CLASS = 'test';
    const STYLE = 'width: 100px';
    const wrapper = _mount({
      style: STYLE,
      class: CLASS,
      appendBody: false,
    });
    const trigger = wrapper.find(`.${TEST_TRIGGER}`);
    expect(trigger.classes(CLASS)).toBe(true);
    expect((trigger.element as HTMLElement).style.width).toBe('100px');
  });

  test('trigger default', async () => {
    const wrapper = _mount({
      appendBody: false,
    });

    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);

    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(MOUSE_LEAVE_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(FOCUS_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(BLUR_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);
  });

  test('trigger hover', async () => {
    const wrapper = _mount({
      trigger: 'hover',
      appendBody: false,
    });

    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(MOUSE_LEAVE_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(FOCUS_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(BLUR_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);
  });

  test('trigger click', async () => {
    const wrapper = _mount({
      trigger: 'click',
      appendBody: false,
    });

    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_LEAVE_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(FOCUS_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(BLUR_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);
  });

  test('trigger focus', async () => {
    const wrapper = _mount({
      trigger: 'focus',
      appendBody: false,
    });

    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_LEAVE_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(FOCUS_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(BLUR_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);
  });

  test('combined trigger', async () => {
    const wrapper = _mount({
      trigger: ['hover', CLICK_EVENT, FOCUS_EVENT],
      appendBody: false,
    });

    const $trigger = wrapper.find(`.${TEST_TRIGGER}`);
    const popper = wrapper.findComponent(LyPopper);

    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(MOUSE_ENTER_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(MOUSE_LEAVE_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(FOCUS_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(BLUR_EVENT);
    expect(popper.vm.visibility).toBe(false);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(true);

    await $trigger.trigger(CLICK_EVENT);
    expect(popper.vm.visibility).toBe(false);
  });
});
