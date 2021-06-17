<template>
  <ly-popper
    :popperWidth="80"
    :popperHeight="100"
    placement="bottom-left"
    arrowOffset="left"
    :trigger="['click']"
  >
    <template #trigger>
      <div style="width:180px;margin-top:100px; margin-left:220px;border:1px solid red;">
        <input />
      </div>
    </template>
    <template #default>
      <el-table :style="{width:'80px', height:'100px'}" />
    </template>
  </ly-popper>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

const NAME = 'DropTablePopper';
export default defineComponent({
  name: NAME,
  components: {},
  props: {},
  setup() {}
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
