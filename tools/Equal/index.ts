import { Typeof, deepCopy } from '..'

/**
 * 判断类型相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function TypeEqual<T = unknown>(obj1: T, obj2: T): boolean {
  let isEqual = false

  if (Typeof(obj1) !== Typeof(obj2)) {
    isEqual = false
  } else {
    isEqual = true
  }

  return isEqual
}

/**
 * 判断值相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function ValEqual<T = unknown>(obj1: T, obj2: T): boolean {
  let isEqual = false

  // null 与 undefined 在值上相等
  if ((obj1 === null && obj2 === undefined) || (obj1 === undefined && obj2 === null)) {
    isEqual = true
  } else {
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      isEqual = ObjEqual(obj1, obj2)
    } else if (typeof obj1 === 'function' && typeof obj2 === 'function') {
      isEqual = JSON.stringify(obj1) === JSON.stringify(obj2)
    } else {
      isEqual = obj1 === obj2
    }
  }

  return isEqual
}

/**
 * 判断object相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function ObjEqual<T = object>(obj1: T, obj2: T): boolean {
  let isEqual = false
  let _obj1 = deepCopy(obj1)
  let _obj2 = deepCopy(obj2)

  if (_obj1 !== null && _obj2 !== null) {
    if (Array.isArray(_obj1) && Array.isArray(_obj2)) {
      _obj1.sort()
      _obj2.sort()

      if (_obj1.length !== _obj2.length) {
        isEqual = false
      } else {
        for (let i = 0; i < _obj1.length; i++) {
          isEqual = ValEqual(_obj1[i], _obj2[i])

          if (!isEqual) break
        }
      }
    } else if (typeof _obj1 === 'object' && typeof _obj2 === 'object') {
      if (Object.keys(_obj1).length !== Object.keys(_obj2).length) {
        isEqual = false
      } else {
        for (const key in _obj1) {
          isEqual = ValEqual(_obj1[key], _obj2[key])

          if (!isEqual) break
        }
      }
    }
  } else if (_obj1 === null && _obj2 === null) {
    isEqual = true
  }

  return isEqual
}

const Equal = {
  ValEqual,
  TypeEqual,
  ObjEqual
}
export default Equal
