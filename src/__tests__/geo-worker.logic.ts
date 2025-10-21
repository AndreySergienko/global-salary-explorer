import { describe, it, expect, vi } from 'vitest'
import { computeChoropleth, type DataInput } from '@/utils/computeChoropleth.ts'

vi.mock('@/utils/transformJsonToPointMap', () => ({
  featureToPolygonPaths: vi.fn().mockReturnValue([
    [[{ lat: 0, lng: 0 }]],
  ]),
}))

vi.mock('@/utils/colorsScale', () => ({
  getChoroplethColor: vi.fn().mockReturnValue('#123456'),
}))

describe('computeChoropleth', () => {
  it('Add paths и fillColor in every item', () => {

    const input: DataInput = {
      items: [
        {
          code: 'US',
          country: 'United States',
          year: 2025,
          yearly_gross_usd: 100,
          geometry_type: 'Polygon',
          coordinates: [[[0, 0]]],
        },
      ],
      min: 0,
      max: 200,
    }

    const result = computeChoropleth(input)

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    const item = result[0]
    expect(item).toBeDefined()
    expect(item).toHaveProperty('code', 'US')
    expect(item).toHaveProperty('paths')
    expect(Array.isArray(item!.paths)).toBe(true)
    expect(item!.paths.length).toBeGreaterThan(0)

    expect(item).toHaveProperty('fillColor', '#123456')
  })
})
