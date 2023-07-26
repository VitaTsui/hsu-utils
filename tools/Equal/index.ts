import { Typeof } from '..'

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

  if (obj1 !== null && obj2 !== null) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      obj1.sort()
      obj2.sort()

      if (obj1.length !== obj2.length) {
        isEqual = false
      } else {
        for (let i = 0; i < obj1.length; i++) {
          isEqual = ValEqual(obj1[i], obj2[i])

          if (!isEqual) break
        }
      }
    } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        isEqual = false
      } else {
        for (const key in obj1) {
          isEqual = ValEqual(obj1[key], obj2[key])

          if (!isEqual) break
        }
      }
    }
  } else if (obj1 === null && obj2 === null) {
    isEqual = true
  }

  return isEqual
}

const Equal = { ObjEqual, ValEqual, TypeEqual }
export default Equal
