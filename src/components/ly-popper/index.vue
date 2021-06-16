<script lang='ts'>
import { defineComponent, createVNode, Fragment, Teleport } from 'vue';
import { renderBlock } from '../../utils/vnode';
import throwError from '../../utils/error';
import { defaultProps, IPropsOptions } from './hooks/index.data';
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

    const propsStates = usePopper(props as IPropsOptions);

    return propsStates;
  },
  render() {
    const { $slots, content, visibility } = this;
    const trigger = useRenderTrigger($slots, {});
    const popper = useRenderPopper($slots, { content, visibility });
    return renderBlock(Fragment, null, [trigger!, createVNode(Teleport as any, { to: 'body' }, [popper])]);
  }
});
</script>
