import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./../components/pages/Dashboard.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./../components/pages/Users.vue')
    },
  ]
})

export default router
