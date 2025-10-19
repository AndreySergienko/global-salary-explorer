import { describe, it, expect } from 'vitest'
import { getChoroplethColor } from '@/utils/colorsScale'

describe('getChoroplethColor', () => {
  it('Show red if incorrect value', () => {
    expect(getChoroplethColor(NaN, 0, 10)).toBe('#d73027')
  })

  it('Show color if correct value', () => {
    const color = getChoroplethColor(50, 0, 100)
    expect(color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('If min or max show start hex color', () => {
    const color = getChoroplethColor(10, 10, 10)
    expect(color).toBe('#d73027')
  })
})
