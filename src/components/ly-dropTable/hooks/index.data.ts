import { ITableColumn, ComponentSize, ITable } from '../../../utils/types';
import { SizeEnum } from '../../../utils/enum';
import { PropType } from 'vue';

export const ISizeMap = new Map<string, number>([
  ['mini', 30],
  ['small', 40],
  ['Medium', 50]
]);
export const TSizeMap = new Map<string, number>([
  ['mini', 300],
  ['small', 400],
  ['Medium', 500]
]);
export const defaultTableHeight = TSizeMap.get('mini')!;
export const defaultTableWidth = ISizeMap.get('mini')!;

export const defaultProps = {
  modelValue: { type: [Number, String, Array] },
  valueKey: {
    type: String,
    required: true
  },
  labelKey: {
    type: String,
    required: true
  },
  inputWidth: {
    type: [String, Number],
    default: '100%'
  },
  tableWidth: {
    type: [String, Number]
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: SizeEnum.Small
  },
  tableList: {
    type: Object as PropType<ITable[]>,
    default: () => []
  },
  columnList: {
    type: Object as PropType<ITableColumn[]>,
    default: () => []
  },
  disable: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: 'el-fade-in-linear'
  },
  arrowIcon: {
    type: String,
    default: 'el-icon-arrow-down'
  },
  clearIcon: {
    type: String,
    default: 'el-icon-circle-close'
  },
  headerCellStyle: {
    type: Object,
    default: () => ({ backgroundColor: 'rgba(244, 245, 250, 1)' })
  },
  tableClass: {
    type: String
  },
  clearable: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Object as PropType<(query: string) => any[]>
  },
  defaultFirstRow: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String
  },
  multiple: {
    type: Boolean,
    default: false
  }
};
