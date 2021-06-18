<template>
  <div class="warrp">
    <h1>testComponent</h1>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'testComponent',
  components: {},
  props: {},
  setup() {
    const todos = ref([{ id: 1, text: 'Learn Vue.js 3', completed: false }]);

    return {
      todos
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
