import { Module } from 'vuex';
import { RootStateTypes } from '@/store/interface';
import ls from '@/utils/storage';
import { SystemTypes } from './interface';

const { userLanguage, language }: any = navigator;
const initLang = userLanguage || language || 'zh-CN';
const appModule: Module<SystemTypes, RootStateTypes> = {
  state: {
    lang: ls.get('lang', initLang),
    themeColor: ls.get('color', '#1890ff'),
  },
  getters: {
    lang(state) {
      return state.lang;
    },
    themeColor(state) {
      return state.themeColor;
    },
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
      ls.set('lang', lang);
      document.querySelector('html')!.setAttribute('lang', lang);
    },
    SET_THEME_COLOR(state, color) {
      state.themeColor = color;
      ls.set('color', color);
    },
  },
  actions: {},
};

export default appModule;
