import { Typeof } from '..'

/**
 * Supported response types: Fetch API Response or Axios Response
 */
type ResponseLike = Response | { headers: Record<string, string> | { get(name: string): string | null } }

/**
 * Parse the file name from the Content-Disposition response header
 * Supports Fetch API Response and Axios Response
 * @param response the response object
 * @returns the parsed file name, or null if it cannot be parsed
 */
export function getFileNameFromHeader(response: ResponseLike): string | null {
  // Get the Content-Disposition header
  let contentDisposition: string | null = null

  if (response.headers && typeof response.headers.get === 'function') {
    // Fetch API Response (headers is a Headers object)
    contentDisposition = response.headers.get('Content-Disposition')
  } else if (response.headers && typeof response.headers === 'object') {
    // Axios Response (headers is a plain object)
    const headers = response.headers as Record<string, string>
    contentDisposition = headers['content-disposition'] || headers['Content-Disposition'] || null
  }

  if (!contentDisposition) {
    return null
  }

  // Try to match the filename*=UTF-8''example.pdf format (RFC 5987)
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (filenameStarMatch) {
    return decodeURIComponent(filenameStarMatch[1])
  }

  // Try to match the filename="example.pdf" or filename=example.pdf format
  const filenameMatch = contentDisposition.match(/filename=["']?([^;"']+)["']?/i)
  if (filenameMatch) {
    return decodeURIComponent(filenameMatch[1])
  }

  return null
}

async function downloadFileByUrl(url: string, fileName?: string, signal?: AbortSignal): Promise<void> {
  try {
    const response = await fetch(url, { signal })

    // If no file name was provided, try to get it from the response header
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

/**
 * Download a file
 * @param file file content (ArrayBuffer / Blob), or an http(s) URL / local path (string)
 * @param fileName name to save the file as; when downloading by URL it is inferred from the response header / URL if omitted
 * @param signal optional AbortSignal to cancel the request when downloading by URL
 */
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
