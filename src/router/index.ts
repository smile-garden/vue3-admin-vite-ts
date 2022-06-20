import { createRouter, createWebHashHistory } from 'vue-router';
import { routes, basicRoutes } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes,
    ...basicRoutes,
  ],
});

export default router;
