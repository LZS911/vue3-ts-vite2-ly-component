import { renderSlot, createVNode, ref, Ref, Slot, cloneVNode } from 'vue';

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

  return {
    triggerRef,
    popperRef
  };
}

export function useLifecycle() {
  const initializePopper = () => {};

  return { initializePopper };
}

export function useRender(
  slots: Readonly<InternalSlots>,
  { popperRef = 'popperRef' }: IRenderPopperProps,
  { triggerRef = 'triggerRef' }: IRenderTriggerProps
) {
  const children = renderSlot(slots, 'default');
  const firstNode = slots.trigger?.()[0];
  const trigger = cloneVNode(firstNode!, { ref: triggerRef }, true);
  const popper = createVNode('div', { ref: popperRef }, [children]);
  return {
    trigger,
    popper
  };
}
