import { Parser } from './module/Parser.js'

const GEO = 'data/custom.geo.json'
const SRC = 'data/salaries.csv'
const DST = 'public/data/salaries.json'

const parser = new Parser({
  srcPath: SRC,
  dstPath: DST,
  geoPath: GEO,
})

parser.start()
