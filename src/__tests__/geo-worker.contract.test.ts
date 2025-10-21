import { describe, it, expect } from 'vitest'

const PATH_WORKER = '../features/map/workers/geo-worker.ts';

function waitForMessage<T>(worker: Worker, timeoutMs = 3000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), timeoutMs)
    worker.onmessage = (e) => { clearTimeout(t); resolve(e.data) }
    worker.onerror = (e) => { clearTimeout(t); reject(e) }
  })
}

function createWorker(): Worker {
  return new Worker(new URL(PATH_WORKER, import.meta.url), { type: 'module' })
}

describe('geo-worker (contract)', () => {

  it('Check array and close', async () => {
    const worker = createWorker()

    worker.postMessage({
      items: [{
        code: 'FR',
        country: 'France',
        year: 2025,
        yearly_gross_usd: 1,
        geometry_type: 'Polygon',
        coordinates: [[[2, 48], [2.1, 48.1]]],
      }],
      min: 0,
      max: 10,
    })

    const data1 = await waitForMessage<[][]>(worker)
    expect(Array.isArray(data1)).toBe(true)
    expect(data1.length).toBe(1)
    expect(data1[0]).toHaveProperty('fillColor')
    expect(data1[0]).toHaveProperty('paths')

    const secondReply = new Promise<boolean>((resolve) => {
      let got = false
      const w = worker as Worker
      w.onmessage = () => { got = true; resolve(true) }
      setTimeout(() => resolve(got), 700)
    })
    worker.postMessage({ items: [], min: 0, max: 1 })
    const receivedSecond = await secondReply
    expect(receivedSecond).toBe(false)
  })

  it('при ошибке шлёт { ok:false, error }', async () => {
    const worker = createWorker()

    worker.postMessage({ items: null, min: 0, max: 1 })

    const data = await waitForMessage(worker)
    expect(data).toEqual({ ok: false, error: expect.any(String) })
  })
})
