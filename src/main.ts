import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(Antd)
  .mount('#app');
/* app.config.errorHandler = (err, vm, info) => {
  console.log('[全局异常]', err, vm, info)
} */
