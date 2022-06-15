import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import router from '@/router';
import i18n from '@/locales/index';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(router)
  .use(Antd)
  .use(i18n)
  .mount('#app');
/* app.config.errorHandler = (err, vm, info) => {
  console.log('[全局异常]', err, vm, info)
} */
