import { SizeEnum } from './enum';
import { isString, toRawType } from '@vue/shared';
import { Ref, computed } from 'vue';
import { ComponentSize, ITable } from '../components/LyDroptable/type';

export const isBool = (val: unknown): val is boolean => typeof val === 'boolean';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isHTMLElement = (val: unknown): val is HTMLElement => toRawType(val).startsWith('HTML');
export function $<T>(ref: Ref<T>) {
  return ref.value;
}

export const isEmpty = (val: unknown) => !val && val !== 0;
export const isEnum = <T>(val: unknown, arr: T[]): val is T => arr.some((e) => e === val);
export const isPercentage = (val: string) => val.includes('%') && !isNaN(Number(val.slice(0, val.length - 1)));
export const percentageToNumber = (val: string, fixed: number = 2): number => {
  if (!isPercentage(val)) return -1;
  const num = Number(val.replace('%', ''));
  return Number((num / 100).toFixed(fixed));
};

export const removeStrToNumber = (val: string, str: string) => Number(val.replace(str, ''));

export const getWidthOrHeight = (initValue: string, defaultVal: number): number => {
  const num = percentageToNumber(initValue);
  if (num !== -1) {
    return document.body.scrollWidth * num;
  }
  if (initValue.includes('px')) {
    return removeStrToNumber(initValue, 'px');
  }
  return defaultVal;
};

export const getSize = (width: number | string, map: Map<string, number>, size: ComponentSize) => {
  const style = computed(() => ({
    width: isString(width) && isNaN(Number(width)) ? `${width}` : `${width}px`,
    height: isEnum<SizeEnum>(size, Object.values(SizeEnum)) ? `${map.get(size!)}px` : `${map.get('small')}px`
  }));

  return style;
};

export const findListByKey = (tableList: any[], value: number | string, key: string) =>
  tableList.find((item) => item[key] === value) ?? {};
export const filterListByKey = (tableList: any[], query: string | number) => {
  if (!query) {
    return tableList;
  }
  const arrays = tableList.filter((item) => {
    for (const key of Object.keys(item)) {
      if (item[key] && item[key].toString().toUpperCase().includes(query.toString().toUpperCase())) return true;
    }
  });

  return arrays;
};
