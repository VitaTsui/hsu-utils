import { Typeof } from '..'

/**
 * 从 Content-Disposition 响应标头中解析文件名
 */
export function getFileNameFromHeader(response: Response): string | null {
  const contentDisposition = response.headers.get('Content-Disposition')
  if (!contentDisposition) {
    return null
  }

  // 尝试匹配 filename*=UTF-8''example.pdf 格式（RFC 5987）
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (filenameStarMatch) {
    return decodeURIComponent(filenameStarMatch[1])
  }

  // 尝试匹配 filename="example.pdf" 或 filename=example.pdf 格式
  const filenameMatch = contentDisposition.match(/filename=["']?([^;"']+)["']?/i)
  if (filenameMatch) {
    return decodeURIComponent(filenameMatch[1])
  }

  return null
}

async function downloadFileByUrl(url: string, fileName?: string, signal?: AbortSignal): Promise<void> {
  try {
    const response = await fetch(url, { signal })

    // 如果没有传入文件名，尝试从响应标头中获取
    let finalFileName = fileName
    if (!finalFileName) {
      finalFileName = getFileNameFromHeader(response) || undefined
    }

    const arrayBuffer = await response.arrayBuffer()
    downloadFile(arrayBuffer, finalFileName)
  } catch (error) {
    if ((error as DOMException)?.name !== 'AbortError') {
      const downloadElement = document.createElement('a')
      downloadElement.href = url
      downloadElement.download = decodeURIComponent(fileName || '')
      downloadElement.target = '_blank'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
    }
  }
}

export default async function downloadFile(
  file: ArrayBuffer | Blob | string,
  fileName?: string,
  signal?: AbortSignal
): Promise<void> {
  if (typeof file === 'string') {
    await downloadFileByUrl(file, fileName, signal)
  } else {
    const blob = Typeof(file) === 'blob' ? (file as Blob) : new Blob([file as ArrayBuffer])
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = decodeURIComponent(fileName || '')
    downloadElement.target = '_blank'
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  }
}
