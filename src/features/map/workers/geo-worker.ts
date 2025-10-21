/// <reference lib="webworker" />

import { computeChoropleth } from '@/utils/computeChoropleth.ts'

self.onmessage = (e: MessageEvent) => {
  try {
    const result = computeChoropleth(e.data)
    console.log('[WORKER] computing', result.length, 'features')
    ;(self as DedicatedWorkerGlobalScope).postMessage(result)
  } catch (err) {
    ;(self as DedicatedWorkerGlobalScope).postMessage({ ok: false, error: String(err) })
  } finally {
    self.close()
  }
}
