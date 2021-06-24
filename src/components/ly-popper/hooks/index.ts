import { VISIBLE_EVENT, UPDATE_VISIBLE_EVENT, DEFAULT } from '../../../utils/constants';
import { isArray, $, isBool } from '../../../utils/index';

import { PatchFlags, getFirstNode } from '../../../utils/vnode';
import { getDomLength, usePositionByParent } from '../../../utils/dom';

import { IPropsOptions, TriggerType } from './index.data';

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
  SetupContext,
  Transition,
  withCtx
} from 'vue';

import throwError from '../../../utils/error';
import { clickOutSide } from '../../../directives';

type InternalSlots = {
  [name: string]: Slot | undefined;
};

type EmitType = 'update:visible' | 'visible-change';

export interface IEventHandle {
  onMouseenter?: (e: Event) => void;
  onMouseleave?: (e: Event) => void;
  onClick?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IRenderPopperProps {
  ref?: string;
  content?: string;
  visibility?: boolean;
  showArrow?: boolean;
  transition?: string;
}

export interface IRenderTriggerProps {
  ref?: string;
  hide?: () => void;
  popperRef?: HTMLElement;
  events?: IEventHandle;
  manualMode?: boolean;
  className?: string;
  style?: Object;
}

export function usePopper(props: IPropsOptions, { emit }: SetupContext<EmitType[]>) {
  const triggerRef = ref<Ref<HTMLElement>>(null as any);
  const popperRef = ref<Ref<HTMLElement>>(null as any);
  onMounted(() => {
    usePositionByParent(
      triggerRef,
      popperRef,
      props.popperHeight ? props.popperHeight : undefined,
      props.popperWidth ? props.popperWidth : getDomLength(props.content) + 30,
      props.placement,
      undefined,
      props.arrowOffset
    );

    if (!!props.popperHeight) $(popperRef).style.height = `${props.popperHeight}px`;
    if (!!props.popperWidth) $(popperRef).style.width = `${props.popperWidth}px`;
    $(popperRef).style.padding = `${props.boundariesPadding}px`;
  });

  const visibleState = ref(false);
  const visibility = computed({
    get() {
      if (props.disabled) return false;
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

  const show = () => {
    if (props.manualMode || props.disabled) return;
    _show();
    emit(VISIBLE_EVENT, true);
  };
  const hide = () => {
    if (props.manualMode) return;
    _hide();
    emit(VISIBLE_EVENT, false);
  };

  const events: IEventHandle = {};

  const addEventsHandle = (e: Event) => {
    e.stopPropagation();

    switch (e.type) {
      case 'click':
        if ($(visibility)) {
          hide();
        } else {
          show();
        }
        break;
      case 'mouseenter': {
        show();
        break;
      }
      case 'mouseleave': {
        hide();
        break;
      }
      case 'focus': {
        show();
        break;
      }
      case 'blur': {
        hide();
        break;
      }
      default:
        break;
    }
  };

  const eventMap = new Map<TriggerType, (keyof IEventHandle)[]>([
    ['click', ['onClick']],
    ['hover', ['onMouseenter', 'onMouseleave']],
    ['focus', ['onFocus', 'onBlur']]
  ]);

  const mapFun = (t: TriggerType) => {
    eventMap.get(t)?.forEach((key) => {
      events[key] = addEventsHandle;
    });
  };
  if (isArray(props.trigger)) {
    props.trigger.forEach(mapFun);
  } else {
    mapFun(props.trigger);
  }
  return { triggerRef, popperRef, visibility, events, hide };
}

export function useRenderPopper(
  slots: Readonly<InternalSlots>,
  { ref = 'popperRef', content, visibility, showArrow, transition }: IRenderPopperProps
) {
  const children = renderSlot(slots, DEFAULT, {}, () => [toDisplayString(content)]);
  if (!children) return '';
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
            { 'aria-hidden': String(!visibility), ref, class: kls, role: 'popper' },
            [children],
            PatchFlags.CLASS | PatchFlags.PROPS | PatchFlags.HYDRATE_EVENTS,
            ['onMouseenter', 'onMouseleave', 'onClick', 'aria-hidden', 'id', 'onMousedown', 'onMouseup']
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
  const trigger = props.manualMode
    ? cloneVNode(firstNode!, { style: props.style, class: props.className, ref: props.ref, ...props.events } as VNodeProps, true)
    : withDirectives(cloneVNode(firstNode!, { style: props.style, class: props.className, ref: props.ref, ...props.events } as VNodeProps, true), [
      [clickOutSide, props.hide, props.popperRef as unknown as string]
    ]);
  return trigger;
}
