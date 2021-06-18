import LyPopper from '../index.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import * as Vue from 'vue';

type UnknownProps = Record<string, unknown>;

const { h } = Vue;

const Wrapper = (props: UnknownProps, { slots }: any) => h('div', h(LyPopper, props, slots));

const _mount = (props: UnknownProps = {}, { slots }: any = {}): VueWrapper<any> =>
  mount(Wrapper, {
    props,
    slots: {
      trigger: () => {
        h('div', {}, slots);
      }
    },
    attachTo: 'body'
  });

describe('LyPopper.vue', () => {
  test('popper is a component', () => {
    const wrapper = _mount({
      appendToBody: true
    });
  });
});
