<template>
  <div class="warrp">
    <div>
      <header>
        <slot name="header" v-bind="{msg}"></slot>
      </header>
      <main>
        <slot name="main"></slot>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    const msg = ref('world');
    return { msg };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
