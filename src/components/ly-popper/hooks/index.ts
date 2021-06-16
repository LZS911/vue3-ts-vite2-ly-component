import { PatchFlags, getFirstNode } from '../../../utils/vnode';

import { getDomLength, PlacementEnum, usePositionByParent } from '../../../utils/dom';
import { UPDATE_VISIBLE_EVENT, DEFAULT } from '../../../utils/constants';
import { $, isBool } from '../../../utils/index';
import { IPropsOptions } from './index.data';

import {
  renderSlot,
  createVNode,
  ref,
  Ref,
  Slot,
  cloneVNode,
  onMounted,
  toDisplayString,
  withDirectives,
  vShow,
  VNodeProps,
  computed,
  toRefs,
  reactive,
  SetupContext,
  Transition,
  withCtx
} from 'vue';

import throwError from '../../../utils/error';

type InternalSlots = {
  [name: string]: Slot | undefined;
};

type EmitType = 'update:visible';

export interface IRenderPopperProps {
  ref?: string;
  content?: string;
  visibility?: boolean;
  showArrow?: boolean;
  transition?: string;
}

export interface IRenderTriggerProps {
  ref?: string;
}

export function usePopper(props: IPropsOptions, { emit }: SetupContext<EmitType[]>) {
  const triggerRef = ref<Ref<HTMLElement>>(null as any);
  const popperRef = ref<Ref<HTMLElement>>(null as any);

  onMounted(() => {
    usePositionByParent(triggerRef, popperRef, undefined, getDomLength(props.content) + 30, props.placement);
  });

  const visibleState = ref(false);
  const visibility = computed({
    get() {
      return isBool(props.visible) ? props.visible : $(visibleState);
    },
    set(val: boolean) {
      isBool(props.visible) ? emit(UPDATE_VISIBLE_EVENT, val) : (visibleState.value = val);
    }
  });

  const _show = () => {
    visibility.value = true;
  };

  const _hide = () => {
    visibility.value = false;
  };

  const mouseEnter = () => {
    _show();
  };
  const mouseLeave = () => {
    _hide();
  };

  const events = {
    onMouseenter: mouseEnter,
    onMouseleave: mouseLeave
  };

  return { triggerRef, popperRef, visibility, events };
}

export function useRenderPopper(
  slots: Readonly<InternalSlots>,
  { ref = 'popperRef', content, visibility, showArrow, transition }: IRenderPopperProps
) {
  const children = renderSlot(slots, DEFAULT, {}, () => [toDisplayString(content)]);
  const kls = ['ly-popper'];
  if (showArrow) {
    kls.push('ly-popper__arrow');
  }
  return createVNode(
    Transition,
    { name: transition },
    {
      default: withCtx(() => [
        withDirectives(
          createVNode(
            'div',
            { ref, class: kls },
            [children],
            PatchFlags.CLASS | PatchFlags.PROPS | PatchFlags.HYDRATE_EVENTS,
            ['onMouseenter', 'onMouseleave']
          ),
          [[vShow, visibility]]
        )
      ])
    },
    PatchFlags.PROPS,
    ['name']
  );
}

export function useRenderTrigger(slots: Readonly<InternalSlots>, props: IRenderTriggerProps) {
  const firstNode = getFirstNode(slots.trigger?.(), 1);
  if (!firstNode) {
    throwError('renderTrigger', 'trigger expects single rooted node');
  }
  const trigger = cloneVNode(firstNode!, props as VNodeProps, true);
  return trigger;
}
