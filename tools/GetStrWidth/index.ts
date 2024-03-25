interface Font {
  style?: string
  variant?: string
  weight?: string
  size?: number
  lineHeight?: number
  family?: string
}

export default function get_string_width(str: string, font: Font = {}, letterSpacing: number = 0): number {
  const {
    style = 'normal',
    variant = 'normal',
    weight = 'normal',
    size = 12,
    lineHeight = 1,
    family: fontFamily = '微软雅黑'
  } = font

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.font = `${style} ${variant} ${weight} ${size}px/${lineHeight} ${fontFamily}`

  const metrics = ctx.measureText(str)

  let width = +(+metrics.width.toFixed(2) + 0.01).toFixed(2)

  const _letterSpacing = (str.length > 0 ? str.length - 1 : 0) * letterSpacing

  width += _letterSpacing

  return width
}
