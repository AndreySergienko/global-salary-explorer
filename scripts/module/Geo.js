import fs from 'node:fs'
import countriesI18n from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json' with { type: 'json' }

countriesI18n.registerLocale(en)

const DIACRITICS_RE = /\p{Diacritic}+/gu
const PARENS_RE = /\(.*?\)/g
const PUNCT_RE = /[,.:;'"`´’‘]/g
const STOPWORDS_RE = /\b(the|of|and|republic|kingdom|state|states)\b/g
const MULTISPACE_RE = /\s+/g
const A3_RE = /^[A-Za-z]{3}$/
const A2_RE = /^[A-Za-z]{2}$/

const SPECIAL = new Map([
  ['viet nam', 'VNM'],
  ['burma', 'MMR'],
  ['laos', 'LAO'],
  ['syria', 'SYR'],
  ['swaziland', 'SWZ'],
  ['macedonia', 'MKD'],
])

const normalize = (s) => String(s)
  .toLowerCase()
  .normalize('NFD').replace(DIACRITICS_RE, '')
  .replace(PARENS_RE, ' ')
  .replace(PUNCT_RE, ' ')
  .replace(STOPWORDS_RE, ' ')
  .replace(MULTISPACE_RE, ' ')
  .trim()

const similarity = (a, b) => {
  if (!a || !b) return 0
  const A = new Set(a.split(' ')), B = new Set(b.split(' '))
  const inter = [...A].filter(x => B.has(x)).length
  const union = new Set([...A, ...B]).size
  const jaccard = union ? inter / union : 0
  const bonus = a === b ? 0.2 : (b.startsWith(a) || a.startsWith(b) ? 0.1 : 0)
  return jaccard + bonus
}

export class Geo {
  /**
   * @param {string} geoPath путь к GeoJSON
   */
  constructor(geoPath) {
    if (!geoPath) throw new Error('Geo path is not defined')

    const raw = fs.readFileSync(geoPath, 'utf-8')
    this.geo = JSON.parse(raw)
    if (!this.geo?.features || !Array.isArray(this.geo.features)) {
      throw new Error('Invalid GeoJSON: missing features[]')
    }

    // Map<ISO3, Geometry|null>
    this.geoByISO3 = new Map(
      this.geo.features.map(f => {
        const p = f?.properties ?? {}
        const code = p.adm0_a3_es || p.iso_a3
        return [code, f?.geometry ?? null]
      })
    )

    const names = countriesI18n.getNames('en')
    this._fuzzyCandidates = Object.entries(names).map(([a2, name]) => ({
      a2,
      norm: normalize(name),
    }))
  }

  /**
   * Возвращает ISO3 код по названию страны (англ.)
   * @param {string} input
   * @returns {string|null}
   */
  getISO3_EN(input) {
    if (!input) return null
    const s = String(input).trim()

    if (A3_RE.test(s)) return s.toUpperCase()
    if (A2_RE.test(s)) {
      const a3 = countriesI18n.alpha2ToAlpha3(s.toUpperCase())
      if (a3) return a3.toUpperCase()
    }

    const direct = countriesI18n.getAlpha3Code(s, 'en')
    if (direct) return direct.toUpperCase()

    const norm = normalize(s)
    const byNorm = countriesI18n.getAlpha3Code(norm, 'en')
    if (byNorm) return byNorm.toUpperCase()

    if (norm === 'other') return null
    if (SPECIAL.has(norm)) return SPECIAL.get(norm)

    // фаззи по уже подготовленным кандидатам
    let bestScore = -1
    let bestA2 = null
    for (const c of this._fuzzyCandidates) {
      const score = similarity(c.norm, norm)
      if (score > bestScore) {
        bestScore = score
        bestA2 = c.a2
      }
    }
    if (bestA2 && bestScore >= 0.6) {
      const a3 = countriesI18n.alpha2ToAlpha3(bestA2)
      return a3 ? a3.toUpperCase() : null
    }

    return null
  }

  /**
   * @param {string} iso3
   * @returns {import('geojson').Geometry|null}
   */
  getGeometry(iso3) {
    return this.geoByISO3.get(iso3) ?? null
  }
}
