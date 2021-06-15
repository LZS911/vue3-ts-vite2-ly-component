<script lang='ts'>
import { defineComponent, createVNode, Fragment, Teleport, renderSlot } from 'vue';
import { renderBlock } from '../../utils/vnode';
import throwError from '../../utils/error';
import { defaultProps } from './hooks/index.data';
import { toDisplayString } from '@vue/shared';
import { useRenderPopper, useRenderTrigger, usePopper } from './hooks';

const NAME = 'LyPopper';
export default defineComponent({
  name: NAME,
  components: {},
  props: defaultProps,
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError(NAME, 'Trigger must be provided');
    }

    const propsStates = usePopper();

    return propsStates;
  },
  render() {
    const { $slots } = this;
    const trigger = useRenderTrigger($slots, {});
    const popper = useRenderPopper($slots, {});
    return renderBlock(Fragment, null, [trigger!, createVNode(Teleport as any, { to: 'body' }, [popper])]);
  }
});
</script>
