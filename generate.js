const fs = require('fs')
const colors = require('tailwindcss/colors')

async function generateHeaders (fd) {
  // First line header
  await fd.write('GIMP Palette\n')
  // Name of the palette
  await fd.write('Name: Tailwind\n')
  // Clue for the number of columns for palette presentation.
  // Here 10 because there are 10 variations of each colors
  await fd.write('Columns: 10\n')
  // Empty line for readability
  await fd.write('\n')
}

function hexColorToRGB (hex) {
  let r, g, b
  if (hex.length === 4) {
    // If 4 characters then each should be dedupe
    r = parseInt(`${hex[1]}${hex[1]}`, 16)
    g = parseInt(`${hex[2]}${hex[2]}`, 16)
    b = parseInt(`${hex[3]}${hex[3]}`, 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  } else {
    throw new Error(`Invalid hex color : ${hex}`)
  }
  return {'r': r, 'g': g, 'b': b}
}

function formatRGB (rgb) {
  const r = rgb.r.toString().padStart(3, "0")
  const g = rgb.g.toString().padStart(3, "0")
  const b = rgb.b.toString().padStart(3, "0")
  return `${r} ${g} ${b}`
}

async function generateColor (fd, name, color) {
  if (color instanceof Object) {
    // Multivariant color
    for (const variant in color) {
      // console.log(variant)
      const c = hexColorToRGB(color[variant])
      await fd.write(`${formatRGB(c)} ${name} ${variant}\n`)
    }
  } else {
    // Single variant
    const c = hexColorToRGB(color)
    await fd.write(`${formatRGB(c)} ${name}\n`)
  }
  // Empty lines for clarity
  await fd.write('\n')
}

async function generate () {
  const filename = 'tailwind.gpl'
  const fd = fs.createWriteStream(filename)
  await generateHeaders(fd)
  for (const color in colors) {
    await generateColor(fd, color, colors[color])
  }
  await fd.end()
}

module.exports = {
  generate: generate,
  hexColorToRGB: hexColorToRGB,
  formatRGB: formatRGB,
}
