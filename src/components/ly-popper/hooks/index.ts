import { usePositionByParent } from '../../../utils/dom';
import { renderSlot, createVNode, ref, Ref, Slot, cloneVNode, onMounted } from 'vue';
import { getFirstNode } from '../../../utils/vnode';
import throwError from '../../../utils/error';

type InternalSlots = {
  [name: string]: Slot | undefined;
};

interface IRenderPopperProps {
  popperRef?: string;
}

interface IRenderTriggerProps {
  triggerRef?: string;
}

export function usePopper() {
  const triggerRef = ref<Ref<HTMLElement>>(null as any);
  const popperRef = ref<Ref<HTMLElement>>(null as any);

  onMounted(() => {
    usePositionByParent(triggerRef, popperRef, 'right');
  });

  return { triggerRef, popperRef };
}

export function useRenderPopper(slots: Readonly<InternalSlots>, { popperRef = 'popperRef' }: IRenderPopperProps) {
  const children = renderSlot(slots, 'default');
  const popper = createVNode('div', { ref: popperRef }, [children]);
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
