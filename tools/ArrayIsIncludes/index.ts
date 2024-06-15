import { Equal } from '../..'

export default function array_is_includes<T>(arr1: Array<T>, arr2: Array<T>) {
  const largeArr = arr1.length >= arr2.length ? arr1 : arr2
  const smallArr = arr1.length < arr2.length ? arr1 : arr2

  return smallArr.every((item) => {
    return !!largeArr.find((i) => Equal.ValEqual(item, i))
  })
}
