<template>
  <div class="warrp">
    <!-- <LyDroptable
      valueKey="prgNo"
      labelKey="prgName"
      inputWidth="300px"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table1"
      size="123"
      placeholder="31231"
    />
    <LyDroptable
      valueKey="prgNo"
      labelKey="prgName"
      inputWidth="300px"
      style="margin-top:10px;"
      size="mini"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table2"
      @onChange="change"
      filterable
      clearable
      ref="refTable"
      multiple
      defaultFirstRow
    />-->
    <DropTablePopper
      valueKey="prgNo"
      labelKey="prgName"
      inputWidth="300px"
      style="margin-top: 10px"
      size="mini"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table3"
      @onChange="change"
      filterable
      clearable
      multiple
    />
    <DropTablePopper
      valueKey="prgNo"
      labelKey="prgName"
      inputWidth="300px"
      style="margin-top: 10px"
      size="mini"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table1"
      @onChange="change"
      filterable
      clearable
    />
    <!-- <LyPopper :appendBody="false" trigger="click">
      <template #trigger>
        <div class="test-trigger">123</div>
      </template>
    </LyPopper>-->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { glPromiseDemo } from '../utils/promise';

export default defineComponent({
  components: {},
  props: {},
  setup() {
    const { demo08 } = glPromiseDemo();
    demo08();
    console.log('object');

    const refTable = ref(null);
    const data = reactive({
      qwr: '123232342342342342342424',
      select: [1],
      disable: true,
      inputWidth: 300,
      tableList: [
        { prgName: 'test0', prgNo: 0, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test1', prgNo: 1, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test2', prgNo: 2, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test3', prgNo: 3, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test4', prgNo: 4, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test5', prgNo: 5, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test6', prgNo: 6, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test7', prgNo: 7, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test8', prgNo: 8, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test9', prgNo: 9, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test10', prgNo: 10, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test11', prgNo: 11, prgUrl: 'adfafjdasfalsfjdalfaj' },
        { prgName: 'test12', prgNo: 12, prgUrl: 'adfafjdasfalsfjdalfaj' }
      ],
      columnList: [
        {
          width: 100,
          label: '菜单名称',
          prop: 'prgName'
        },
        {
          width: 100,
          label: '菜单代号',
          prop: 'prgNo'
        },
        {
          width: 100,
          label: 'url',
          prop: 'prgUrl'
        }
      ],
      table3: [3],
      table1: 1,
      table2: [2, 3],
      visible: false
    });
    const test = () => {
      data.disable = !data.disable;
      console.log(data.table2, 'oldVal');
    };
    const change = (val: any) => {
      console.log(val, 'onChange');
    };
    return {
      ...toRefs(data),
      test,
      change,
      refTable
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
