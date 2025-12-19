import { loadFont } from '..'

interface Font {
  style?: string
  weight?: string
  size?: number
  family?: string
}

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
