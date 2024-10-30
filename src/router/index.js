import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import GetUser from '@/views/lol/GetUser.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/league-of-legends',
      name: 'lol',
      component: () => import('../views/lol/GetUser.vue')
    },
    {
      path: '/league-of-legends/stats/:puuid',
      name: 'lolStats',
      component: () => import('../views/lol/Summoner.vue')
    },
    {
      path: '/cs2',
      name: 'cs2',
      component: GetUser,
    },
    {
      path: '/valorant',
      name: 'Valorant',
      component: GetUser,
    },
  ],
});

export default router;
