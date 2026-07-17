// Cache of in-flight image requests
const imagePromiseCache: { [key: string]: Promise<HTMLImageElement> | undefined } = {}

// Cache of loaded images
const imageCache: { [key: string]: HTMLImageElement } = {}

/**
 * Asynchronously load an image with caching
 *
 * Results for the same url are cached and reused on subsequent calls; in-flight requests are also merged to avoid duplicate concurrent requests.
 * @param url image URL
 * @returns the loaded HTMLImageElement (rejects on load failure, with no error value)
 */
export default async function loadImage(url: string) {
  // If the image has already been loaded, return the cached one directly
  if (imageCache[url]) return imageCache[url]
  // If the image is currently being requested, return the pending request
  if (imagePromiseCache[url]) return imagePromiseCache[url] as Promise<HTMLImageElement>

  const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.src = url

    image.onload = () => {
      resolve(image)
      imageCache[url] = image
    }
    image.onerror = () => {
      reject()
    }
  })
  imagePromiseCache[url] = imagePromise

  return imagePromise
}
