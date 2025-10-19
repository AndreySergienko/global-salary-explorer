import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutsEnum, AppLayoutToFileMap } from '@/types/layout.types.ts'

type VueModule = { default: import('vue').DefineComponent }

const layoutModules = import.meta.glob<VueModule>('/src/layouts/*.vue')

export async function loadLayoutMiddleware(route: RouteLocationNormalized) {
  const { layout } = route.meta
  const normalizedLayoutName = layout || AppLayoutsEnum.default;
  const fileName = AppLayoutToFileMap[normalizedLayoutName];
  const fullPath = `/src/layouts/${fileName}`
  const loader = layoutModules[fullPath]
  if (!loader) {
    console.error(`[layout] not found ${fullPath}, fileName: ${fileName}`)
    return
  }
  const mod = await loader()
  route.meta.layoutComponent = mod.default
}
