import { Equal } from '..'

function countMap<T>(arr: Array<T>) {
  const map = new Map()

  arr.forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1)
  })

  return map
}

/**
 * Check whether one array contains another (whether the longer array contains all elements of the shorter one, including duplicate counts)
 * @param arr1 first array
 * @param arr2 second array
 * @returns false if either array is empty; otherwise whether the longer array contains the shorter one
 */
export default function array_is_includes<T>(arr1: Array<T>, arr2: Array<T>) {
  if (arr1.length === 0 || arr2.length === 0) {
    return false
  }

  const smallArr = arr1.length <= arr2.length ? arr1 : arr2
  const largeArr = arr1.length > arr2.length ? arr1 : arr2

  const smallArrMap = countMap(smallArr)
  const largeArrMap = countMap(largeArr)

  for (const [key, count] of smallArrMap.entries()) {
    const largekey = [...largeArrMap.keys()].filter((item) => Equal.ValEqual(item, key))

    if (!largekey.length || (largekey.length && largeArrMap.get(largekey[0]) !== count)) {
      return false
    }
  }

  return true
}
