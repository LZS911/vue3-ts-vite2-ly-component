<template>
  <div class="warrp">
    <form @submit.prevent="submit">
      <input type="email" v-model="form.email" />

      <textarea v-model="form.description"></textarea>

      <select v-model="form.city">
        <option value="new-york">New York</option>
        <option value="moscow">Moscow</option>
      </select>

      <input type="checkbox" v-model="form.subscribe" />

      <input type="radio" value="weekly" v-model="form.interval" />
      <input type="radio" value="monthly" v-model="form.interval" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup(_, ctx) {
    const form = ref({
      email: '',
      city: '',
      description: '',
      subscribe: false,
      interval: ''
    });
    const submit = () => {
      ctx.emit('submit', form.value);
    };

    return {
      form,
      submit
    };
  }
});
</script>

<style lang='scss' scoped>
.warrp {
}
</style>
