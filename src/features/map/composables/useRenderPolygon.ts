import { ref, type Ref } from 'vue'
import type { CountryFeature } from '@/types'
import { mountLegend } from '@/features/map/composables/useMountLegend.ts'
import { useGetDataWorker } from '@/features/map/composables/useGetDataWorker.ts'

const BASE_CONFIG_POLYGON = {
  strokeColor: '#555555',
  strokeOpacity: 0.7,
  strokeWeight: 1,
  fillOpacity: 0.75,
  clickable: true,
  zIndex: 2
}

interface ArgsCreatePolygon {
  fillColor?: string | null
  paths: google.maps.MVCArray | unknown[] | null;
  map: google.maps.Map
}

interface ArgsDraw {
  items: CountryFeature[]
  min: number
  max: number
  tooltip: ReturnType<typeof mountLegend>
}

export function useRenderPolygon(map: Ref<google.maps.Map | null>) {
  const polygonList = ref<google.maps.Polygon[]>([])
  const infoWindow = ref<google.maps.InfoWindow | null>(null)

  const { worker, prepareInWorker } = useGetDataWorker()

  function createPolygon({ paths, fillColor, map }: ArgsCreatePolygon) {
    return new google.maps.Polygon({
      paths,
      fillColor,
      map,
      ...BASE_CONFIG_POLYGON
    })
  }


  async function drawPolygons({ items, min, max, tooltip }: ArgsDraw) {
    const prepared = await prepareInWorker(items, min, max)

    for (const itemCountry of prepared) {
      const { paths, fillColor, yearly_gross_usd, monthly_net_usd, country } = itemCountry
      // const polygons = featureToPolygonPaths(itemCountry)
      const valuePerYear = yearly_gross_usd
      const valuePerMonth = monthly_net_usd
      // const fillColor = getChoroplethColor(valuePerYear, min, max)
      const mapObject = map.value

      if (!mapObject) {
        break;
      }

      infoWindow.value = new google.maps.InfoWindow()
      for (const polygonPaths of paths) {
        const polygon = createPolygon({ paths: polygonPaths, fillColor, map: mapObject })

        const onMouseOver = (e: google.maps.MapMouseEvent) => {
          polygon.setOptions({ strokeWeight: BASE_CONFIG_POLYGON.strokeWeight * 2 })
          tooltip.set({
            label: country,
            monthly: valuePerMonth,
            yearly: valuePerYear,
          })
          infoWindow.value!.setContent(tooltip.el)
          infoWindow.value!.setPosition(e.latLng!)
          infoWindow.value!.open({ map: map.value! })
        }

        const onMouseOut = () => {
          polygon.setOptions({ strokeWeight: BASE_CONFIG_POLYGON.strokeWeight })
          infoWindow.value?.close()
        }

        polygon.addListener('mouseover', onMouseOver)
        polygon.addListener('mouseout', onMouseOut)

        polygonList.value.push(polygon)
      }
    }
  }

  function clearPolygons() {
    polygonList.value.forEach((polygon) => {
      google.maps.event.clearInstanceListeners(polygon)
      polygon.setMap(null)
    })
    polygonList.value = []
    worker.terminate()
  }

  return {
    drawPolygons,
    clearPolygons
  }
}
