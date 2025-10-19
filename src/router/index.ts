import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Map',
    component: () => import('@/pages/MapView.vue')
  },
  {
    path: '/graphic',
    name: 'Graphic',
    component: () => import('@/pages/GraphicView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
