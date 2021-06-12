<template>
  <div class="warrp">
    <!-- <testFunction>
      <template #test>
        <h1>hello</h1>
      </template>
    </testFunction> -->
    <router-link to='/dropTable'>dropTable</router-link>
    <router-link to='/modal'>modal</router-link>
    <router-view/>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: { },
  props: {},
  setup() {

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
