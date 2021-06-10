import { SizeEnum } from '../../../utils/enum';

export type EmitType = 'focus' | 'onChange' | 'update:modelValue' | 'visible-change';

export interface ITableColumn {
  width: number | string;
  label: string;
  prop: string;
  hide?: boolean;
  slot?: string;
}

export interface IStyle {
  width: string;
  height: string;
  top?: string;
  left?: string;
}
export interface ITable {
  [key: string]: string | number;
}

export interface ILyDropTableProps {
  modelValue: string | number;
  valueKey: string;
  labelKey: string;
  inputWidth: number | string;
  tableWidth?: number | string;
  size: SizeEnum;
  tableList: ITable[];
  columnList: ITableColumn[];
  disable?: boolean;
  transitionName?: string;
  arrowIcon?: string;
  clearIcon?: string;
  headerCellStyle?: string;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: (query: string | number) => any[];
  defaultFirstRow?: boolean;
  placeholder?: string;
  tableClass?: string;
  multiple?: boolean;
}
