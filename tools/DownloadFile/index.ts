import { Typeof } from '..'
async function downloadFileByUrl(url: string, fileName?: string) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    downloadFile(arrayBuffer, fileName)
  } catch {
    const downloadElement = document.createElement('a')
    downloadElement.href = url
    downloadElement.download = decodeURIComponent(fileName || '')
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
  }
}

export default function downloadFile(file: ArrayBuffer | Blob | string, fileName?: string) {
  if (typeof file === 'string') {
    downloadFileByUrl(file, fileName)
    return
  }

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
