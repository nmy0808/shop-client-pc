import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '../views/home'
import store from '@/store'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/category/:id',
        name: 'category',
        component: () => import('@/views/category')
      },
      {
        path: '/category/sub/:id',
        name: 'categorySub',
        component: () => import('@/views/category/category-sub.vue')
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: '/member/pay',
        name: 'pay',
        component: () => import('@/views/member/pay/index.vue')
      },
      {
        path: '/member/checkout',
        name: 'pay-checkout',
        component: () => import('@/views/member/pay/checkout.vue')
      },
      {
        path: '/pay/callback',
        name: 'pay-callback',
        component: () => import('@/views/member/pay/callback.vue')
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/Layout'),
        redirect: { name: 'member-home' },
        children: [
          {
            path: 'home',
            name: 'member-home',
            component: () => import('@/views/member/home/index')
          },
          {
            path: 'order',
            name: 'member-order',
            component: () => import('@/views/member/order/index'),
            redirect: { name: 'member-order-home' },
            children: [
              {
                path: '',
                name: 'order',
                component: () => import('@/views/member/order/components/order-home')
              },
              {
                path: ':id',
                name: 'order-detail',
                component: () => import('@/views/member/order/components/order-detail')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index')
  },
  { path: '/login/callback', component: () => import('@/views/login/callback') }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // ?????????????????????
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const { token } = store.state.user.profile
  if (to.fullPath.startsWith('/member') && !token) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router
