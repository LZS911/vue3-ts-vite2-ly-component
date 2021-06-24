import { ITableColumn, ComponentSize, ITable } from '../../utils/types';

export type EmitType = 'focus' | 'blur' | 'onChange' | 'update:modelValue' | 'visible-change';

export interface ILyDropTableProps {
  modelValue: any;
  valueKey: string;
  labelKey: string;
  inputWidth: number | string;
  tableWidth?: number | string;
  size: ComponentSize;
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
