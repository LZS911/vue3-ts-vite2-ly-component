import { mount } from '@vue/test-utils';
import dropTable from '../index.vue';
import { ElTable, ElTableColumn } from 'element-plus';

const tableList = [
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
];
const columnList = [
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
];

const TABLE = '.ly-table';
const INPUT = '.ly-input';
const EVENT_CLICK = 'click';

const defaultProps = {
  appendToBody: false,
  columnList,
  tableList,
  valueKey: 'prgNo',
  labelKey: 'prgName'
};

describe('dropTable.vue', () => {
  test('show or hide by event', async () => {
    const wrapper = mount(dropTable, {
      attachTo: 'body',
      props: defaultProps,
      global: {
        components: {
          'el-table': ElTable,
          'el-table-column': ElTableColumn
        }
      }
    });
    const table = wrapper.find(TABLE);
    const input = wrapper.find(INPUT);
    const drop = wrapper.findComponent(dropTable);
    expect(table.isVisible()).toBe(false);
    expect(drop.vm.visibility).toBe(false);
    await input.trigger(EVENT_CLICK);
    expect(drop.vm.visibility).toBe(true);
  });
});
