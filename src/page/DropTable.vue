<template>
 <div class='warrp'>
 <LyDroptable
      valueKey="prgNo"
      labelKey="prgName"
      :disable="disable"
      inputWidth="300px"
      :tableList="tableList"
      :columnList="columnList"
      v-model="table1"
      size="123"
      placeholder='31231'
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
    />

    <el-button  @click="test">test</el-button>
    <el-tooltip :showArrow='false' v-model="visible" manual content="Top Left 提示文字" placement="top-start">
       <el-button>上左</el-button>
    </el-tooltip>

    <TestFunction>
      <template #test>
        <el-butto >hover 激活1</el-butto>
        <el-button>hover 激活</el-button>
      </template>
    </TestFunction>
 </div>
</template>

<script lang='ts'>
import { Fragment, Comment, defineComponent, reactive, toRefs, ref } from 'vue';

export default defineComponent({
  components: { Fragment, Comment },
  props: {},

  setup() {
    const refTable = ref(null);
    const data = reactive({
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
        { prgName: 'test9', prgNo: 9, prgUrl: 'adfafjdasfalsfjdalfaj' }
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
          prop: 'prgUrl',
        }
      ],
      table1: 1,
      table2: [2, 3],
      visible: true
    });
    const test = () => {
      data.disable = !data.disable;
      console.log(data.table2, 'oldVal');
    };
    const change = (val) => {
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

 .warrp{}
</style>
