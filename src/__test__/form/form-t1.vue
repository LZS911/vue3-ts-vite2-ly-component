<template>
  <div class="warrp">
    <input type="email" v-model="email" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { EMPTY_STR } from '../../utils/constants';
import { $ } from '../../utils';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(props, ctx) {
    const email = ref(EMPTY_STR);
    const submit = () => {
      ctx.emit('submit', $(email));
    };
    return {
      email,
      submit
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
