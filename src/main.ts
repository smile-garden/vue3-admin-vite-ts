import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import router from '@/router';
import store, { key } from '@/store';
import i18n from '@/locales/index';
import App from './App.vue';
import 'ant-design-vue/dist/antd.variable.min.css'; // 动态切换主题
// import 'ant-design-vue/dist/antd.less'; // 静态自定义样式
import '@/style/app.less';

import '@/permission';

createApp(App)
  .use(router)
  .use(Antd)
  .use(store, key)
  .use(i18n)
  .mount('#app');
/* app.config.errorHandler = (err, vm, info) => {
  console.log('[全局异常]', err, vm, info)
} */
