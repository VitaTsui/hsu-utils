import { Equal } from '..'

function countMap<T>(arr: Array<T>) {
  const map = new Map()

  arr.forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1)
  })

  return map
}

export default function array_is_includes<T>(arr1: Array<T>, arr2: Array<T>) {
  const smallArr = arr1.length <= arr2.length ? arr1 : arr2
  const largeArr = arr1.length > arr2.length ? arr1 : arr2

  const smallArrMap = countMap(smallArr)
  const largeArrMap = countMap(largeArr)

  for (const [key, count] of smallArrMap.entries()) {
    const largekey = [...largeArrMap.keys()].find((item) => Equal.ValEqual(item, key))

    if (!largekey || (largekey && largeArrMap.get(largekey) !== count)) {
      return false
    }
  }

  return true
}
