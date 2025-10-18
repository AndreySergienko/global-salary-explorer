import fs from 'node:fs';
import path from 'node:path';
import csv from 'csvtojson';

const SRC = 'data/salaries.csv';
const DST = 'public/data/salaries.json';

const toNumber = (s) => {
  if (!s) return null;
  const n = Number(String(s).replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? null : n;
};

(async () => {
  console.log(`📥 Converting ${SRC} → ${DST}`);

  const rows = await csv().fromFile(SRC);

  const result = rows.map((r) => ({
    country: r['Country'],
    year: Number(r['Date']) || null,
    monthly_net_usd: toNumber(r['Amount']),
    yearly_gross_usd: toNumber(r['Year Gross Salary']),
  }));

  fs.mkdirSync(path.dirname(DST), { recursive: true });
  fs.writeFileSync(DST, JSON.stringify(result, null, 2));
  console.log(`✅ Saved ${result.length} records to ${DST}`);
})();
