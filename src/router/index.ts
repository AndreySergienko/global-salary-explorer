import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayoutMiddleware.ts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Map',
    component: () => import('@/pages/MapView.vue'),
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

router.beforeEach(loadLayoutMiddleware);

export default router
