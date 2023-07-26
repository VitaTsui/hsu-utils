import { describe, expect, test } from '@jest/globals'
import Equal from '..'

// [number, string, array, object, null, function, undefined, boolean]
const TestCase = [1, '1', ['1'], { '1': 1 }, null, () => {}, undefined, true]

function _toString<T = unknown>(value: T): string {
  return typeof value === 'function' ? value.toString() : JSON.stringify(value)
}

describe('TypeEqual', () => {
  TestCase.forEach((item, idx) => {
    TestCase.forEach((other, idx_o) => {
      if (idx_o !== idx) {
        test(`typeof ${_toString(item)} !== typeof ${_toString(other)}`, () => {
          expect(Equal.TypeEqual(item, other)).toBe(false)
        })
      } else {
        test(`typeof ${_toString(item)} === typeof ${_toString(other)}`, () => {
          expect(Equal.TypeEqual(item, other)).toBe(true)
        })
      }
    })
  })
})
