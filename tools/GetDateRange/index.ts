import dayjs, { Dayjs } from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
// advancedFormat supplies the `Q` format token; without it `YYYY-[Q]Q` renders as `YYYY-QQ`
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(quarterOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(advancedFormat)

export type DateRangeType =
  | 'past' // past
  | 'future' // future
  | 'today' // today
  | 'thisWeek' // this week
  | 'thisMonth' // this month
  | 'thisQuarter' // this quarter
  | 'thisYear' // this year

export interface GetDateRangeOptions {
  /** Amount (for past/future; number of days, weeks, months, etc.) */
  amount?: number
  /** Type: past, future, this month, today, this year, this quarter, this week, etc. */
  type: DateRangeType
  /** Base date, defaults to the current date */
  baseDate?: string | Date | Dayjs
  /** Unit (for past/future), defaults to 'day' */
  unit?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
  /** Minimum date (for past/future; the range cannot go earlier than this) */
  minDate?: string | Date | Dayjs
  /** Maximum date (for past/future; the range cannot go later than this) */
  maxDate?: string | Date | Dayjs
  /** Whether to include the time part, defaults to false */
  hasTime?: boolean
}

/** Date range result: [start time string, end time string] */
export type DateRangeResult = [string, string]

/** Get the corresponding format string based on type / unit */
function getFormat(type: DateRangeType, unit: GetDateRangeOptions['unit'] = 'day', hasTime: boolean = false): string {
  let baseFormat: string

  // Fixed types take precedence
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
      // For past / future etc., the format is decided by the unit
      switch (unit) {
        case 'year':
          baseFormat = 'YYYY'
          break
        case 'month':
          baseFormat = 'YYYY-MM'
          break
        case 'second':
        case 'minute':
        case 'hour':
          // For hour, minute and second units, return the full datetime format directly
          return 'YYYY-MM-DD HH:mm:ss'
        case 'week':
        case 'day':
        default:
          baseFormat = 'YYYY-MM-DD'
          break
      }
      break
  }

  // If hasTime is true and the format contains a date part, append the time
  if (hasTime && baseFormat.endsWith('DD')) {
    return `${baseFormat} HH:mm:ss`
  }

  return baseFormat
}

/**
 * Get a date range
 * @param options configuration options
 * @returns date range array [min, max]
 */
export default function getDateRange(options: GetDateRangeOptions): DateRangeResult {
  const {
    type,
    amount = 0,
    baseDate,
    unit = 'day',
    minDate: minDateLimit,
    maxDate: maxDateLimit,
    hasTime = false
  } = options
  const base = baseDate ? dayjs(baseDate) : dayjs()

  let minDate: Dayjs
  let maxDate: Dayjs

  switch (type) {
    case 'past':
      // Past: from base - amount to base
      maxDate = base.endOf(unit)
      minDate = base.subtract(amount, unit).startOf(unit)
      // If a minimum date limit is set, make sure minDate is not earlier than it
      if (minDateLimit) {
        const minLimit = dayjs(minDateLimit).startOf(unit)
        if (minLimit.isAfter(minDate)) {
          minDate = minLimit
        }
      }
      // If a maximum date limit is set, make sure maxDate is not later than it
      if (maxDateLimit) {
        const maxLimit = dayjs(maxDateLimit).endOf(unit)
        if (maxLimit.isBefore(maxDate)) {
          maxDate = maxLimit
        }
      }
      break

    case 'future':
      // Future: from base to base + amount
      minDate = base.startOf(unit)
      maxDate = base.add(amount, unit).endOf(unit)
      // If a minimum date limit is set, make sure minDate is not earlier than it
      if (minDateLimit) {
        const minLimit = dayjs(minDateLimit).startOf(unit)
        if (minLimit.isAfter(minDate)) {
          minDate = minLimit
        }
      }
      // If a maximum date limit is set, make sure maxDate is not later than it
      if (maxDateLimit) {
        const maxLimit = dayjs(maxDateLimit).endOf(unit)
        if (maxLimit.isBefore(maxDate)) {
          maxDate = maxLimit
        }
      }
      break

    case 'today':
      // Today: from the start to the end of the current day
      minDate = base.startOf('day')
      maxDate = base.endOf('day')
      break

    case 'thisWeek':
      // This week: from the start to the end of the current week
      minDate = base.startOf('week')
      maxDate = base.endOf('week')
      break

    case 'thisMonth':
      // This month: from the start to the end of the current month
      minDate = base.startOf('month')
      maxDate = base.endOf('month')
      break

    case 'thisQuarter':
      // This quarter: from the start to the end of the current quarter
      minDate = base.startOf('quarter')
      maxDate = base.endOf('quarter')
      break

    case 'thisYear':
      // This year: from the start to the end of the current year
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
