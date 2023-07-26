import { describe, expect, test } from '@jest/globals'
import { deepCopy } from '../..'

describe('deepCopy', () => {
  test(`{ '1': 1 }`, () => {
    const data = { '1': 1 }
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })

  test(`{ '1': [1] }`, () => {
    const data = { '1': [1] }
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })

  test(`[1]`, () => {
    const data = [1]
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })

  test(`[1,{ '1': 1 }]`, () => {
    const data = [1, { '1': 1 }]
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })

  test(`'1'`, () => {
    const data = '1'
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(true)
  })

  test(`{ '1': FormData }`, () => {
    const formdata = new FormData()
    formdata.append('1', '1')
    const data = { '1': formdata }
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })

  test(`{ '1': Date }`, () => {
    const data = { '1': new Date() }
    const _data = data
    const res = deepCopy(data)
    expect(deepCopy(data)).toEqual(data)
    expect(data === _data).toBe(true)
    expect(data === res).toBe(false)
  })
})
