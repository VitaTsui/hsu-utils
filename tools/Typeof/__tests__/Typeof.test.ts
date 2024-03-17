import { describe, expect, test } from '@jest/globals'
import { Typeof } from '../..'

describe('Typeof', () => {
  /* BaseType */

  test(`typeof string`, () => {
    expect(Typeof('', 'string')).toBe(true)
  })

  test(`typeof number`, () => {
    expect(Typeof(0, 'number')).toBe(true)
  })

  test(`typeof boolean`, () => {
    expect(Typeof(true, 'boolean')).toBe(true)
  })

  test(`typeof undefined`, () => {
    expect(Typeof(undefined, 'undefined')).toBe(true)
  })

  test(`typeof function`, () => {
    expect(Typeof(() => {}, 'function')).toBe(true)
  })

  test(`typeof symbol`, () => {
    expect(Typeof(Symbol(), 'symbol')).toBe(true)
  })

  test(`typeof bigint`, () => {
    expect(Typeof(BigInt(1), 'bigint')).toBe(true)
  })

  /* ObjectType */

  test(`typeof object`, () => {
    expect(Typeof({}, 'object')).toBe(true)
  })

  test(`typeof array`, () => {
    expect(Typeof([], 'array')).toBe(true)
  })

  test(`typeof null`, () => {
    expect(Typeof(null, 'null')).toBe(true)
  })

  test(`typeof date`, () => {
    expect(Typeof(new Date(), 'date')).toBe(true)
  })

  test(`typeof formdata`, () => {
    expect(Typeof(new FormData(), 'formdata')).toBe(true)
  })

  test(`typeof set`, () => {
    expect(Typeof(new Set(), 'set')).toBe(true)
  })

  test(`typeof map`, () => {
    expect(Typeof(new Map(), 'map')).toBe(true)
  })

  test(`typeof regexp`, () => {
    expect(Typeof(new RegExp(''), 'regexp')).toBe(true)
  })
})
