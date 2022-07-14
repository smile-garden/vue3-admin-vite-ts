import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout.vue';
import AccountLayout from '@/layouts/AccountLayout.vue';
import RouterView from '@/layouts/RouterView.vue';
import {
  FormOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  AppstoreOutlined,
  /*
  UserOutlined, */
} from '@ant-design/icons-vue';

type RouteConfig = RouteRecordRaw & { hidden?: boolean };
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: DashboardOutlined,
        },
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/dashboard/IndexPage.vue'),
      },
      {
        path: '/form',
        name: 'form',
        meta: {
          title: 'formPage',
          icon: FormOutlined,
        },
        redirect: '/form/basic',
        component: RouterView,
        children: [
          {
            path: '/form/basic',
            name: 'formBasic',
            meta: {
              title: 'formBasic',
            },
            redirect: '/form/basic/child',
            component: RouterView,
            children: [
              {
                path: '/form/basic/child',
                name: 'formBasicChild',
                meta: {
                  title: 'formBasicChild',
                },
                component: () => import(/* webpackChunkName: "formBasic" */ '@/views/form/FormBasic.vue'),
              },
            ],
          },
          {
            path: '/form/step',
            name: 'formStep',
            meta: {
              title: 'formStep',
            },
            component: () => import(/* webpackChunkName: "formStep" */ '@/views/form/FormStep.vue'),
          },
          {
            path: '/form/advanced',
            name: 'formAdvanced',
            meta: {
              title: 'formAdvanced',
            },
            component: () => import(/* webpackChunkName: "formAdvanced" */ '@/views/form/FormAdvanced.vue'),
          },
        ],
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          title: 'listPage',
          icon: UnorderedListOutlined,
        },
        redirect: '/list/table',
        component: RouterView,
        children: [
          {
            path: '/list/table',
            name: 'listTable',
            meta: {
              title: 'tableList',
            },
            component: () => import(/* webpackChunkName: "listTable" */ '@/views/list/TableList.vue'),
          },
        ],
      },
      {
        path: '/detail',
        name: 'detail',
        meta: {
          title: 'detailPage',
          icon: ProfileOutlined,
        },
        redirect: '/detail/basic',
        component: RouterView,
        children: [
          {
            path: '/detail/basic',
            name: 'detailBasic',
            meta: {
              title: 'detailBasic',
            },
            component: () => import(/* webpackChunkName: "detailBasic" */ '@/views/detail/DetailBasic.vue'),
          },
          {
            path: '/detail/advanced',
            name: 'detailAdvanced',
            meta: {
              title: 'detailAdvanced',
            },
            component: () => import(/* webpackChunkName: "detailAdvanced" */ '@/views/detail/DetailAdvanced.vue'),
          },
        ],
      },
      {
        path: '/components',
        name: 'components',
        meta: {
          title: 'components',
          icon: AppstoreOutlined,
        },
        redirect: '/components/editor',
        component: RouterView,
        children: [
          {
            path: '/components/editor',
            name: 'componentsEditor',
            meta: {
              title: 'componentsEditor',
            },
            component: () => import(/* webpackChunkName: "componentsEditor" */ '@/views/components/EditorDemo.vue'),
          },
        ],
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
