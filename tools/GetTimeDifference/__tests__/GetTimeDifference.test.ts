import { describe, expect, test } from '@jest/globals'
import getTimeDifference from '..'

describe('getTimeDifference', () => {
  test('计算同一天内的时间差', () => {
    const start = '2024-03-20 10:00:00'
    const end = '2024-03-20 11:30:00'
    const result = getTimeDifference(start, end)

    expect(result).toEqual({
      days: 0,
      hours: 1,
      minutes: 30,
      seconds: 0,
      milliseconds: 0
    })
  })

  test('计算跨天的时间差', () => {
    const start = '2024-03-20 23:00:00'
    const end = '2024-03-21 01:00:00'
    const result = getTimeDifference(start, end)

    expect(result).toEqual({
      days: 0,
      hours: 2,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  test('计算包含毫秒的时间差', () => {
    const start = '2024-03-20 10:00:00.000'
    const end = '2024-03-20 10:00:00.500'
    const result = getTimeDifference(start, end)

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 500
    })
  })

  test('计算跨多天的时间差', () => {
    const start = '2024-03-20 10:00:00'
    const end = '2024-03-22 15:30:00'
    const result = getTimeDifference(start, end)

    expect(result).toEqual({
      days: 2,
      hours: 5,
      minutes: 30,
      seconds: 0,
      milliseconds: 0
    })
  })
})
