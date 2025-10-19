export type LatLng = google.maps.LatLngLiteral;

function ringToPathSafe(ring: unknown): LatLng[] {
  if (!Array.isArray(ring)) return [];
  const pts = ring
    .filter((p): p is [number, number] =>
      Array.isArray(p) &&
      p.length >= 2 &&
      Number.isFinite(p[0]) &&
      Number.isFinite(p[1])
    )
    .map(([lng, lat]) => ({ lat, lng }));

  if (pts.length < 3) return [];

  const first = pts[0];
  const last = pts[pts.length - 1];

  if (!first) return [];
  if (!last) return [];

  if (first.lat !== last.lat || first.lng !== last.lng) {
    pts.push({ ...first });
  }
  return pts;
}

export function featureToPolygonPaths(feature: {
  geometry_type: 'Polygon' | 'MultiPolygon',
  coordinates: unknown
}): LatLng[][][] {
  if (!feature || !feature.geometry_type) return [];

  // Нормализуем в массив полигонов (даже для Polygon)
  const polygons: unknown[] =
    feature.geometry_type === 'Polygon'
      ? [feature.coordinates]
      : Array.isArray(feature.coordinates)
        ? feature.coordinates
        : [];

  const result: LatLng[][][] = [];

  for (const poly of polygons) {
    if (!Array.isArray(poly)) continue;

    const rings = poly
      .map(ringToPathSafe)
      .filter(r => r.length >= 4);

    if (rings.length > 0) {
      result.push(rings);
    }
  }

  return result;
}
