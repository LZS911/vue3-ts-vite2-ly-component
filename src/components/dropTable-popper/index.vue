<template>
  <ly-popper :trigger="['click', 'focus']">
    <template #trigger>
      <div>
        <input />
      </div>
    </template>
    <template #default>
      <div>
        <el-table />
      </div>
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
