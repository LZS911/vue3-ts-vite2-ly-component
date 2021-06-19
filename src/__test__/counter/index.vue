<template>
  <div class="warrp">
    <button @click="handleClick">Increment</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { $ } from '../../utils';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(props, ctx) {
    const count = ref(0);
    const handleClick = () => {
      count.value += 1;
      ctx.emit('increment', $(count));
      ctx.emit('emitObject', { count: $(count), isEven: $(count) % 2 === 0 });
    };
    return {
      count,
      handleClick
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
