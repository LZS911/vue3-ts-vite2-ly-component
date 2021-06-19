<template>
  <div>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Link',
  components: {},
  props: {},
  setup() {
    const admin = ref(false);

    return {
      admin
    };
  }
});
</script>
