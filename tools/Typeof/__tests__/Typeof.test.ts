import { describe, expect, test } from '@jest/globals'
import { Typeof } from '../..'

describe('Typeof', () => {
  test(`typeof string`, () => {
    expect(Typeof('') === 'string').toBe(true)
  })

  test(`typeof number`, () => {
    expect(Typeof(0) === 'number').toBe(true)
  })

  test(`typeof boolean`, () => {
    expect(Typeof(true) === 'boolean').toBe(true)
  })

  test(`typeof object`, () => {
    expect(Typeof({}) === 'object').toBe(true)
  })
  test(`typeof object`, () => {
    expect(Typeof([]) === 'object').toBe(false)
  })
  test(`typeof object`, () => {
    expect(Typeof(null) === 'object').toBe(false)
  })

  test(`typeof array`, () => {
    expect(Typeof([]) === 'array').toBe(true)
  })

  test(`typeof null`, () => {
    expect(Typeof(null) === 'null').toBe(true)
  })

  test(`typeof undefined`, () => {
    expect(Typeof(undefined) === 'undefined').toBe(true)
  })

  test(`typeof function`, () => {
    expect(Typeof(() => {}) === 'function').toBe(true)
  })

  test(`typeof symbol`, () => {
    expect(Typeof(Symbol()) === 'symbol').toBe(true)
  })

  test(`typeof date`, () => {
    expect(Typeof(new Date()) === 'date').toBe(true)
  })

  test(`typeof formdata`, () => {
    expect(Typeof(new FormData()) === 'formdata').toBe(true)
  })
})
