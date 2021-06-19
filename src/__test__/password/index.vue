<template>
  <div>
    <input v-model="password" />
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';
import { EMPTY_STR } from '../../utils/constants';
import { $ } from '../../utils';

export default defineComponent({
  name: '',
  components: {},
  props: {
    minLength: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const password = ref(EMPTY_STR);
    const error = computed(() => {
      if ($(password).length < props.minLength) {
        return `Password must be at least ${props.minLength} characters.`;
      }
      return EMPTY_STR;
    });
    return {
      password,
      error
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
