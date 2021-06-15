/* eslint-disable no-param-reassign */
import { Placement } from '../components/ly-popper/hooks/index.data';
import { Ref } from 'vue';
import { $ } from '.';
import { camelCase, isObject } from 'lodash';
import { camelize } from '@vue/shared';

export enum PlacementEnum {
  Bottom = 'bottom',
  Left = 'left',
  Top = 'top',
  Right = 'right',
}

export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

export const off = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

export const usePositionByParent = (
  parentDom: Ref<HTMLElement>,
  currentDom: Ref<HTMLElement>,
  currentHeight: number = 50,
  currentWidth: number = 50,
  placement: Placement = 'bottom' as Placement,
) => {
  const sizeObj = $(parentDom).getBoundingClientRect();
  const parent = { top: 0, left: 0 };
  const current = { top: 0, left: 0 };
  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;

  parent.top = sizeObj.top + document.documentElement.scrollTop;
  parent.left = sizeObj.left + document.documentElement.scrollLeft;

  switch (placement) {
    case PlacementEnum.Bottom:
      if (bodyHeight - sizeObj.height - parent.top < currentHeight) {
        current.top = parent.top - sizeObj.height;
      } else {
        current.top = parent.top + sizeObj.height;
      }
      current.left = parent.left;
      break;
    case PlacementEnum.Top:
      if (parent.top < currentHeight) {
        current.top = parent.top + sizeObj.height;
      } else {
        current.top = parent.top - sizeObj.height;
      }
      current.left = parent.left;
      break;
    case PlacementEnum.Left:
      if (parent.left < currentWidth) {
        current.top = parent.top + sizeObj.height;
        current.left = parent.left;
      } else {
        current.top = parent.top;
        current.left = parent.left - currentWidth;
      }
      break;
    case PlacementEnum.Right:
      if (bodyWidth - parent.left - sizeObj.width < currentWidth) {
        current.top = parent.top + sizeObj.height;
        current.left = parent.left;
      } else {
        current.top = parent.top;
        current.left = parent.left + sizeObj.width;
      }
      break;
    default: break;
  }

  const style = {
    position: 'absolute',
    top: `${current.top}px`,
    left: `${current.left}px`
  };
  addStyle($(currentDom), style as CSSStyleDeclaration);
};

export const setTableScrollIntoView = (currentIndex: number, lineHeight: number, currentDom: any, count: number) => {
  if (currentDom.$refs.bodyWrapper.scrollTop === 0) {
    if (currentIndex > count) {
      currentDom.$refs.bodyWrapper.scrollTop = currentIndex * lineHeight;
    }
  } else {
    currentDom.$refs.bodyWrapper.scrollTop = currentIndex * lineHeight;
  }
};
export const calcTableCount = (wrapperHeight: number, lineHeight: number) =>
  parseInt(((wrapperHeight - lineHeight - 20) / lineHeight).toString());

export const addClass = () => { };
export const removeClass = () => { };

export const addStyle = (element: HTMLElement, styleName: CSSStyleDeclaration | string, value?: string) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((key) => {
      addStyle(element, key, styleName[key as any]);
    });
  } else {
    styleName = camelize(styleName);
    if (value) { element.style[styleName as any] = value; }
  }
};
export const removeStyle = (element: HTMLElement, styleName: CSSStyleDeclaration | string) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((key) => {
      addStyle(element, key, '');
    });
  } else {
    styleName = camelize(styleName);
    element.style[styleName as any] = '';
  }
};
