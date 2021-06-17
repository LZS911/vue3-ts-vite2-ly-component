<template>
  <ly-popper arrowOffset="left" placement="bottom-left" :trigger="['click']">
    <template #trigger>
      <div style="width:180px; margin-left:20px;">
        <input />
      </div>
    </template>
    <template #default>
      <el-table />
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
