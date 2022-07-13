import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ls from '@/utils/storage';
import { setDocumentTitle } from './utils/util';
import store from './store';

const whiteList = ['accountLogin', 'exception404'];

router.beforeEach((to: any, from, next) => {
  NProgress.start();
  const token = ls.get('token');
  if (token) {
    if (to.name === 'accountLogin') {
      NProgress.done();
      next({ name: 'home' });
    } else {
      store.dispatch('getUserInfo');
      const redirect = decodeURIComponent(to.query.redirect || to.path);
      if (to.path === redirect) {
        next();
      } else {
        next({ path: redirect });
      }
    }
  } else if (whiteList.includes(to.name)) {
    next();
  } else {
    next({
      name: 'accountLogin',
      query: {
        redirect: to.fullPath,
      },
    });
    NProgress.done();
  }
});

router.afterEach((to) => {
  NProgress.done();
  if (to.meta) setDocumentTitle(to.meta.title as string);
});
