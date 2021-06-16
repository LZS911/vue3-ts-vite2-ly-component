import { IPropsOptions } from './index.data';
import { PlacementEnum, usePositionByParent } from '../../../utils/dom';
import { DEFAULT } from '../../../utils/constants';

import { renderSlot, createVNode, ref, Ref, Slot, cloneVNode, onMounted, toDisplayString, withDirectives, vShow } from 'vue';
import { getFirstNode } from '../../../utils/vnode';
import throwError from '../../../utils/error';

type InternalSlots = {
  [name: string]: Slot | undefined;
};

interface IRenderPopperProps {
  popperRef?: string;
  content?: string;
  visibility?: boolean;
}

interface IRenderTriggerProps {
  triggerRef?: string;
}

export function usePopper(props: IPropsOptions) {
  const triggerRef = ref<Ref<HTMLElement>>(null as any);
  const popperRef = ref<Ref<HTMLElement>>(null as any);
  const visibility = ref(true);

  onMounted(() => {
    usePositionByParent(triggerRef, popperRef, undefined, undefined, PlacementEnum.Right);
  });

  return { triggerRef, popperRef, props, visibility };
}

export function useRenderPopper(slots: Readonly<InternalSlots>, { popperRef = 'popperRef', content, visibility }: IRenderPopperProps) {
  const children = renderSlot(slots, DEFAULT, {}, () => [toDisplayString(content)]);
  const kls = ['ly-popper'];
  const popper = withDirectives(createVNode('div', { ref: popperRef, class: kls }, [children]), [[vShow, visibility]]);
  return popper;
}

export function useRenderTrigger(slots: Readonly<InternalSlots>, { triggerRef = 'triggerRef' }: IRenderTriggerProps) {
  const firstNode = getFirstNode(slots.trigger?.(), 1);
  if (!firstNode) {
    throwError('renderTrigger', 'trigger expects single rooted node');
  }
  const trigger = cloneVNode(firstNode!, { ref: triggerRef }, true);
  return trigger;
}
