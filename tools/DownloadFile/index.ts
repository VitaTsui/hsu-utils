function downloadFileByLocalPath(path: string, fileName?: string): void {
  fetch(path)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      downloadFile(arrayBuffer, fileName)
    })
}

function downloadFileByUrl(url: string, fileName?: string): void {
  if (!url.startsWith('http')) {
    downloadFileByLocalPath(url, fileName)
    return
  }

  const downloadElement = document.createElement('a')
  downloadElement.href = url
  downloadElement.download = decodeURI(fileName || '')
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
}

export default function downloadFile(file: ArrayBuffer | string, fileName?: string): void {
  if (typeof file === 'string') {
    downloadFileByUrl(file)
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
