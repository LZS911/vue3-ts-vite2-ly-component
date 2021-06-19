<template>
  <div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      :class="{'completed':todo.completed}"
      data-test="todo"
    >
      {{todo.text}}
      <input data-test="check-todo" type="checkbox" v-model="todo.completed" />
    </div>

    <form data-test="form" @submit.prevent="addTodo">
      <input data-test="new-todo" v-model="todoName" />
    </form>
  </div>
</template>

<script lang='tsx'>
import { defineComponent, ref } from 'vue';
import { EMPTY_STR } from '../../utils/constants';
import { $ } from '../../utils';

let id = 2;
export default defineComponent({
  name: 'testComponent',
  components: {},
  props: {},
  setup() {
    const todos = ref([{ id: 1, text: 'Learn Vue.js 3', completed: false }]);
    const todoName = ref<string>(EMPTY_STR);
    const addTodo = () => {
      const params = {
        id,
        text: $(todoName),
        completed: false
      };
      todos.value.push(params);
      todoName.value = '';
      id++;
    };
    return {
      todos,
      todoName,
      addTodo
    };
  }
});
</script>
