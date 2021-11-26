import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '../views/home'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
