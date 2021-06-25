<template>
  <div class="ly-menu">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const NAME = 'LyMenu';
export default defineComponent({
  name: NAME,
  components: {},
  props: {},
  setup() {}
});
</script>

<style lang='scss' scoped>
.ly-menu {
}
</style>
