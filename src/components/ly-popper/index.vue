<script lang='ts'>
import { defineComponent, createVNode, Fragment } from 'vue';
import { renderBlock } from '../../utils/vnode';
import throwError from '../../utils/error';

const NAME = 'LyPopper';
export default defineComponent({
  name: NAME,
  components: {},
  props: {},
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError(NAME, 'Trigger must be provided');
    }
  },
  render() {
    const { $slots } = this;
    const _trigger = $slots.trigger?.();
    return renderBlock(Fragment, null, [_trigger]);
  }
});
</script>
