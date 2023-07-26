import { describe, expect, test } from '@jest/globals'
import Equal from '..'

// [number, string, array, object, null, function, undefined, boolean]
const TestCase = [1, '1', ['1'], { '1': 1 }, null, () => {}, undefined, true]

function _toString<T = unknown>(value: T): string {
  return typeof value === 'function' ? value.toString() : JSON.stringify(value)
}

/**
 * ValEqual
 */
describe('ValEqual', () => {
  TestCase.forEach((item, idx) => {
    TestCase.forEach((other, idx_o) => {
      if (idx_o === idx) {
        test(`Value ${_toString(item)} === Value ${_toString(other)}`, () => {
          expect(Equal.ValEqual(item, other)).toBe(true)
        })
      } else if ((item === null && other === undefined) || (item === undefined && other === null)) {
        test(`Value ${JSON.stringify(item)} === Value ${JSON.stringify(other)}`, () => {
          expect(Equal.ValEqual(item, other)).toBe(true)
        })
      } else {
        test(`Value ${_toString(item)} !== Value ${_toString(other)}`, () => {
          expect(Equal.ValEqual(item, other)).toBe(false)
        })
      }
    })
  })
})
