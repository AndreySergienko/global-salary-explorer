/// <reference lib="webworker" />

import { getChoroplethColor } from '@/utils/colorsScale'
import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap'
import type { CountryFeature } from '@/types'

self.onmessage = (e: MessageEvent) => {
  const { items, min, max } = e.data as {
    items: CountryFeature[]
    min: number
    max: number
  }

  console.log('[WORKER] computing', e.data.items.length, 'features')

  const result = items.map((item) => {
      const paths = featureToPolygonPaths(item)
      const value = item.yearly_gross_usd ?? 0
      const fillColor = getChoroplethColor(value, min, max)

      return {
        ...item,
        paths,
        fillColor,
      }
    })

  ;(self as DedicatedWorkerGlobalScope).postMessage(result)
  self.close();
}
