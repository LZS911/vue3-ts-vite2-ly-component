<script lang='ts'>
import { defineComponent, h } from 'vue';

export default defineComponent({
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
    // console.log($slots.test ? $slots.test() : null, testtt);
    return h('div');
  }
});
</script>
