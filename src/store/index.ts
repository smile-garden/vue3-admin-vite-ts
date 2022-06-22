import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { RootStateTypes, AllStateTypes } from './interface';

// 引入子模块
import accountModule from './modules/account';

export default createStore<RootStateTypes>({
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

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

export function useStore<T=AllStateTypes>() {
  return baseUseStore<T>(key);
}
