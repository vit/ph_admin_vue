
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '../stores/auth'


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // { path: '/login', component: () => import('../views/Login.vue') },
    {
      path: '/lib/:id?',
      name: 'lib',
      component: () => import('../views/LibView.vue'),
      props: true,
      meta: {
        title: 'Library admin | IPACS',
        description: '',
        // requiresAuth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// router.beforeEach((to, from, next) => {
router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Physcon admin'

  // const authStore = useAuthStore()
  // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //   next('/login')
  // } else {
    // next()
  // }

})

export default router


// import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from './stores/auth'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/', component: Home },
//     { path: '/login', component: Login },
//     { 
//       path: '/protected', 
//       component: ProtectedPage,
//       meta: { requiresAuth: true }
//     },
//   ],
// })

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/login')
//   } else {
//     next()
//   }
// })




