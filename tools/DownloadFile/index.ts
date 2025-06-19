function downloadFileByUrl(url: string, fileName?: string): void {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      downloadFile(arrayBuffer, fileName)
    })
}

export default function downloadFile(file: ArrayBuffer | string, fileName?: string): void {
  if (typeof file === 'string') {
    downloadFileByUrl(file, fileName)
    return
  }

  const blob = new Blob([file])
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = decodeURI(fileName || '')
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}
