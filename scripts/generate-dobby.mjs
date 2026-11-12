// Generates the dobby motif tile (small four-petal crosses on a diagonal grid, like a
// dress-shirt fabric). It is layered over the woven texture in src/styles/global.css.
// Run: node scripts/generate-dobby.mjs
import { writeFileSync } from 'node:fs'

const SPACING = 22 // distance between motifs in a row
const SIZE = SPACING // tile; a second motif sits in the center to make the diagonal grid
const COLOR = '#97a3b6' // muted blue-gray, low contrast on the page background
const OPACITY = 0.5

function motif(cx, cy) {
  // Four small petals pointing diagonally, forming an "x" shaped flower.
  const petals = [45, 135, 225, 315].map((angle) => {
    const rad = (angle * Math.PI) / 180
    const x = cx + Math.cos(rad) * 2.4
    const y = cy + Math.sin(rad) * 2.4
    return `<ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="2.1" ry="1.15" transform="rotate(${angle} ${x.toFixed(2)} ${y.toFixed(2)})"/>`
  })
  return petals.join('')
}

// Corner motifs are drawn at all four corners so the tile wraps cleanly.
const centers = [
  [0, 0],
  [SIZE, 0],
  [0, SIZE],
  [SIZE, SIZE],
  [SIZE / 2, SIZE / 2],
]

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"><g fill="${COLOR}" fill-opacity="${OPACITY}">${centers.map(([x, y]) => motif(x, y)).join('')}</g></svg>\n`
writeFileSync(new URL('../src/assets/dobby-pattern.svg', import.meta.url), svg)
console.log(`Wrote ${SIZE}x${SIZE} tile, ${svg.length} bytes`)
