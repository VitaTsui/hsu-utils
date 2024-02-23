import { describe, expect, test } from '@jest/globals'
import { ConsoleData, console_table } from '../..'

describe('console_table', () => {
  test(`+-----+--------+\n|     | BUCKET |\n+-----+--------+\n| CPU |   9520 |\n+-----+--------+`, () => {
    const data: ConsoleData = [
      ['', 'BUCKET'],
      ['CPU', 9520]
    ]
    let log = ''
    console_table(data, (_log) => (log = _log))

    const res = `+-----+--------+\n|     | BUCKET |\n+-----+--------+\n| CPU |   9520 |\n+-----+--------+`

    expect(log === res).toBe(true)
  })

  test(`+------+--------+\n| 系统 | BUCKET |\n+------+--------+\n| CPU  |   8059 |\n+------+--------+`, () => {
    const data: ConsoleData = [
      ['系统', 'BUCKET'],
      ['CPU', 9520]
    ]
    let log = ''
    console_table(data, (_log) => (log = _log))

    const res = `+------+--------+\n| 系统 | BUCKET |\n+------+--------+\n| CPU  |   9520 |\n+------+--------+`

    expect(log === res).toBe(true)
  })

  test(`+------+--------+\n| 系统 | BUCKET |\n+------+--------+\n|      |        |\n+------+--------+`, () => {
    const data: ConsoleData = [['系统', 'BUCKET'], []]
    let log = ''
    console_table(data, (_log) => (log = _log))

    const res = `+------+--------+\n| 系统 | BUCKET |\n+------+--------+\n|      |        |\n+------+--------+`

    expect(log === res).toBe(true)
  })
})
