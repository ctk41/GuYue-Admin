import { createI18n } from 'vue-i18n';
import zh_CN from './modules/zh_CN';
import en from './modules/en';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  messages: {
    zh_CN,
    en,
  },
});

export default i18n;
