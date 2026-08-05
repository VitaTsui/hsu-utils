import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api'

const DEFAULT_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js'

type PdfjsModule = typeof import('pdfjs-dist/legacy/build/pdf.js')

/**
 * pdfjs 按需加载。
 *
 * pdfjs-dist 约 374 KB（未压缩），而 RenderPDF 只是 hsu-utils barrel 里的一个导出。
 * 从前它在模块顶层 `import` pdfjs、并且立刻给 GlobalWorkerOptions.workerSrc 赋值
 * （模块级副作用），于是：
 *
 *   1. 消费方只要从 hsu-utils import 任何东西（`array_is_includes` 这类到处在用），
 *      barrel 静态引入 RenderPDF，pdfjs 就跟着进首屏；
 *   2. 那句模块级赋值让这个模块无法被标记为无副作用，tree-shaking 也救不回来。
 *
 * 改成用到时才动态 import，并把 workerSrc 的设置挪进加载回调——模块本身不再有副作用。
 * 实测：某后台项目首屏因此减少约 374 KB（未压缩）。
 */
let pdfjsPromise: Promise<PdfjsModule> | undefined
/** 调用方在 pdfjs 加载完成前指定的 workerSrc，加载后立即应用 */
let preferredWorkerSrc: string | undefined

function loadPdfjs(): Promise<PdfjsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist/legacy/build/pdf.js')
      .then((mod) => {
        // pdfjs 的 legacy 产物在不同 interop 下可能是模块本身或 { default: 模块 }
        const m = mod as PdfjsModule & { default?: PdfjsModule }
        const pdfjs = m.default ?? m
        pdfjs.GlobalWorkerOptions.workerSrc = preferredWorkerSrc ?? DEFAULT_WORKER_SRC
        return pdfjs
      })
      .catch((err) => {
        pdfjsPromise = undefined
        throw err
      })
  }
  return pdfjsPromise
}

interface RenderOption {
  pdfUrl: string
  containerId: string
  startPageNum?: number
  endPageNum?: number
  pixelRatio?: number
  scale?: number
  workerSrc?: string
}

interface RenderPageOption {
  pdf: PDFDocumentProxy
  container: HTMLElement
  num: number
  pixelRatio?: number
  scale?: number
}

const PDFMap = new Map<string, Promise<PDFDocumentProxy>>()

/**
 * Preload a PDF document (documents with the same pdfUrl are cached and reused)
 * @param pdfUrl PDF file URL
 * @param workerSrc custom pdf.js worker URL; defaults to the built-in CDN
 * @returns the pdf.js PDFDocumentProxy
 */
async function load(pdfUrl: string, workerSrc?: string) {
  if (workerSrc) {
    preferredWorkerSrc = workerSrc
  }

  const pdfjs = await loadPdfjs()

  // pdfjs 已经加载过时，上面的回调不会再跑，这里补设一次
  if (workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
  }

  let pdf = PDFMap.get(pdfUrl)

  if (!pdf) {
    const loadingTask = pdfjs.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://unpkg.com/browse/pdfjs-dist@2.13.216/cmaps/',
      cMapPacked: true
    })

    pdf = loadingTask.promise

    PDFMap.set(pdfUrl, pdf)
  }

  return await pdf
}

/**
 * Get the total number of pages in a PDF
 * @param pdfUrl PDF file URL
 * @param workerSrc custom pdf.js worker URL
 */
async function getNumPages(pdfUrl: string, workerSrc?: string) {
  const pdf = await load(pdfUrl, workerSrc)

  return pdf.numPages
}

/**
 * Clear the rendered PDF pages inside the container
 * @param containerId id of the container element
 */
function clear(containerId: string) {
  const container = document.getElementById(containerId)

  const pages = document.querySelectorAll(`[id^="${containerId}-page-"]`)

  pages?.forEach((item) => {
    container?.removeChild(item)
  })
}

/**
 * Render a PDF into the given container (clears existing pages in the container first, then renders each page as a canvas)
 * @param options.pdfUrl PDF file URL
 * @param options.containerId id of the container element
 * @param options.startPageNum start page number, defaults to page 1
 * @param options.endPageNum end page number, defaults to the last page
 * @param options.pixelRatio rendering pixel ratio, defaults to 2
 * @param options.scale scale factor, defaults to 1
 * @param options.workerSrc custom pdf.js worker URL
 */
async function render({ pdfUrl, containerId, startPageNum, endPageNum, pixelRatio, scale, workerSrc }: RenderOption) {
  clear(containerId)

  const container = document.getElementById(containerId)

  if (!container) return

  const pdf = await load(pdfUrl, workerSrc)

  const start = startPageNum ?? 1
  const end = endPageNum ?? pdf.numPages

  for (let i = start; i <= end; i++) {
    renderPage({ pdf, container: container as HTMLElement, num: i, pixelRatio, scale })
  }
}

function renderPage({ pdf, container, num, pixelRatio = 2, scale = 1 }: RenderPageOption) {
  pdf.getPage(num).then((page: PDFPageProxy) => {
    const pageDiv = document.createElement('div')
    pageDiv.setAttribute('id', `${container.id}-page-${num}`)
    pageDiv.setAttribute('style', 'position: relative; ')
    container.appendChild(pageDiv)
    const canvas = document.createElement('canvas')
    pageDiv.appendChild(canvas)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const devicePixelRatio = window.devicePixelRatio * pixelRatio
    const viewport = page.getViewport({ scale: 1 * devicePixelRatio })

    canvas.style.width = `calc(100% * ${scale})`
    canvas.style.height = '100%'
    canvas.width = viewport.width
    canvas.height = viewport.height

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }

    page.render(renderContext)
  })
}

const RenderPDF = {
  load,
  getNumPages,
  clear,
  render
}
export default RenderPDF
