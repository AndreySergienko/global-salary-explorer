export type LatLng = google.maps.LatLngLiteral;

function ringToPath(ring: [number, number][]): LatLng[] {
  if (ring.length === 0) return [];

  const first = ring[0];
  const last = ring[ring.length - 1];

  if (!first) return [];
  if (!last) return [];

  const closed =
    first[0] === last[0] && first[1] === last[1]
      ? ring
      : [...ring, first];


  return closed.map(([lng, lat]) => ({ lat, lng }));
}

export function featureToPolygonPaths(
  feature: { geometry_type: 'Polygon' | 'MultiPolygon'; coordinates: any }
): LatLng[][][] {
  if (feature.geometry_type === 'Polygon') {
    const rings: [number, number][][] = feature.coordinates;
    return [rings.map(ringToPath)];
  } else {
    const polygons: [number, number][][][] = feature.coordinates;
    return polygons.map((poly) => poly.map(ringToPath));
  }
}
