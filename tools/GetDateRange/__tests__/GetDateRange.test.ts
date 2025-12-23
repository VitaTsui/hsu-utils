import { describe, expect, test } from '@jest/globals'
import getDateRange from '..'
import dayjs from 'dayjs'

describe('getDateRange', () => {
  test('获取当日范围', () => {
    const [min, max] = getDateRange({ type: 'today' })
    const today = dayjs()
    
    expect(min).toBe(today.startOf('day').format('YYYY-MM-DD'))
    expect(max).toBe(today.endOf('day').format('YYYY-MM-DD'))
  })

  test('获取当周范围', () => {
    const [min, max] = getDateRange({ type: 'thisWeek' })
    const today = dayjs()
    
    expect(min).toBe(today.startOf('week').format('YYYY-MM-DD'))
    expect(max).toBe(today.endOf('week').format('YYYY-MM-DD'))
  })

  test('获取当月范围', () => {
    const [min, max] = getDateRange({ type: 'thisMonth' })
    const today = dayjs()
    
    expect(min).toBe(today.startOf('month').format('YYYY-MM'))
    expect(max).toBe(today.endOf('month').format('YYYY-MM'))
  })

  test('获取当季范围', () => {
    const [min, max] = getDateRange({ type: 'thisQuarter' })
    const today = dayjs()
    
    expect(min).toBe(today.startOf('quarter').format('YYYY-[Q]Q'))
    expect(max).toBe(today.endOf('quarter').format('YYYY-[Q]Q'))
  })

  test('获取当年范围', () => {
    const [min, max] = getDateRange({ type: 'thisYear' })
    const today = dayjs()
    
    expect(min).toBe(today.startOf('year').format('YYYY'))
    expect(max).toBe(today.endOf('year').format('YYYY'))
  })

  test('获取过去7天范围', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({ 
      type: 'past', 
      amount: 7, 
      unit: 'day',
      baseDate: baseDate.toDate()
    })
    
    const expectedMin = baseDate.subtract(7, 'day').startOf('day')
    const expectedMax = baseDate.endOf('day')
    
    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY-MM-DD'))
    expect(max).toBe(expectedMax.format('YYYY-MM-DD'))
  })

  test('获取未来30天范围', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({ 
      type: 'future', 
      amount: 30, 
      unit: 'day',
      baseDate: baseDate.toDate()
    })
    
    const expectedMin = baseDate.startOf('day')
    const expectedMax = baseDate.add(30, 'day').endOf('day')
    
    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY-MM-DD'))
    expect(max).toBe(expectedMax.format('YYYY-MM-DD'))
  })

  test('获取过去3个月范围', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({ 
      type: 'past', 
      amount: 3, 
      unit: 'month',
      baseDate: baseDate.toDate()
    })
    
    const expectedMin = baseDate.subtract(3, 'month').startOf('month')
    const expectedMax = baseDate.endOf('month')
    
    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY-MM'))
    expect(max).toBe(expectedMax.format('YYYY-MM'))
  })

  test('获取未来2周范围', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({ 
      type: 'future', 
      amount: 2, 
      unit: 'week',
      baseDate: baseDate.toDate()
    })
    
    const expectedMin = baseDate.startOf('week')
    const expectedMax = baseDate.add(2, 'week').endOf('week')
    
    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY-MM-DD'))
    expect(max).toBe(expectedMax.format('YYYY-MM-DD'))
  })

  test('使用字符串作为基准日期', () => {
    const baseDateStr = '2024-06-15'
    const result = getDateRange({ 
      type: 'thisMonth',
      baseDate: baseDateStr
    })
    
    const baseDate = dayjs(baseDateStr)
    const [min, max] = result
    expect(min).toBe(baseDate.startOf('month').format('YYYY-MM'))
    expect(max).toBe(baseDate.endOf('month').format('YYYY-MM'))
  })

  test('使用 dayjs 对象作为基准日期', () => {
    const baseDate = dayjs('2024-12-25')
    const result = getDateRange({ 
      type: 'thisYear',
      baseDate: baseDate
    })
    
    const [min, max] = result
    expect(min).toBe(baseDate.startOf('year').format('YYYY'))
    expect(max).toBe(baseDate.endOf('year').format('YYYY'))
  })

  test('获取未来3年范围（year 单位格式为 YYYY）', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({
      type: 'future',
      amount: 3,
      unit: 'year',
      baseDate: baseDate.toDate()
    })

    const expectedMin = baseDate.startOf('year')
    const expectedMax = baseDate.add(3, 'year').endOf('year')

    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY'))
    expect(max).toBe(expectedMax.format('YYYY'))
  })

  test('传入不支持的类型时抛出错误', () => {
    // @ts-expect-error: 强制传入非法类型以测试错误分支
    expect(() => getDateRange({ type: 'invalid' })).toThrow('不支持的类型')
  })

  test('过去类型默认数量为0', () => {
    const baseDate = dayjs('2024-03-20')
    const result = getDateRange({ 
      type: 'past', 
      unit: 'day',
      baseDate: baseDate.toDate()
    })
    
    const expectedMin = baseDate.subtract(0, 'day').startOf('day')
    const expectedMax = baseDate.endOf('day')
    
    const [min, max] = result
    expect(min).toBe(expectedMin.format('YYYY-MM-DD'))
    expect(max).toBe(expectedMax.format('YYYY-MM-DD'))
  })
})

