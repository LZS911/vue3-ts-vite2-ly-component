import { mount } from '@vue/test-utils';
import TodoApp from './index.vue';

describe('Component.vue', () => {
  test('equal render div text === "Learn Vue.js 3"', () => {
    const wrapper = mount(TodoApp);
    const todo = wrapper.get('[data-test="todo"]');
    expect(todo.text()).toBe('Learn Vue.js 3');
  });

  test('create new todo', async () => {
    const wrapper = mount(TodoApp);
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);
    await wrapper.get('[data-test="new-todo"]').setValue('new todo');
    await wrapper.get('[data-test="form"]').trigger('submit');

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });

  test('check todo after add class "completed"', async () => {
    const wrapper = mount(TodoApp);

    await wrapper.get('[data-test="check-todo"]').setValue(true);
    expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed');
  });
});
