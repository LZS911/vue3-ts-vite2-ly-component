import { isHTMLElement } from '../../utils/index';
import { on } from '../../utils/dom';
import { DirectiveBinding, ObjectDirective } from 'vue';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;
type FlushList = Map<HTMLElement, DocumentHandler>;

const nodeList: FlushList = new Map();
let mousedown: MouseEvent;

on(document, 'mousedown', (event: any) => (mousedown = event));
on(document, 'mouseup', (mouseup: any) => {
  Array.from(nodeList.values()).forEach((documentHandler) => {
    documentHandler(mouseup, mousedown);
  });
});

const createDocumentHandler = (el: HTMLElement, binding: DirectiveBinding): DocumentHandler => {
  const includes: HTMLElement[] = [];
  if (Array.isArray(binding.arg)) {
    binding.arg.forEach((item) => {
      if (isHTMLElement(item)) {
        includes.push(item);
      }
    });
  } else if (isHTMLElement(binding.arg)) {
    includes.push(binding.arg);
  }
  return function (mouseup, mousedown) {
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown?.target as Node;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget || el === mouseDownTarget;
    const isIncludes = includes.some((item) => item.contains(mouseUpTarget) || item.contains(mouseDownTarget));

    if (isContainedByEl || isSelf || isIncludes) return;
    binding.value();
  };
};

const clickOutSide: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, createDocumentHandler(el, binding));
  },
  updated(el, binding) {
    nodeList.set(el, createDocumentHandler(el, binding));
  },
  unmounted(el) {
    nodeList.has(el) && nodeList.delete(el);
  }
};

export default clickOutSide;
