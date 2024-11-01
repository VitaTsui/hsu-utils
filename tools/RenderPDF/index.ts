import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.js'
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api'
GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.13.216/pdf.worker.js'

interface RenderOption {
  pdfUrl: string
  containerId: string
  startPageNum?: number
  endPageNum?: number
  pixelRatio?: number
  scale?: number
}

interface RenderPageOption {
  pdf: PDFDocumentProxy
  container: HTMLElement
  num: number
  pixelRatio?: number
  scale?: number
}

const PDFMap = new Map<string, Promise<PDFDocumentProxy>>()

async function load(pdfUrl: string) {
  let pdf = PDFMap.get(pdfUrl)

  if (!pdf) {
    const loadingTask = getDocument({
      url: pdfUrl,
      cMapUrl: 'https://unpkg.com/browse/pdfjs-dist@2.13.216/cmaps/',
      cMapPacked: true
    })

    pdf = loadingTask.promise

    PDFMap.set(pdfUrl, pdf)
  }

  return await pdf
}

async function getNumPages(pdfUrl: string) {
  const pdf = await load(pdfUrl)

  return pdf.numPages
}

function clear(containerId: string) {
  const container = document.getElementById(containerId)

  const pages = document.querySelectorAll(`[id^="${containerId}-page-"]`)

  pages?.forEach((item) => {
    container?.removeChild(item)
  })
}

async function render({ pdfUrl, containerId, startPageNum, endPageNum, pixelRatio, scale }: RenderOption) {
  clear(containerId)

  const container = document.getElementById(containerId)

  if (!container) return

  const pdf = await load(pdfUrl)

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
