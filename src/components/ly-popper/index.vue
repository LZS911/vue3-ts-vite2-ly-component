<script lang='ts'>
import { defineComponent, createVNode, Fragment, Teleport, onMounted } from 'vue';
import { renderBlock } from '../../utils/vnode';
import throwError from '../../utils/error';
import { defaultProps, IPropsOptions } from './hooks/index.data';
import { useRenderPopper, useRenderTrigger, usePopper, IRenderTriggerProps } from './hooks';

const NAME = 'LyPopper';
export default defineComponent({
  name: NAME,
  components: {},
  props: defaultProps,
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError(NAME, 'Trigger must be provided');
    }

    const propsStates = usePopper(props as IPropsOptions, ctx as any);

    return propsStates;
  },
  render() {
    const { $slots, content, visibility, events, showArrow } = this;

    const triggerProps: IRenderTriggerProps = {
      ref: 'triggerRef',
      ...events
    };

    const trigger = useRenderTrigger($slots, triggerProps);
    const popper = useRenderPopper($slots, { content, visibility, showArrow });
    return renderBlock(Fragment, null, [trigger!, createVNode(Teleport as any, { to: 'body' }, [popper])]);
  }
});
</script>
