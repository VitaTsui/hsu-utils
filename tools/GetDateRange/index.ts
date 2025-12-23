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
  /** 最小时间（用于过去/未来，限制范围不能小于此时间） */
  minDate?: string | Date | Dayjs
  /** 最大时间（用于过去/未来，限制范围不能大于此时间） */
  maxDate?: string | Date | Dayjs
  /** 是否包含时间部分，默认为 true */
  hasTime?: boolean
}

/** 时间段结果：[开始时间字符串, 结束时间字符串] */
export type DateRangeResult = [string, string]

/** 根据类型 / 单位获取对应的格式 */
function getFormat(type: DateRangeType, unit: GetDateRangeOptions['unit'] = 'day', hasTime: boolean = true): string {
  let baseFormat: string

  // 固定类型优先
  switch (type) {
    case 'today':
      baseFormat = 'YYYY-MM-DD'
      break
    case 'thisWeek':
      baseFormat = 'YYYY-MM-DD'
      break
    case 'thisMonth':
      baseFormat = 'YYYY-MM'
      break
    case 'thisQuarter':
      baseFormat = 'YYYY-[Q]Q'
      break
    case 'thisYear':
      baseFormat = 'YYYY'
      break
    case 'past':
    case 'future':
    default:
      // 过去 / 未来等根据单位来决定
      switch (unit) {
        case 'year':
          baseFormat = 'YYYY'
          break
        case 'month':
          baseFormat = 'YYYY-MM'
          break
        case 'week':
        case 'day':
        default:
          baseFormat = 'YYYY-MM-DD'
          break
      }
      break
  }

  // 如果 hasTime 为 true 且格式包含日期部分，则添加时间
  if (hasTime && (baseFormat.includes('DD') || baseFormat === 'YYYY-MM-DD')) {
    return `${baseFormat} HH:mm:ss`
  }

  return baseFormat
}

/**
 * 获取日期范围
 * @param options 配置选项
 * @returns 时间段数组 [min, max]
 */
export default function getDateRange(options: GetDateRangeOptions): DateRangeResult {
  const {
    type,
    amount = 0,
    baseDate,
    unit = 'day',
    minDate: minDateLimit,
    maxDate: maxDateLimit,
    hasTime = true
  } = options
  const base = baseDate ? dayjs(baseDate) : dayjs()

  let minDate: Dayjs
  let maxDate: Dayjs

  switch (type) {
    case 'past':
      // 过去：从 base - amount 到 base
      maxDate = base.endOf(unit)
      minDate = base.subtract(amount, unit).startOf(unit)
      // 如果设置了最小时间限制，确保 minDate 不小于限制
      if (minDateLimit) {
        const minLimit = dayjs(minDateLimit).startOf(unit)
        if (minLimit.isAfter(minDate)) {
          minDate = minLimit
        }
      }
      // 如果设置了最大时间限制，确保 maxDate 不大于限制
      if (maxDateLimit) {
        const maxLimit = dayjs(maxDateLimit).endOf(unit)
        if (maxLimit.isBefore(maxDate)) {
          maxDate = maxLimit
        }
      }
      break

    case 'future':
      // 未来：从 base 到 base + amount
      minDate = base.startOf(unit)
      maxDate = base.add(amount, unit).endOf(unit)
      // 如果设置了最小时间限制，确保 minDate 不小于限制
      if (minDateLimit) {
        const minLimit = dayjs(minDateLimit).startOf(unit)
        if (minLimit.isAfter(minDate)) {
          minDate = minLimit
        }
      }
      // 如果设置了最大时间限制，确保 maxDate 不大于限制
      if (maxDateLimit) {
        const maxLimit = dayjs(maxDateLimit).endOf(unit)
        if (maxLimit.isBefore(maxDate)) {
          maxDate = maxLimit
        }
      }
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

  const format = getFormat(type, unit, hasTime)
  const min = minDate.format(format)
  const max = maxDate.format(format)

  return [min, max]
}
