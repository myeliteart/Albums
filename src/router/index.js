import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//  import { auth } from '@/firebase';
 import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/Music.vue'),
    },
    {
      path: '/music/:id',
      name: 'musicDetails',
      component: () => import('../views/MusicDetails.vue'),
    },
    {
      path: '/artist/:aid',
      name: 'Artist',
      component: () => import('../views/Artists.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue'),
    },
    {
      path: '/sign-in',
      name: 'Signin',
      component: () => import('../views/Dashboard/SignIn.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/shopping-cart',
      name: 'ShoppingCart',
      component: () => import('../views/Cart/ShoppingCart.vue'),
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../views/Cart/Checkout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/completed',
      name: 'Completed',
      component: () => import('../views/Cart/Completed.vue'),
    },
    {
      path: '/add-review/:id',
      name: 'AddReview',
      component: () => import('../views/Cart/AddReview.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/not-found',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    }
  ],
  
 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
  }
    if (to.hash) {
      return { el: to.hash };
    } 
      return { top: 0,  behavior: 'smooth'}
  },
  
  linkActiveClass: 'active'
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore() 

//   const isLoggedIn = userStore.auth

//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next('/sign-in')
//   } else if (to.meta.guestOnly && isLoggedIn) {
//     next('/dashboard') // or home page
//   } else {
//     next()
//   }
// })

export default router
