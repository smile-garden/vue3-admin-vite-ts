import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';
import AccountLayout from '@/layouts/AccountLayout.vue';

type RouteConfig = RouteRecordRaw & { hidden?: boolean };
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'homePage',
        meta: {
          title: 'home',
        },
        component: () => import(/* webpackChunkName: 'home' */ '@/views/HomePage.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: 'dashboard',
        },
        component: () => import(/* webpackChunkName: 'about' */ '@/views/AboutPage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
  },
];

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    component: AccountLayout,
    children: [
      {
        path: '/account/login',
        name: 'accountLogin',
        component: () => import(/* webpackChunkName: 'login' */ '@/views/account/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: 'exception404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/exception/NoFoundPage.vue'),
  },
];
