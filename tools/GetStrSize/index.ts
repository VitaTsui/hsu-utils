import { loadFont } from '..'

interface Font {
  style?: string
  weight?: string
  size?: number
  family?: string
}

/**
 * Asynchronously measure the rendered size of a string (waits for the font to load before measuring, giving a more accurate result)
 * @param str the string to measure
 * @param font font configuration (style / weight / size / family)
 * @returns width and height of the string (px, rounded to two decimal places)
 */
export async function get_string_size_async(str: string, font: Font = {}): Promise<{ width: number; height: number }> {
  const { style = 'normal', weight = 'normal', size = 10, family: fontFamily = 'sans-serif' } = font

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  await loadFont({ ctx, font, text: str })

  ctx.font = `${style} ${weight} ${size}px ${fontFamily}`

  const metrics = ctx.measureText(str)

  let width = +(+metrics.width.toFixed(2)).toFixed(2)
  const height = +(+metrics.actualBoundingBoxAscent.toFixed(2) + +metrics.actualBoundingBoxDescent.toFixed(2)).toFixed(
    2
  )

  return { width: +width.toFixed(2), height: +height.toFixed(2) }
}

/**
 * Synchronously measure the rendered size of a string (does not wait for font loading; results may be off if a custom font is not ready yet)
 * @param str the string to measure
 * @param font font configuration (style / weight / size / family)
 * @returns width and height of the string (px, rounded to two decimal places)
 */
export default function get_string_size(str: string, font: Font = {}): { width: number; height: number } {
  const { style = 'normal', weight = 'normal', size = 10, family: fontFamily = 'sans-serif' } = font

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.font = `${style} ${weight} ${size}px ${fontFamily}`

  const metrics = ctx.measureText(str)

  let width = +(+metrics.width.toFixed(2)).toFixed(2)
  const height = +(+metrics.actualBoundingBoxAscent.toFixed(2) + +metrics.actualBoundingBoxDescent.toFixed(2)).toFixed(
    2
  )

  return { width: +width.toFixed(2), height: +height.toFixed(2) }
}
