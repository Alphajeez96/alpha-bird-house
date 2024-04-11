import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BirdHouses from '../views/BirdHouses.vue'
import Dashboard from '@/layouts/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/bird-houses',
      name: 'bird-houses',
      component: BirdHouses,
      meta: { layout: Dashboard }
    }
  ]
})

export default router
