import { defineStore } from 'pinia'
import { computed, readonly, ref, shallowRef } from 'vue'
import type { CountryFeature } from '@/types'


export const useFeaturesStore = defineStore('features', () => {
  const items = ref<CountryFeature[]>([])
  const error = shallowRef<string | null>(null)

  const yearlyGrossValues = computed<number[]>(() =>
    items.value
      .map(f => f.yearly_gross_usd)
      .filter((v): v is number => Number.isFinite(v as number))
  )

  const minYearlyGross = computed<number | null>(() => {
    const arr = yearlyGrossValues.value
    return arr.length ? Math.min(...arr) : null
  })

  const maxYearlyGross = computed<number | null>(() => {
    const arr = yearlyGrossValues.value
    return arr.length ? Math.max(...arr) : null
  })

  const byISO3 = computed<Map<string, CountryFeature>>(() => {
    const m = new Map<string, CountryFeature>()
    for (const f of items.value) if (f.code) m.set(f.code, f)
    return m
  })

  async function fetchFeatures(url = '/data/salaries.json') {
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to load ${url}: ${res.status}`)
      }
      items.value = await res.json()
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        console.error(e)
      }
    }
  }

  return {
    items,
    error: readonly(error),
    yearlyGrossValues,
    minYearlyGross,
    maxYearlyGross,
    byISO3,
    fetchFeatures
  }
})
