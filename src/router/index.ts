
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/lib/:id?',
      name: 'lib',
      component: () => import('../views/LibView.vue'),
      props: true,
      meta: {
        title: 'Library admin | IPACS',
        description: '',
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Physcon admin'
})

export default router

