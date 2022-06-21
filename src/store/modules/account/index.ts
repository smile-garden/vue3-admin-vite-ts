import { Module } from 'vuex';
import { Test } from '@/store/types';
import { AccountTypes } from './types';

const accountModule: Module<AccountTypes, Test> = {
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
