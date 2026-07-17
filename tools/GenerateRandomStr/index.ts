/**
 * Generate a random string of the given length (uppercase and lowercase English letters only)
 * @param length length of the string
 * @returns the random string
 */
export default function generateRandomStr(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}
