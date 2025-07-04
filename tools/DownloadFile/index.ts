import { Typeof } from '..'

async function downloadFileByUrl(url: string, fileName?: string, signal?: AbortSignal) {
  try {
    const response = await fetch(url, { signal })
    const arrayBuffer = await response.arrayBuffer()
    downloadFile(arrayBuffer, fileName)
  } catch (error) {
    if ((error as DOMException)?.name !== 'AbortError') {
      const downloadElement = document.createElement('a')
      downloadElement.href = url
      downloadElement.download = decodeURIComponent(fileName || '')
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
    }
  }
}

export default async function downloadFile(file: ArrayBuffer | Blob | string, fileName?: string, signal?: AbortSignal) {
  if (typeof file === 'string') {
    await downloadFileByUrl(file, fileName, signal)
  } else {
    const blob = Typeof(file) === 'blob' ? (file as Blob) : new Blob([file as ArrayBuffer])
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = decodeURIComponent(fileName || '')
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  }
}
