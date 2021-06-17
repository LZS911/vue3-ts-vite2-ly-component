import { PropType } from 'vue';

export type Placement = 'bottom' | 'left' | 'right' | 'top' | 'bottom-left' | 'bottom-right';
export type ArrowOffset = 'left' | 'center' | 'right';
export type TriggerType = 'click' | 'hover' | 'focus' | 'manual';

export type Trigger = TriggerType | TriggerType[];

const DEFAULT_TRIGGER = 'hover';

export interface IPropsOptions {
  arrowOffset: ArrowOffset;
  appendBody: boolean;
  autoClose: number;
  content: string;
  class: string;
  disabled: boolean;
  style: Object;
  hideAfter: number;
  manualMode: boolean;
  offset: number;
  placement: Placement;
  showArrow: boolean;
  transition: string;
  trigger: Trigger;
  visible: boolean;
}

export const defaultProps = {
  appendBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  },

  content: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  style: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  showAfter: {
    type: Number,
    default: 0
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom' as Placement
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  trigger: {
    type: [String, Array] as PropType<Trigger>,
    default: DEFAULT_TRIGGER
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  arrowOffset: {
    type: String as PropType<ArrowOffset>,
    default: 'center' as ArrowOffset
  }
};
