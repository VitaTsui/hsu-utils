import dayjs, { Dayjs } from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(quarterOfYear)
dayjs.extend(weekOfYear)

export type DateRangeType =
  | 'past' // 过去
  | 'future' // 未来
  | 'today' // 当日
  | 'thisWeek' // 当周
  | 'thisMonth' // 当月
  | 'thisQuarter' // 当季
  | 'thisYear' // 当年

export interface GetDateRangeOptions {
  /** 数量（用于过去/未来，表示天数、周数、月数等） */
  amount?: number
  /** 类型：过去、未来、当月、当日、当年、当季、当周等 */
  type: DateRangeType
  /** 基准日期，默认为当前日期 */
  baseDate?: string | Date | Dayjs
  /** 单位（用于过去/未来），默认为 'day' */
  unit?: 'day' | 'week' | 'month' | 'year'
}

/** 时间段结果：[开始时间字符串, 结束时间字符串] */
export type DateRangeResult = [string, string]

/** 根据类型 / 单位获取对应的格式 */
function getFormat(type: DateRangeType, unit: GetDateRangeOptions['unit'] = 'day'): string {
  // 固定类型优先
  switch (type) {
    case 'today':
      return 'YYYY-MM-DD'
    case 'thisWeek':
      return 'YYYY-MM-DD'
    case 'thisMonth':
      return 'YYYY-MM'
    case 'thisQuarter':
      return 'YYYY-[Q]Q'
    case 'thisYear':
      return 'YYYY'
    case 'past':
    case 'future':
    default:
      break
  }

  // 过去 / 未来等根据单位来决定
  switch (unit) {
    case 'year':
      return 'YYYY'
    case 'month':
      return 'YYYY-MM'
    case 'week':
    case 'day':
    default:
      return 'YYYY-MM-DD'
  }
}

/**
 * 获取日期范围
 * @param options 配置选项
 * @returns 时间段数组 [min, max]
 */
export default function getDateRange(options: GetDateRangeOptions): DateRangeResult {
  const { type, amount = 0, baseDate, unit = 'day' } = options
  const base = baseDate ? dayjs(baseDate) : dayjs()

  let minDate: Dayjs
  let maxDate: Dayjs

  switch (type) {
    case 'past':
      // 过去：从 base - amount 到 base
      maxDate = base.endOf(unit)
      minDate = base.subtract(amount, unit).startOf(unit)
      break

    case 'future':
      // 未来：从 base 到 base + amount
      minDate = base.startOf(unit)
      maxDate = base.add(amount, unit).endOf(unit)
      break

    case 'today':
      // 当日：当天的开始到结束
      minDate = base.startOf('day')
      maxDate = base.endOf('day')
      break

    case 'thisWeek':
      // 当周：本周的开始到结束
      minDate = base.startOf('week')
      maxDate = base.endOf('week')
      break

    case 'thisMonth':
      // 当月：本月的开始到结束
      minDate = base.startOf('month')
      maxDate = base.endOf('month')
      break

    case 'thisQuarter':
      // 当季：本季度的开始到结束
      minDate = base.startOf('quarter')
      maxDate = base.endOf('quarter')
      break

    case 'thisYear':
      // 当年：本年的开始到结束
      minDate = base.startOf('year')
      maxDate = base.endOf('year')
      break

    default:
      throw new Error(`不支持的类型: ${type}`)
  }

  const format = getFormat(type, unit)
  const min = minDate.format(format)
  const max = maxDate.format(format)

  return [min, max]
}
