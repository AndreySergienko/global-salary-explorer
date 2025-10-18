<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
import type { CountryFeature } from '@/features/maps/types'
import { featureToPolygonPaths } from '@/features/maps/utils/transformJsonToPointMap.ts'
import { getChoroplethColor } from '@/features/maps/utils/colorsScale.ts'

interface Props {
  features: CountryFeature[]
  valueKey?: 'yearly_gross_usd' | 'monthly_net_usd'
  fillOpacity?: number
  strokeOpacity?: number
  strokeWeight?: number,
  map: google.maps.Map | null,
  isLoaded: boolean
}

const props = defineProps<Props>()
const overlays = ref<google.maps.Polygon[]>([])
const infoWindow = ref<google.maps.InfoWindow | null>(null)

const valueAccessor = (f: CountryFeature) => f[props.valueKey ?? 'yearly_gross_usd'] ?? 0

const minVal = computed(() => Math.min(...props.features.map(valueAccessor)))
const maxVal = computed(() => Math.max(...props.features.map(valueAccessor)))

function draw() {
  if (props.map) return
  clear()

  infoWindow.value = new google.maps.InfoWindow()

  for (const f of props.features) {
    const polygons = featureToPolygonPaths(f)
    const value = valueAccessor(f)
    const fillColor = getChoroplethColor(value, minVal.value, maxVal.value)

    for (const paths of polygons) {
      const polygon = new google.maps.Polygon({
        paths,
        strokeColor: '#555555',
        strokeOpacity: props.strokeOpacity ?? 0.7,
        strokeWeight: props.strokeWeight ?? 1,
        fillColor,
        fillOpacity: props.fillOpacity ?? 0.75,
        clickable: true,
        map: props.map
      })

      polygon.addListener('mouseover', (e: google.maps.MapMouseEvent) => {
        polygon.setOptions({ strokeWeight: (props.strokeWeight ?? 1) + 1 })
        if (!infoWindow.value) return
        infoWindow.value.setContent(`
          <div style="min-width:180px">
            <strong>${f.country}</strong><br/>
            ${props.valueKey ?? 'yearly_gross_usd'}: <b>${value.toLocaleString()}</b>
          </div>
        `)
        infoWindow.value.setPosition(e.latLng!)
        infoWindow.value.open({ map: props.map })
      })
      polygon.addListener('mouseout', () => {
        polygon.setOptions({ strokeWeight: props.strokeWeight ?? 1 })
        infoWindow.value?.close()
      })

      overlays.value.push(polygon)
    }
  }
}

function clear() {
  overlays.value.forEach(o => o.setMap(null))
  overlays.value = []
  infoWindow.value?.close()
  infoWindow.value = null
}

onMounted(() => {
  if (props.isLoaded) draw()
})

onUnmounted(() => clear())
</script>

<template>
  <!-- Ничего не рендерим, это чисто "поведенческий" компонент -->
  <div style="display:none" />
</template>
