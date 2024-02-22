import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '../layouts/AppLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: () => import('../views/CashierView.vue')
    },
    {
      path: '/poker',
      name: 'poker',
      component: () => import('../views/Poker.vue'),
      meta:{
        layout:'AppLayout'
      },
    },
    {
      path: '/tickets',
      name: 'ticket',
      component: () => import('../views/Ticket.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: () => import('../views/InvitationView.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/backgammon/:matchId',
      name: 'backgammon',
      meta:{
        layout:'AppLayout'
      },
      component: () => import('../views/BackgammonView.vue')
    },
    {
      path: '/next-match/:matchId',
      name: 'nextMatch',
      meta:{
        layout:'AppLayout'
      },
      component: () => import('../components/NextMatch.vue')
    }
  ]
})

export default router
