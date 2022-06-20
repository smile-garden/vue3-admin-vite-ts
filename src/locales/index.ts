import { createI18n } from 'vue-i18n/index';
import zh from './zh-CN';
import en from './en-US';

const { language } = navigator;
const lang = language;

const i18n = createI18n({
  fallbackLocale: 'zh-CN',
  locale: lang,
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
});

export default i18n;
