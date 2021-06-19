import { mount } from '@vue/test-utils';
import Layout from './index.vue';
import { h } from 'vue';

describe('Layout.vue', () => {
  test('render default slot', () => {
    const wrapper = mount(Layout, {
      slots: {
        header: `<template #scoped="params">
        Hello {{ params.msg }}
        </template>
      `,
        main: h('div', { id: 'one' }, ['one']),
        footer: 'Footer',
        default: ['<div id="one">One</div>', '<div id="two">Two</div>']
      }
    });
    expect(wrapper.html()).toContain('Hello world');
    expect(wrapper.find('#one').exists()).toBe(true);
    expect(wrapper.find('footer').html()).toContain('Footer');
    expect(wrapper.find('#one').exists()).toBe(true);
  });
});
