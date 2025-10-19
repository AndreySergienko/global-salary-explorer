import { describe, it, expect } from 'vitest'
import { featureToPolygonPaths } from '@/utils/transformJsonToPointMap'

describe('featureToPolygonPaths', () => {
  it('возвращает пустой массив для неверных данных', () => {
    expect(featureToPolygonPaths({ geometry_type: 'Polygon', coordinates: null })).toEqual([])
  })

  // TODO
  // it('замыкает контур если последняя точка не совпадает с первой', () => {
  //   const coords = [[[ [0, 0], [1, 0], [1, 1], [0, 1] ]]]
  //   const result = featureToPolygonPaths({
  //     geometry_type: 'Polygon',
  //     coordinates: coords
  //   })
  //
  //   expect(Array.isArray(result)).toBe(true)
  //   expect(result.length).toBeGreaterThan(0)
  //
  //   const firstPolygon = result[0]?.[0]
  //   expect(Array.isArray(firstPolygon)).toBe(true)
  //   expect(firstPolygon?.length).toBeGreaterThan(3)
  //
  //   const first = firstPolygon?.[0]
  //   const last = firstPolygon?.at(-1)
  //   expect(first).toBeDefined()
  //   expect(last).toBeDefined()
  //   expect(first).toEqual(last)
  // })
})
