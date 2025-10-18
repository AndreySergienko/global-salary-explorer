export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const s = hex.replace('#', '');
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** value∈[min,max] → цвет от красного к зелёному */
export function getChoroplethColor(
  value: number,
  min: number,
  max: number,
  startHex = '#d73027',
  endHex = '#1a9850'
) {
  if (!isFinite(value) || !isFinite(min) || !isFinite(max) || min === max) {
    return startHex; // дефолт — красный
  }
  const t = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const a = hexToRgb(startHex);
  const b = hexToRgb(endHex);
  const rgb = {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
  return rgbToHex(rgb);
}
