import { Ref } from 'vue';
import { $ } from '.';

export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
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
  currentHeight: number,
  currentWidth: number
) => {
  const sizeObj = $(parentDom).getBoundingClientRect();
  const parent = { top: 0, left: 0 };
  const current = { top: 0, left: 0 };
  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;

  parent.top = sizeObj.top + document.documentElement.scrollTop;
  parent.left = sizeObj.left + document.documentElement.scrollLeft;

  if (bodyHeight - parent.top < currentHeight) {
    if (parent.top < currentHeight) {
      current.top = parent.top - currentHeight / 2;
    } else {
      current.top = parent.top - currentHeight;
    }
  } else {
    current.top = parent.top + sizeObj.height + 8;
  }

  current.left = parent.left;
  if (bodyWidth - parent.left <= currentWidth) {
    current.left = parent.left - (currentWidth - (bodyWidth - parent.left));
  } else if (bodyWidth - parent.left <= sizeObj.width) {
    current.left = parent.left - sizeObj.width;
  }
  currentDom.value.style.top = `${current.top}px`;
  currentDom.value.style.left = `${current.left}px`;
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

export const addClass = () => {};
export const removeClass = () => {};

export const setStyle = () => {};
export const removeStyle = () => {};
