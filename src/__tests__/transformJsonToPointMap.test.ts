import { describe, it, expect } from 'vitest'
import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap'

describe('featureToPolygonPaths', () => {
  it('Return empty array', () => {
    expect(featureToPolygonPaths({ geometry_type: 'Polygon', coordinates: null })).toEqual([])
  })
})
