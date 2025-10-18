import fs from 'node:fs';
import path from 'node:path';
import csv from 'csvtojson';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json' with { type: 'json' };

const SRC = 'data/salaries.csv';
const DST = 'public/data/salaries.json';

countries.registerLocale(en);

const toNumber = (s) => {
  if (!s) return null;
  const n = Number(String(s).replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? null : n;
};

const toISO3 = (name) => {
  const a3 = countries.getAlpha3Code(name, 'en');
  return a3 || null;
}

(async () => {
  console.log(`📥 Converting ${SRC} → ${DST}`);

  const rows = await csv().fromFile(SRC);


  const result = rows.map((r) => ({
    code: toISO3(r['Country']),
    country: r['Country'],
    year: Number(r['Date']) || null,
    monthly_net_usd: toNumber(r['Amount']),
    yearly_gross_usd: toNumber(r['Year Gross Salary']),
  }));

  fs.mkdirSync(path.dirname(DST), { recursive: true });
  fs.writeFileSync(DST, JSON.stringify(result, null, 2));
  console.log(`✅ Saved ${result.length} records to ${DST}`);
})();
