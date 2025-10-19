import { describe, it, expect } from 'vitest'
import { getChoroplethColor } from '@/utils/colorsScale'

describe('getChoroplethColor', () => {
  it('возвращает красный при некорректных данных', () => {
    expect(getChoroplethColor(NaN, 0, 10)).toBe('#d73027')
  })

  it('возвращает корректный цвет в середине диапазона', () => {
    const color = getChoroplethColor(50, 0, 100)
    expect(color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('при min == max возвращает стартовый цвет', () => {
    const color = getChoroplethColor(10, 10, 10)
    expect(color).toBe('#d73027')
  })
})
