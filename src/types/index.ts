export type Position = [number, number];

export interface CountryFeature {
  code: string;
  country: string;
  year: number;
  monthly_net_usd?: number;
  yearly_gross_usd: number;
  geometry_type: 'Polygon' | 'MultiPolygon';
  coordinates: Position[][] | Position[][][];
}

export type Lang = 'ru' | 'en'
