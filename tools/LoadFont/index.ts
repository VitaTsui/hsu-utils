interface Font {
  style?: string
  weight?: string
  size?: number
  family?: string
}

export interface LoadFontOptions {
  ctx?: CanvasRenderingContext2D
  font?: Font
  text?: string
}

/**
 * Asynchronously load a font, ensuring it is available for subsequent canvas drawing / size measurement
 * @param options.ctx canvas context used for warm-up; an internal off-screen canvas is used if omitted
 * @param options.font font configuration (style / weight / size / family)
 * @param options.text warm-up text
 */
export default async function loadFont(options: LoadFontOptions) {
  const { ctx, font = {}, text } = options
  const { style = 'normal', weight = 'normal', size = 10, family = 'sans-serif' } = font

  await document.fonts.load(`${style} ${weight} ${size}px ${family}`)

  const _ctx = ctx || (document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D)

  _ctx.font = `${style} ${weight} ${size}px ${family}`
  _ctx.fillText(text || '', -999, -999)

  await new Promise(requestAnimationFrame)
}
