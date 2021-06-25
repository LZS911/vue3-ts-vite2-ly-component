// src/composables/state.js
import _ from 'lodash';
import { readonly, ref, Ref } from 'vue';

export const useState = <T>(initialState: T): [Ref<T>, (newState: T) => void] => {
  const state = ref(initialState);
  const setState = (newState: T) => {
    state.value = _.cloneDeep(newState) as any;
  };
  return [readonly(state) as Ref<T>, setState];
};
