<template>
  <div class="warrp">
    <router-link to="/dropTable">dropTable</router-link>
    <router-link to="/modal">modal</router-link>
    <router-link to="/menu">menu</router-link>
    <router-view />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    return {
      disabled: false
    };
  }
});
</script>

<style lang='scss'>
@import './styles/common.scss';
.warrp {
  padding: 10px;
  height: 900px;
  width: 100%;
}
</style>
