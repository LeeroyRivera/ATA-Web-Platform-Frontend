// Generates the seamless low-poly background tile used by src/styles/global.css.
// Run: node scripts/generate-pattern.mjs
import { writeFileSync } from 'node:fs'

const SIZE = 360 // tile size in px
const CELLS = 6 // grid cells per side
const STEP = SIZE / CELLS
const JITTER = STEP * 0.28

// Small seeded PRNG so the tile is reproducible.
let seed = 20261112
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

// Grid points; the last row and column repeat the first so the tile wraps seamlessly.
const base = []
for (let i = 0; i < CELLS; i++) {
  base[i] = []
  for (let j = 0; j < CELLS; j++) {
    base[i][j] = [(rand() - 0.5) * 2 * JITTER, (rand() - 0.5) * 2 * JITTER]
  }
}
const point = (i, j) => {
  const [dx, dy] = base[i % CELLS][j % CELLS]
  return [i * STEP + dx, j * STEP + dy]
}

// Gray tones close to the page background (#e6e9ee): low contrast on purpose.
const TONES = ['#dde1e7', '#e1e4ea', '#e4e7ec', '#e8ebef', '#eceef2', '#f0f2f5', '#f4f5f7']
const LIGHT = [-0.6, -0.8] // light comes from the top left

function shade(a, b, c) {
  // Facet brightness from the angle of the triangle's longest edge vs. the light.
  const edges = [
    [a, b],
    [b, c],
    [c, a],
  ].map(([p, q]) => [q[0] - p[0], q[1] - p[1]])
  const longest = edges.sort((e1, e2) => Math.hypot(...e2) - Math.hypot(...e1))[0]
  const len = Math.hypot(...longest)
  const normal = [-longest[1] / len, longest[0] / len]
  const dot = normal[0] * LIGHT[0] + normal[1] * LIGHT[1] // -1..1
  const index = Math.round(((dot + 1) / 2) * (TONES.length - 1) + (rand() - 0.5) * 1.6)
  return TONES[Math.max(0, Math.min(TONES.length - 1, index))]
}

const polys = []
for (let i = 0; i < CELLS; i++) {
  for (let j = 0; j < CELLS; j++) {
    const tl = point(i, j)
    const tr = point(i + 1, j)
    const br = point(i + 1, j + 1)
    const bl = point(i, j + 1)
    // Pinwheel: a jittered center point and four facets per cell.
    const center = [
      (tl[0] + br[0]) / 2 + (rand() - 0.5) * STEP * 0.3,
      (tl[1] + br[1]) / 2 + (rand() - 0.5) * STEP * 0.3,
    ]
    for (const [p, q] of [
      [tl, tr],
      [tr, br],
      [br, bl],
      [bl, tl],
    ]) {
      polys.push([p, q, center])
    }
  }
}

// Draw each facet, plus copies shifted by one tile so edges wrap without gaps.
const shapes = []
for (const tri of polys) {
  const fill = shade(...tri)
  for (const ox of [-SIZE, 0]) {
    for (const oy of [-SIZE, 0]) {
      const pts = tri.map(([x, y]) => `${(x + ox).toFixed(1)},${(y + oy).toFixed(1)}`).join(' ')
      shapes.push(`<polygon points="${pts}" fill="${fill}" stroke="${fill}" stroke-width=".6"/>`)
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"><rect width="${SIZE}" height="${SIZE}" fill="#e6e9ee"/>${shapes.join('')}</svg>\n`
writeFileSync(new URL('../src/assets/lowpoly-pattern.svg', import.meta.url), svg)
console.log(`Wrote ${polys.length} facets, ${svg.length} bytes`)
