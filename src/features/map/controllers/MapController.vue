<script setup lang="ts">
import { onMounted, onUnmounted, ref, toValue } from 'vue'
import { storeToRefs } from 'pinia'
import { useGoogleMap } from '@/features/map/composables/useGoogleMap.ts'
import { useFeaturesStore } from '@/stores/useFeaturesStore.ts'
import { mountLegend } from '@/features/map/composables/useMountLegend.ts'
import { useRenderPolygon } from '@/features/map/composables/useRenderPolygon.ts'
import { useI18n } from 'vue-i18n'

const mapEl = ref<HTMLDivElement | null>(null)
const store = useFeaturesStore()
const { t } = useI18n()
const { items, minYearlyGross, maxYearlyGross } = storeToRefs(store)
const { loadMap, destroy, map } = useGoogleMap()

const tooltip = mountLegend({ label: '', yearly: 1, t })


const { drawPolygons, clearPolygons } = useRenderPolygon(map)

onMounted(async () => {
  if (!mapEl.value) {
    throw new Error('[MAP] Map is not defined.')
  }

  await store.fetchFeatures()

  await loadMap({
    element: mapEl.value,
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 2,
    tilt: 67.5,
    mapId: import.meta.env.VITE_GOOGLE_MAP_ID
  })

  const min = toValue(minYearlyGross)
  const max = toValue(maxYearlyGross)

  if (!min || !max || !map.value) {
    throw new Error('Min or Max or Map value is undefined')
  }

  await drawPolygons({
    items: items.value,
    tooltip,
    min,
    max,
  })
})

onUnmounted(() => {
  clearPolygons()
  destroy()
})
</script>

<template>
  <section class="map">
    <div ref="mapEl" style="width: 56em; height: 56em" aria-label="Map"></div>
  </section>
</template>
