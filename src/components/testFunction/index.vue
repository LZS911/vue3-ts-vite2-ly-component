<script lang='ts'>
import { VNode, defineComponent, h, Fragment, withDirectives } from 'vue';

export default defineComponent({
  name: 'TestFunction',
  components: {},
  props: {
    testtt: {
      type: String,
      default: '1'
    }
  },
  setup() {},
  render() {
    const { $slots, testtt } = this;
    const a = $slots.test ? $slots.test() : null;
    a.forEach((e) => console.log((a[0] as VNode).type === Fragment));
    console.log(a, testtt);
    return h('div');
  }
});
</script>
