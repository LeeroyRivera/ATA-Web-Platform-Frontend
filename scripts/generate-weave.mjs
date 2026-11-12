// Generates the seamless woven-fabric (2/2 twill, like denim) background tile used by
// src/styles/global.css. Run: node scripts/generate-weave.mjs
import { writeFileSync } from 'node:fs'

const CELL = 10 // size of one thread crossing in px
const GAP = 1.2 // space between threads
const REPEAT = 8 // cells per side (twill repeats every 4; 8 adds fiber variety)
const SIZE = CELL * REPEAT

// Low-contrast grays around the page background (#e6e9ee).
const BASE = '#dee1e7' // what shows between threads
const LIGHT = '#eef0f3' // top of a thread
const MID = '#e5e8ed'
const DARK = '#d4d8df' // where a thread dives under the other

let seed = 7
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

const defs = `
<linearGradient id="h" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${MID}"/><stop offset=".45" stop-color="${LIGHT}"/><stop offset="1" stop-color="${MID}"/>
</linearGradient>
<linearGradient id="v" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="${MID}"/><stop offset=".45" stop-color="${LIGHT}"/><stop offset="1" stop-color="${MID}"/>
</linearGradient>
<linearGradient id="hs" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="${DARK}" stop-opacity="1"/><stop offset=".3" stop-color="${DARK}" stop-opacity="0"/>
  <stop offset=".7" stop-color="${DARK}" stop-opacity="0"/><stop offset="1" stop-color="${DARK}" stop-opacity="1"/>
</linearGradient>
<linearGradient id="vs" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${DARK}" stop-opacity="1"/><stop offset=".3" stop-color="${DARK}" stop-opacity="0"/>
  <stop offset=".7" stop-color="${DARK}" stop-opacity="0"/><stop offset="1" stop-color="${DARK}" stop-opacity="1"/>
</linearGradient>`

const parts = [`<rect width="${SIZE}" height="${SIZE}" fill="${BASE}"/>`]
const half = GAP / 2

for (let row = 0; row < REPEAT; row++) {
  for (let col = 0; col < REPEAT; col++) {
    const x = col * CELL
    const y = row * CELL
    // 2/2 twill: the horizontal thread is on top for two cells, then under for two,
    // shifting by one cell each row. That shift is what draws the diagonal lines.
    const horizontalOnTop = (col + row) % 4 < 2
    const w = CELL - GAP
    if (horizontalOnTop) {
      parts.push(`<rect x="${x}" y="${y + half}" width="${CELL}" height="${w}" fill="url(#h)"/>`)
      parts.push(`<rect x="${x}" y="${y + half}" width="${CELL}" height="${w}" fill="url(#hs)"/>`)
    } else {
      parts.push(`<rect x="${x + half}" y="${y}" width="${w}" height="${CELL}" fill="url(#v)"/>`)
      parts.push(`<rect x="${x + half}" y="${y}" width="${w}" height="${CELL}" fill="url(#vs)"/>`)
    }
    // A couple of faint fibers along the visible thread.
    for (let k = 0; k < 2; k++) {
      const offset = half + 1.5 + rand() * (w - 3)
      const opacity = (0.25 + rand() * 0.3).toFixed(2)
      const line = horizontalOnTop
        ? `x1="${x + 1}" y1="${(y + offset).toFixed(1)}" x2="${x + CELL - 1}" y2="${(y + offset).toFixed(1)}"`
        : `x1="${(x + offset).toFixed(1)}" y1="${y + 1}" x2="${(x + offset).toFixed(1)}" y2="${y + CELL - 1}"`
      parts.push(`<line ${line} stroke="#ffffff" stroke-opacity="${opacity}" stroke-width=".5"/>`)
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"><defs>${defs}</defs>${parts.join('')}</svg>\n`
writeFileSync(new URL('../src/assets/weave-pattern.svg', import.meta.url), svg)
console.log(`Wrote ${SIZE}x${SIZE} tile, ${svg.length} bytes`)
