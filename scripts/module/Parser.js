import csv from 'csvtojson'
import fs from 'node:fs'
import path from 'node:path'
import { Geo } from './Geo.js'
import countries from 'world-countries'

// индекс названий по официальному имени → ISO3
const INDEX_BY_OFFICIAL_NAME = new Map(
  countries.map(c => [c.name.official.toLowerCase(), c.cca3])
)

const toNumber = s => {
  const n = Number(String(s).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : null
}

export class Parser {
  constructor({ srcPath, dstPath, geoPath }) {
    this.geoModule = new Geo(geoPath)
    this.srcPath = srcPath
    this.dstPath = dstPath
  }

  async start() {
    const rows = await csv().fromFile(this.srcPath)

    const result = rows.map(r => {
      const countryRaw = r.Country ?? ''
      let code = this.geoModule.getISO3_EN(countryRaw)

      if (!code) {
        const nameKey = countryRaw.trim().toLowerCase()
        code = INDEX_BY_OFFICIAL_NAME.get(nameKey) ?? null
      }

      const geometry = code ? this.geoModule.getGeometry(code) : null

      return {
        code,
        country: countryRaw,
        year: Number(r.Date),
        monthly_net_usd: toNumber(r.Amount),
        yearly_gross_usd: toNumber(r['Year Gross Salary']),
        geometry_type: geometry?.type ?? null,
        coordinates: geometry?.coordinates ?? null,
      }
    })

    fs.mkdirSync(path.dirname(this.dstPath), { recursive: true })
    fs.writeFileSync(this.dstPath, JSON.stringify(result, null, 2))
    console.log(`✅ Saved ${result.length} records to ${this.dstPath}`)
  }
}
