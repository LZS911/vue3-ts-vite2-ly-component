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

  <el-tooltip manualMode  :disabled="disabled" content="点击关闭 tooltip 功能" placement="bottom" effect="light">
    <el-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</el-button>
  </el-tooltip>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: { },
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
