<template>
  <div>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
    <a v-show="userDrop" id="userDrop">userDrop</a>
    <button id="showAdmin" @click="showAdmin">showAdmin</button>
    <button id="showUserDrop" @click="showDrop">showDrop</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { $ } from '../../utils';

export default defineComponent({
  name: 'Link',
  components: {},
  props: {},

  setup() {
    const admin = ref(false);
    const showLink = ref(false);
    const userDrop = ref(false);
    const showAdmin = () => {
      admin.value = true;
    };
    const showDrop = () => {
      userDrop.value = true;
    };
    return {
      admin,
      showLink,
      showAdmin,
      showDrop,
      userDrop
    };
  }
});
</script>
