import { describe, expect, test } from '@jest/globals'
import { get_string_width } from '../..'

describe('get_string_width', () => {
  test(`get_string_width('测试-test-1') = 5.5`, () => {
    expect(get_string_width('测试-test-1') === 5.5).toBe(true)
  })
})
