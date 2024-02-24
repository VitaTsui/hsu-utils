import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf.js'
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api'
GlobalWorkerOptions.workerSrc = 'https://cdn.bootcss.com/pdf.js/2.13.216/pdf.worker.js'

interface PDFOption {
  pdfUrl: string
  containerId: string
  startPageNum?: number
  endPageNum?: number
}

function clear(containerId: string) {
  const container = document.getElementById(containerId)

  const pages = document.querySelectorAll(`[id^="${containerId}-page-"]`)

  pages?.forEach((item) => {
    container?.removeChild(item)
  })
}

function render(pdf: PDFDocumentProxy, container: HTMLElement, num: number) {
  pdf.getPage(num).then((page: PDFPageProxy) => {
    const pageDiv = document.createElement('div')
    pageDiv.setAttribute('id', `${container.id}-page-${num}`)
    pageDiv.setAttribute('style', 'position: relative; ')
    container.appendChild(pageDiv)
    const canvas = document.createElement('canvas')
    pageDiv.appendChild(canvas)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const scale = 1
    const devicePixelRatio = window.devicePixelRatio * 2
    const viewport = page.getViewport({ scale: scale * devicePixelRatio })

    canvas.style.width = '100%'
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

export default async function renderPDF({ pdfUrl, containerId, startPageNum, endPageNum }: PDFOption) {
  clear(containerId)

  const loadingTask = getDocument({
    url: pdfUrl,
    cMapUrl: 'https://unpkg.com/browse/pdfjs-dist@2.13.216/cmaps/',
    cMapPacked: true
  })

  const pdf = await loadingTask.promise
  const container = document.getElementById(containerId)

  if (!container) return

  const start = startPageNum ?? 1
  const end = endPageNum ?? pdf.numPages

  for (let i = start; i <= end; i++) {
    render(pdf, container as HTMLElement, i)
  }
}
