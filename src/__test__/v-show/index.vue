<template>
  <div class="warrp">
    <button @click="handleClick">hello</button>
    <teleport to="body" :disabled="appendToBody">
      <div class="show-div" v-show="show"></div>
    </teleport>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'vShow',
  components: {},
  props: {
    appendToBody: {
      type: Boolean
    }
  },
  setup() {
    const show = ref(false);
    const handleClick = () => {
      show.value = !show.value;
    };
    return {
      show,
      handleClick
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
