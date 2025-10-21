import type { CountryFeature } from '@/types'
import { getChoroplethColor } from '@/utils/colorsScale.ts'
import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap.ts'

export type DataInput = { items: CountryFeature[]; min: number; max: number }
interface  DataOutput<Paths = google.maps.LatLngLiteral[][][]> extends CountryFeature {
  paths: Paths;
  fillColor: string;
}

export function computeChoropleth({ items, min, max }: DataInput) {
  return items.map<DataOutput>((item) => {
    const paths = featureToPolygonPaths(item)
    const value = item.yearly_gross_usd ?? 0
    const fillColor = getChoroplethColor(value, min, max)
    return { ...item, paths, fillColor }
  })
}
