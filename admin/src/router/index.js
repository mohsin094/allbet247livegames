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
    {
      path: '/games',
      name: 'games',
      component: () => import('./../components/pages/Games.vue')
    },
    {
      path: '/game-stakes',
      name: 'gameStakes',
      component: () => import('./../components/pages/GameStakes.vue')
    },
    {
      path: '/financial',
      name: 'financial',
      component: () => import('./../components/pages/Financial.vue')
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: () => import('./../components/pages/Announcements.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./../components/pages/Settings.vue')
    },
  ]
})

export default router
