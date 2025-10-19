import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap.ts'
import type { CountryFeature } from '@/types'

export interface CountryFeatureOutWorker extends CountryFeature {
  paths: ReturnType<typeof featureToPolygonPaths>
  fillColor: string;
}
