import { mount, VueWrapper } from '@vue/test-utils';
import LyPopper from '../index.vue';
import { h } from 'vue';

type UnknownProps = Record<string, unknown>;
const TEST_TRIGGER = 'test-trigger';
const AXIOM = 'popper';

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
    expect(wrapper.text()).toEqual(AXIOM);

    wrapper = _mount({
      content: AXIOM,
      appendBody: false
    });
    expect(wrapper.text()).toEqual(AXIOM);
  });
});
