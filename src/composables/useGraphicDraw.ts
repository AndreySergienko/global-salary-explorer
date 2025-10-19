import * as d3 from 'd3'
import type { Ref } from 'vue'
import type { CountryFeature } from '@/types'

export type CountryFeatureForGraphic = Omit<CountryFeature, 'geometry_type' | 'coordinates'>

interface Args {
  svgRef: Ref<SVGSVGElement | null>
  items: Ref<CountryFeature[]>
  counter: Ref<number>
}

interface Options {
  margin?: { top: number; right: number; bottom: number; left: number }
  formatValue?: (value: number) => string
  prepare?: (items: CountryFeature[], topN: number) => CountryFeatureForGraphic[]
}

const DEFAULT_MARGIN = { top: 16, right: 24, bottom: 16, left: 140 }

export function useGraphicDraw({ svgRef, items, counter }: Args, opts: Options = {}) {
  function prepareData(): CountryFeatureForGraphic[] {
    const defPrepare = (arr: CountryFeature[], topN: number): CountryFeatureForGraphic[] =>
      arr
        .filter(d => Number.isFinite(d.yearly_gross_usd))
        .map<CountryFeatureForGraphic>(d => ({
          code: d.code,
          country: d.country,
          year: d.year,
          monthly_net_usd: d.monthly_net_usd,
          yearly_gross_usd: d.yearly_gross_usd,
        }))
        .sort((a, b) => d3.descending(a.yearly_gross_usd, b.yearly_gross_usd))
        .slice(0, topN)

    const prep = opts.prepare ?? defPrepare
    return prep(items.value, counter.value)
  }

  function getDims(svgEl: SVGSVGElement) {
    const wrap = svgEl.parentElement!
    const W = wrap.clientWidth
    const H = wrap.clientHeight
    const m = { ...DEFAULT_MARGIN, ...(opts.margin ?? {}) }
    const w = Math.max(0, W - m.left - m.right)
    const h = Math.max(0, H - m.top - m.bottom)
    return { W, H, m, w, h }
  }

  function getTheme() {
    const css = getComputedStyle(document.documentElement)
    return {
      cStart: css.getPropertyValue('--color-start-hex').trim() || '#d73027',
      cEnd:   css.getPropertyValue('--color-end-hex').trim()   || '#1a9850',
      text:   css.getPropertyValue('--color-text').trim()      || '#222',
      accent: css.getPropertyValue('--color-accent').trim()    || '#2a4d8f',
      format: opts.formatValue ?? d3.format(','),
    }
  }

  function getScales(data: CountryFeatureForGraphic[], w: number, h: number, cStart: string, cEnd: string) {
    const maxVal = d3.max(data, (d: CountryFeatureForGraphic) => d.yearly_gross_usd) ?? 0
    const x = d3.scaleLinear().domain([0, maxVal]).nice().range([0, w])
    const y = d3
      .scaleBand<string>()
      .domain(data.map((d: CountryFeatureForGraphic) => d.country))
      .range([0, h])
      .paddingInner(0.15)
    const color = d3
      .scaleLinear<string>()
      .domain([0, maxVal])
      .range([cStart, cEnd])
      .interpolate(d3.interpolateRgb)
    return { x, y, color }
  }

  function render(svgEl: SVGSVGElement, data: CountryFeatureForGraphic[], dims: ReturnType<typeof getDims>, theme: ReturnType<typeof getTheme>) {
    const { W, H, m, w, h } = dims
    const { x, y, color } = getScales(data, w, h, theme.cStart, theme.cEnd)

    const svg = d3.select(svgEl)
    svg.attr('viewBox', `0 0 ${W} ${H}`)
    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`)

    const row = g
      .selectAll<SVGGElement, CountryFeatureForGraphic>('g.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d: CountryFeatureForGraphic) => `translate(0,${y(d.country)})`)

    row
      .append('rect')
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('height', Math.max(4, y.bandwidth()))
      .attr('width', (d: CountryFeatureForGraphic) => x(d.yearly_gross_usd))
      .attr('fill', (d: CountryFeatureForGraphic) => color(d.yearly_gross_usd))
      .attr('opacity', 0.95)

    row
      .append('text')
      .attr('x', -10)
      .attr('y', y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('font-size', 12)
      .attr('fill', theme.text)
      .text((d: CountryFeatureForGraphic) => d.country)

    row
      .append('text')
      .attr('x', (d: CountryFeatureForGraphic) => x(d.yearly_gross_usd) + 8)
      .attr('y', y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('font-size', 12)
      .attr('fill', theme.accent)
      .text((d: CountryFeatureForGraphic) => theme.format(d.yearly_gross_usd))
  }

  function draw() {
    const svgEl = svgRef.value
    if (!svgEl) throw new Error('Graphic is not defined')
    const data = prepareData()
    const dims = getDims(svgEl)
    const theme = getTheme()
    render(svgEl, data, dims, theme)
  }

  return { draw }
}
