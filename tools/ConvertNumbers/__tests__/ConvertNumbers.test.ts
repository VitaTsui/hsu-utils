import { describe, expect, test } from '@jest/globals'
import { ConvertNumbers } from '../..'

describe('ConvertNumbers', () => {
  test(`toChineseNum`, () => {
    expect(ConvertNumbers.toChineseNum(0)).toBe('零')
    expect(ConvertNumbers.toChineseNum(1)).toBe('一')
    expect(ConvertNumbers.toChineseNum(1, { benchmark: 100 })).toBe('一百')
    expect(ConvertNumbers.toChineseNum(99.94, { benchmark: 100 })).toBe('九千九百九十四')
    expect(ConvertNumbers.toChineseNum(999999999999999, { benchmark: 100 })).toBe('超出转换范围')
    expect(ConvertNumbers.toChineseNum(1.01, { benchmark: 100 })).toBe('一百零一')
    expect(ConvertNumbers.toChineseNum(1.01)).toBe('一点零一')
    expect(ConvertNumbers.toChineseNum(1.011)).toBe('一点零一一')
    expect(ConvertNumbers.toChineseNum(10100)).toBe('一万零一百')
    expect(ConvertNumbers.toChineseNum(10100.011, { textType: 'uppercase' })).toBe('壹萬零壹佰点零壹壹')
  })
})
