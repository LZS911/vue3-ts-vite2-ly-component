import type { Emitter } from 'mitt';
import type { FieldErrorList } from 'async-validator';

export type EmitType = 'focus' | 'onChange' | 'update:modelValue' | 'visible-change';

export interface ITableColumn {
  width: number | string;
  label: string;
  prop: string;
  hide?: boolean;
  slot?: string;
}
export type ComponentSize = 'large' | 'medium' | 'small' | 'mini';

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

export interface ElFormContext {
  registerLabelWidth(width: number, oldWidth: number): void;
  deregisterLabelWidth(width: number): void;
  autoLabelWidth: string | undefined;
  formMitt: Emitter;
  emit: (evt: string, ...args: any[]) => void;
  labelSuffix: string;
  inline?: boolean;
  model?: Record<string, unknown>;
  size?: ComponentSize;
  showMessage?: boolean;
  labelPosition?: string;
  labelWidth?: string;
  rules?: Record<string, unknown>;
  statusIcon?: boolean;
  hideRequiredAsterisk?: boolean;
  disabled?: boolean;
}
export interface ValidateFieldCallback {
  (isValid?: boolean, invalidFields?: FieldErrorList): void;
}
export interface ElFormItemContext {
  prop?: string;
  formItemMitt: Emitter;
  size: ComponentSize;
  validateState: string;
  validate(callback?: ValidateFieldCallback): void;
  updateComputedLabelWidth(width: number): void;
  addValidateEvents(): void;
  removeValidateEvents(): void;
  resetField(): void;
  clearValidate(): void;
}
