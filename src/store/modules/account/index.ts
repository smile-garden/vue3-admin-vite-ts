import { Module } from 'vuex';
import { RootStateTypes } from '@/store/interface';
import { AccountTypes } from './interface';

const accountModule: Module<AccountTypes, RootStateTypes> = {
  state: {
    count: 0,
  },
  mutations: {
    ADD_COUNT(state) {
      state.count += 1;
    },
  },
};

export default accountModule;
