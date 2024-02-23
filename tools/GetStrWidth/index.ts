interface Font {
  style?: string
  variant?: string
  weight?: string
  size?: number
  lineHeight?: number
  family?: string
}

export default function get_string_width(str: string, font: Font = {}): number {
  const {
    style = 'normal',
    variant = 'normal',
    weight = 'normal',
    size = 12,
    lineHeight = 1,
    family: fontFamily = '微软雅黑, "Microsoft YaHei", -apple-system'
  } = font

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.font = `${style} ${variant} ${weight} ${size}px/${lineHeight} ${fontFamily}`

  const metrics = ctx.measureText(str)

  const width = +(+metrics.width.toFixed(2) + 0.01).toFixed(2)

  return width
}
