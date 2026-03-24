// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { name: 'Index', path: '/', component: () => import('@/pages/PageIndex') },
  { name: 'Auth', path: '/auth', component: () => import('@/pages/PageAuth') },
  {
    name: 'Admin',
    path: '/admin',
    component: () => import('@/pages/PageAdmin'),
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const requiresAuth = to.meta.requiresAuth;
  const userAuth = sessionStorage.getItem('token');
  if (requiresAuth && userAuth !== null) return true;
  if (userAuth !== null && to.name !== 'Index') return { name: 'Admin' };
  if (requiresAuth && userAuth === null) return { name: 'Auth' };
});
