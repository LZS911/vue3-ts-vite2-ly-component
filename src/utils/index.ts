import { ComponentSize } from './types';
import { SizeEnum } from './enum';
import { isString, toRawType } from '@vue/shared';
import { Ref, computed } from 'vue';
import _ from 'lodash';

export const isBool = (val: unknown): val is boolean => typeof val === 'boolean';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isArray = <T>(val: unknown): val is Array<T> => Array.isArray(val);
export const isHTMLElement = (val: unknown): val is HTMLElement => toRawType(val).startsWith('HTML');
export function $<T>(ref: Ref<T>) {
  return ref.value;
}

export const isEmpty = (val: unknown) => {
  if (isNumber(val)) {
    return false;
  }
  return _.isEmpty(val);
};
export const isEnum = <T>(val: unknown, arr: T[]): val is T => arr.some((e) => e === val);
export const isPercentage = (val: string) => val.includes('%') && !isNaN(Number(val.slice(0, val.length - 1)));
export const percentageToNumber = (val: string, fixed: number = 2): number => {
  if (!isPercentage(val)) return -1;
  const num = Number(val.replace('%', ''));
  return Number((num / 100).toFixed(fixed));
};

export const removeStrToNumber = (val: string, str: string) => Number(val.replace(str, ''));

export const useWidthOrHeight = (initValue: string, defaultVal: number): number => {
  const num = percentageToNumber(initValue);
  if (num !== -1) {
    return document.body.scrollWidth * num;
  }
  if (initValue.includes('px')) {
    return removeStrToNumber(initValue, 'px');
  }
  return defaultVal;
};

export const useSize = (width: number | string, sizeMap: Map<string, number>, size: ComponentSize) => {
  const style = computed(() => ({
    width: isString(width) && isNaN(Number(width)) ? `${width}` : `${width}px`,
    height: isEnum<SizeEnum>(size, Object.values(SizeEnum)) ? `${sizeMap.get(size!)}px` : `${sizeMap.get('small')}px`
  }));

  return style;
};

export const findListByKey = (tableList: any[], value: any, key: string) =>
  tableList.find((item) => item[key] === value) ?? {};

export const findListByIndex = (tableList: any[], index: number, key: string) => {
  if (!tableList.length) {
    return;
  }
  return tableList[index][key];
};
export const findIndexListByKey = (tableList: any[], value: any, key: string) =>
  tableList.findIndex((item) => item[key] === value);

export const filterListByValue = (tableList: any[], query: string) => {
  if (!query) {
    return tableList;
  }
  const arrays = tableList.filter((item) => {
    for (const key of Object.keys(item)) {
      if (item[key] && item[key].toString().toUpperCase().includes(query.toUpperCase())) return true;
    }
  });

  return arrays;
};
export const arrDifference = <T>(array: T[], ...value: T[]): T[] => Array.from(new Set([...array, ...value]));
export const arrDistinct = <T>(array: T[], ...value: T[]): T[] => array.filter((arr) => !value.includes(arr));
export const arrRemove = <T>(arr: T[], val: T): T[] => _.remove(arr, (t) => t !== val);
