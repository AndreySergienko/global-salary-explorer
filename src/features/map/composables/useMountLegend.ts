import { createApp, h, reactive } from 'vue'
import MapLegend, { type Props } from '@/features/map/components/MapLegend/MapLegend.vue'

export function mountLegend(initialProps: Props) {
  const container = document.createElement('div')
  const state = reactive({ ...initialProps })
  const app = createApp(() => h(MapLegend, state))
  app.mount(container)

  return {
    el: container,
    set(next: Partial<typeof state>) {
      Object.assign(state, next)
    },
    unmount() {
      app.unmount()
    },
  }
}
