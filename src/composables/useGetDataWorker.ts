import { toRaw } from 'vue'
import type { CountryFeature, CountryFeatureOutWorker } from '@/types'

export function useGetDataWorker() {
  const worker = new Worker(
    new URL('../workers/geo-worker.ts', import.meta.url),
    { type: 'module' }
  )

  /**
   * Подготовка данных в web-worker.
   * Выполняет featureToPolygonPaths + вычисление цвета.
   */
  function prepareInWorker(items: CountryFeature[], min: number, max: number) {
    return new Promise<CountryFeatureOutWorker[]>((resolve, reject) => {
      const plainItems = toRaw(items).map(i => ({
        code: i.code,
        country: i.country,
        year: i.year,
        geometry_type: i.geometry_type,
        coordinates: i.coordinates,
        monthly_net_usd: i.monthly_net_usd,
        yearly_gross_usd: i.yearly_gross_usd,
      }))

      const handleMessage = (e: MessageEvent) => {
        console.log('[MAIN] Got from worker:', e.data.length)
        worker.removeEventListener('message', handleMessage)
        worker.removeEventListener('error', handleError)
        resolve(e.data as CountryFeatureOutWorker[])
      }

      const handleError = (e: ErrorEvent) => {
        worker.removeEventListener('message', handleMessage)
        worker.removeEventListener('error', handleError)
        console.error('[Worker Error]', e.message)
        reject(e)
      }

      worker.addEventListener('message', handleMessage)
      worker.addEventListener('error', handleError)

      try {
        worker.postMessage({ items: plainItems, min, max })
      } catch (err) {
        console.error('[Worker postMessage failed]', err)
        reject(err)
      }
    })
  }

  return {
    worker,
    prepareInWorker,
  }
}
