import type { AppLayoutsEnum } from '@/types/layout.types.ts'


declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: DefineComponent
  }
}
