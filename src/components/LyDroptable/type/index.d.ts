import { SizeEnum } from '../../../utils/enum';

export type EmitType = 'focus' | 'change' | 'update:modelValue';

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
  [key: string]: string;
}

export interface ILyDropTableProps {
  modelValue: unknown;
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
  filterable?: boolean;
}
