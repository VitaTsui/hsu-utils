import { describe, expect, test } from '@jest/globals'
import { array_is_includes } from '../..'

describe('array_is_includes', () => {
  test(`[3, 2, 1], [4, 2]`, () => {
    expect(array_is_includes([3, 2, 1], [4, 2])).toBe(false)
  })

  test(`[3, 2, 1], [1, 2]`, () => {
    expect(array_is_includes([3, 2, 1], [1, 2])).toBe(true)
  })

  test(`[2, 3], [3, 2, 1]`, () => {
    expect(array_is_includes([2, 3], [3, 2, 1])).toBe(true)
  })

  test(`[1, 2, 3], [3, 2, 1]`, () => {
    expect(array_is_includes([1, 2, 3], [3, 2, 1])).toBe(true)
  })

  test(`[{1: 1}, 2, 3], [3, 2, 1]`, () => {
    expect(array_is_includes([{ 1: 1 }, 2, 3], [3, 2, 1])).toBe(false)
  })

  test(`[{1: 1}, 3], [3, 2, {1: 1}]`, () => {
    expect(array_is_includes([{ 1: 1 }, 3], [3, 2, { 1: 1 }])).toBe(true)
  })
})
