import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { Test, AllStateTypes } from './types';

// 引入子模块
import accountModule from './modules/account';

export default createStore<Test>({
  state: {
    test: '',
  },
  getters: {},
  mutations: {
    CHANGE_TEST(state, val) {
      state.test = val;
    },
  },
  modules: {
    accountModule,
  },
});

export const key: InjectionKey<Store<Test>> = Symbol('vue-store');

export function useStore<T=AllStateTypes>() {
  return baseUseStore<T>(key);
}
