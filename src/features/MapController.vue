<script setup lang="ts">
import { onMounted, onUnmounted, ref, toValue } from 'vue'
import { useGoogleMap } from '@/composables/useGoogleMap.ts'
import { useFeaturesStore } from '@/stores/useFeaturesStore.ts'
import { storeToRefs } from 'pinia'
import { mountLegend } from '@/composables/useMountLegend.ts'
import { useRenderPolygon } from '@/composables/useRenderPolygon.ts'

const mapEl = ref<HTMLDivElement | null>(null)
const store = useFeaturesStore()
const { items, minYearlyGross, maxYearlyGross } = storeToRefs(store)
const { loadMap, destroy, map } = useGoogleMap()

const tooltip = mountLegend({ label: '', yearly: 1 })
const { drawPolygons, clearPolygons } = useRenderPolygon(map)

onMounted(async () => {
  if (!mapEl.value) {
    throw new Error('[MAP] Map is not defined.')
  }

  await store.fetchFeatures()

  await loadMap({
    element: mapEl.value,
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 5
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
