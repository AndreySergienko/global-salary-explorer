import fs from 'node:fs'
import path from 'node:path'
import csv from 'csvtojson'
import countries from 'world-countries'

const SRC = 'data/salaries.csv'
const GEO = 'data/custom.geo.json'
const DST = 'public/data/salaries.json'

const toNumber = (s) => Number(String(s).replace(/[^0-9.-]/g, '')) || null

const indexByName = Object.fromEntries(
  countries.map(c => [c.name.common.toLowerCase(), c.cca3])
)


const geo = JSON.parse(fs.readFileSync(GEO, 'utf-8'))
const geoByISO3 = Object.fromEntries(
    geo.features.map(f => {
      const p = f.properties || {}
      const code =
        (p.iso_a3 ||
          p.adm0_a3 ||
          p.ADM0_A3 ||
          p.ISO_A3 ||
          p.brk_a3 ||
          p.gu_a3 ||
          p.sov_a3 ||
          '').toString().toUpperCase()
      return [code, f.geometry || null]
    })
  )

;(async () => {
  const rows = await csv().fromFile(SRC)

  const result = rows.map(r => {
    const name = (r.Country || '').trim().toLowerCase()
    const code = indexByName[name] || null
    const geometry = code ? geoByISO3[code] || null : null

    return {
      code,
      country: r.Country,
      year: Number(r.Date),
      monthly_net_usd: toNumber(r.Amount),
      yearly_gross_usd: toNumber(r['Year Gross Salary']),
      geometry_type: geometry?.type ?? null,
      coordinates: geometry?.coordinates ?? null
    }
  })

  fs.mkdirSync(path.dirname(DST), { recursive: true })
  fs.writeFileSync(DST, JSON.stringify(result, null, 2))
  console.log(`✅ Saved ${result.length} records to ${DST}`)
})()
