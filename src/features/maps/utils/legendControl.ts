export function addLegendControl(
  map: google.maps.Map,
  min: number,
  max: number,
  getColor: (v: number) => string
) {
  const div = document.createElement('div')
  div.style.background = '#fff'
  div.style.padding = '8px 10px'
  div.style.borderRadius = '8px'
  div.style.boxShadow = '0 1px 4px rgba(0,0,0,.3)'
  div.style.font = '12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif'

  const steps = 5
  const items: string[] = []
  for (let i = 0; i <= steps; i++) {
    const v = min + (i * (max - min)) / steps
    const color = getColor(v)
    items.push(
      `<div style="display:flex;align-items:center;gap:6px;margin:2px 0">
         <span style="display:inline-block;width:16px;height:12px;background:${color};border:1px solid #aaa"></span>
         <span>${Math.round(v).toLocaleString()}</span>
       </div>`
    )
  }
  div.innerHTML = `<div style="font-weight:600;margin-bottom:6px">Годовая ЗП</div>${items.join('')}`
  const controls = map.controls[google.maps.ControlPosition.RIGHT_BOTTOM]
  if (!controls) {
    return
  }
  return () => {
    for (let i = 0; i < controls.getLength(); i++) {
      if (controls.getAt(i) === div) {
        controls.removeAt(i)
        break
      }
    }
  }
}
