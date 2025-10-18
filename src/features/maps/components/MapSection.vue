<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useGoogleMap } from '@/features/maps/composables/useGoogleMap.ts'
import AppLoader from '@/core/shared/AppLoader.vue'
import { getChoroplethColor } from '@/features/maps/utils/colorsScale.ts'
import { addLegendControl } from '@/features/maps/utils/legendControl.ts'
import CountryChoropleth from '@/features/maps/components/CountryChoropleth.vue'
import type { CountryFeature } from '@/features/maps/types'

const mapEl = ref<HTMLDivElement | null>(null)
const features = ref<CountryFeature[]>([])
const { loadMap, destroy, map, isLoaded } = useGoogleMap()
let removeLegend: (() => void) | undefined | null = null

onMounted(async () => {
  if (!mapEl.value) {
    throw new Error('[MAP] Map is not defined.')
  }

  const res = await fetch('/data/salaries.json')
  if (!res.ok) throw new Error('Не удалось загрузить JSON')
  features.value = await res.json()

  await loadMap({
    element: mapEl.value,
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 5
  })

  // Легенда
  const vals = features.value.map(f => f.yearly_gross_usd)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  removeLegend = addLegendControl(
    map.value!,
    min,
    max,
    (v) => getChoroplethColor(v, min, max)
  )
})

onUnmounted(() => {
  removeLegend?.()
  destroy()
})
</script>

<template>
  <section class="map">
    <div ref="mapEl" style="width: 100%; height: 560px" aria-label="Map"></div>
    <CountryChoropleth
      v-if="isLoaded"
      :features="features"
      :map="map"
      :isLoaded="isLoaded"
      valueKey="yearly_gross_usd"
    />
    <AppLoader v-if="!isLoaded" />
  </section>
</template>
