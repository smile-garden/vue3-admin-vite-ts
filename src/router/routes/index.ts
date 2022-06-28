import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';
import AccountLayout from '@/layouts/AccountLayout.vue'; import {
  FormOutlined,
  DashboardOutlined,
  /* UnorderedListOutlined,
  ProfileOutlined,
  UserOutlined, */
} from '@ant-design/icons-vue';

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
          icon: FormOutlined,
        },
        component: () => import(/* webpackChunkName: 'home' */ '@/views/HomePage.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: DashboardOutlined,
        },
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/dashboard/IndexPage.vue'),
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
