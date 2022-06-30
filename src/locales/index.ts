import store from '@/store';
import { createI18n } from 'vue-i18n/index';
import zh from './zh-CN';
import en from './en-US';

const i18n = createI18n({
  fallbackLocale: 'zh-CN',
  locale: store.getters.lang,
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
});

export default i18n;
