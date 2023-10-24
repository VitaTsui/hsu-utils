import { describe, expect, test } from '@jest/globals'
import { Equal } from '../..'

function _toString<T = unknown>(value: T): string {
  return typeof value === 'function' ? value.toString() : JSON.stringify(value)
}

/**
 * ObjEqual
 */
describe('ObjEqual', () => {
  test(`Obj ${_toString({ '1': 1 })} === Obj ${_toString({ '1': 1 })}`, () => {
    expect(Equal.ObjEqual({ '1': 1 }, { '1': 1 })).toBe(true)
  })
  test(`Obj ${_toString({ '1': 1, '2': 2 })} === Obj ${_toString({ '2': 2, '1': 1 })}`, () => {
    expect(Equal.ObjEqual({ '1': 1, '2': 2 }, { '2': 2, '1': 1 })).toBe(true)
  })
  test(`Obj ${_toString({ '1': 2 })} !== Obj ${_toString({ '1': 1 })}`, () => {
    expect(Equal.ObjEqual({ '1': 2 }, { '1': 1 })).toBe(false)
  })
  test(`Obj ${_toString({ '1': 2, '2': 2 })} !== Obj ${_toString({ '1': 1, '2': 2 })}`, () => {
    expect(Equal.ObjEqual({ '1': 2, '2': 2 }, { '1': 1, '2': 2 })).toBe(false)
  })
  test(`Obj ${_toString({ '2': 1 })} !== Obj ${_toString({ '1': 1 })}`, () => {
    expect(Equal.ObjEqual({ '2': 1 }, { '1': 1 })).toBe(false)
  })
  test(`Obj ${_toString({ '1': 2 })} !== Obj ${_toString({ '1': 1, '2': 2 })}`, () => {
    expect(Equal.ObjEqual({ '1': 2 }, { '1': 1, '2': 2 })).toBe(false)
  })

  test(`Obj ${_toString([1])} === Obj ${_toString([1])}`, () => {
    expect(Equal.ObjEqual([1], [1])).toBe(true)
  })
  test(`Obj ${_toString([2, 1])} !== Obj ${_toString([1, 2])}`, () => {
    expect(Equal.ObjEqual([2, 1], [1, 2])).toBe(true)
  })
  test(`Obj ${_toString([2, 1])} !== Obj ${_toString(['2', 1])}`, () => {
    expect(Equal.ObjEqual([2, 1], ['2', 1])).toBe(false)
  })
  test(`Obj ${_toString(['2', 1])} !== Obj ${_toString(['1', 1])}`, () => {
    expect(Equal.ObjEqual(['2', 1], ['1', 1])).toBe(false)
  })

  test(`Obj ${_toString(['2', { '1': 1 }])} === Obj ${_toString(['2', { '1': 1 }])}`, () => {
    expect(Equal.ObjEqual(['2', { '1': 1 }], ['2', { '1': 1 }])).toBe(true)
  })
  test(`Obj ${_toString(['2', { '1': 1 }])} === Obj ${_toString([{ '1': 1 }, '2'])}`, () => {
    expect(Equal.ObjEqual(['2', { '1': 1 }], [{ '1': 1 }, '2'])).toBe(true)
  })
  test(`Obj ${_toString(['2', { '2': ['2', { '2': 1 }] }])} === Obj ${_toString([
    '2',
    { '2': ['2', { '2': 1 }] }
  ])}`, () => {
    expect(Equal.ObjEqual(['2', { '2': ['2', { '2': 1 }] }], ['2', { '2': ['2', { '2': 1 }] }])).toBe(true)
  })

  test(`Obj ${_toString({ '1': ['2', { '2': 1 }] })} === Obj ${_toString({ '1': ['2', { '2': 1 }] })}`, () => {
    expect(Equal.ObjEqual({ '1': ['2', { '2': 1 }] }, { '1': ['2', { '2': 1 }] })).toBe(true)
  })
  test(`Obj ${_toString({ '1': ['2', { '2': 1 }] })} === Obj ${_toString({ '1': ['2'] })}`, () => {
    expect(Equal.ObjEqual({ '1': ['2', { '2': 1 }] }, { '1': ['2'] })).toBe(false)
  })
  test(`Obj {} === Obj {}`, () => {
    expect(Equal.ObjEqual({}, {})).toBe(true)
  })

  test(`Obj ${_toString(['2', { '2': 1 }])} !== Obj ${_toString(['2', { '1': 1 }])}`, () => {
    expect(Equal.ObjEqual(['2', { '2': 1 }], ['2', { '1': 1 }])).toBe(false)
  })
  test(`Obj ${_toString(['2', { '2': ['2', { '2': 1 }] }])} !== Obj ${_toString(['2', { '1': 1 }])}`, () => {
    expect(Equal.ObjEqual(['2', { '2': ['2', { '2': 1 }] }], ['2', { '1': 1 }])).toBe(false)
  })
  test(`Obj [] === Obj []`, () => {
    expect(Equal.ObjEqual([], [])).toBe(true)
  })

  test(`Obj null === Obj null}`, () => {
    expect(Equal.ObjEqual(null, null)).toBe(true)
  })
  test(`Obj null !== Obj ${_toString(['1', 1])}`, () => {
    expect(Equal.ObjEqual(null, ['1', 1])).toBe(false)
  })
  test(`Obj null !== Obj ${_toString({ '1': 1 })}`, () => {
    expect(Equal.ObjEqual(null, { '1': 1 })).toBe(false)
  })
})
