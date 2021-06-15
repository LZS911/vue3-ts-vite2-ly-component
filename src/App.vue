<template>
  <div class="warrp">

    <router-link to='/dropTable'>dropTable</router-link>
    <router-link to='/modal'>modal</router-link>
    <router-view/>

   <!-- <el-popover
    placement="top-start"
    title="标题"
    :width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
     <DropTable/>
    </template>
  </el-popover> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import DropTable from './page/DropTable.vue';

export default defineComponent({
  components: { DropTable },
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
