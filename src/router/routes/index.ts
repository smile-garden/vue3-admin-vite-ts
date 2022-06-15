import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';

type RouteConfig = RouteRecordRaw & { hidden?: boolean };
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'home',
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
  {
    path: '/404',
    name: 'exception404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/exception/NoFoundPage.vue'),
  },
];

export default routes;
