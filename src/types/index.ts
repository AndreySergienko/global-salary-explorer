import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap.ts'

export type Position = [number, number];
type LatLng = google.maps.LatLngLiteral

export interface CountryFeature {
  code: string;
  country: string;
  year: number;
  monthly_net_usd?: number;
  yearly_gross_usd: number;
  geometry_type: 'Polygon' | 'MultiPolygon';
  coordinates: Position[][] | Position[][][];
}

export interface CountryFeatureOutWorker extends CountryFeature {
  paths: ReturnType<typeof featureToPolygonPaths>
  fillColor: string;
}
