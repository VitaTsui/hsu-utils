import { Typeof } from '..'

type CommonObj<T = any> = Record<string, T>

/**
 * 深拷贝
 * @param data
 * @returns
 */
export default function deepCopy<T = any>(data: T): T {
  if (Typeof(data) === 'date') {
    return new Date((data as Date).toISOString()) as T
  }

  if (Typeof(data) === 'formdata') {
    const _data = data as FormData
    const _formData = new FormData()

    _data.forEach((value, key) => {
      _formData.append(key, value)
    })

    return _formData as T
  }

  if (Typeof(data) === 'map') {
    const _data = data as Map<any, any>
    const map = new Map()

    _data.forEach((value, key) => {
      map.set(key, value)
    })

    return map as T
  }

  if (Typeof(data) === 'set') {
    const _data = data as Set<any>
    const set = new Set()

    _data.forEach((value) => {
      set.add(value)
    })

    return set as T
  }

  if (Array.isArray(data)) {
    const newData = data.map((item) => {
      if (typeof item === 'object') {
        return deepCopy(item) // 数组 | 对象
      } else {
        return item
      }
    })

    return newData as T

    // 对象
  } else if (data && Typeof(data) === 'object') {
    const _data = data as CommonObj

    const newData: CommonObj = {} // 新对象

    Object.keys(_data).forEach((key) => {
      const _item = _data[key]

      if (typeof _item === 'object') {
        newData[key] = deepCopy(_item) // 数组 | 对象
      } else {
        newData[key] = _item
      }
    })

    return newData as T
  }

  return data
}
