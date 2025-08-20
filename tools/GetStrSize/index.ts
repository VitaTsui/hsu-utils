interface Font {
  style?: string
  variant?: string
  weight?: string
  size?: number
  family?: string
}

export default function get_string_size(str: string, font: Font = {}): { width: number; height: number } {
  const { style = 'normal', variant = 'normal', weight = 'normal', size = 10, family: fontFamily = 'sans-serif' } = font

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.font = `${style} ${variant} ${weight} ${size}px ${fontFamily}`

  const metrics = ctx.measureText(str)

  let width = +(+metrics.width.toFixed(2) + 0.01).toFixed(2)
  const height = +(+metrics.actualBoundingBoxAscent.toFixed(2) + +metrics.actualBoundingBoxDescent.toFixed(2)).toFixed(
    2
  )

  return { width: +width.toFixed(2), height: +height.toFixed(2) }
}
