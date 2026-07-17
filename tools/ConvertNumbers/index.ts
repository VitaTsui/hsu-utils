export type TextType = 'lowercase' | 'uppercase'

export interface C_Options {
  benchmark?: number
  textType?: TextType
}
/**
 * Convert a number to Chinese numerals
 * @param num the number to convert
 * @param options.benchmark multiplier (num is multiplied by this value before conversion)
 * @param options.textType output style: 'lowercase' for lowercase numerals (一二三), 'uppercase' for uppercase numerals (壹贰叁); defaults to 'lowercase'
 * @returns the Chinese numeral string
 */
export function toChineseNum(num: number, options: C_Options = {}) {
  const { benchmark, textType = 'lowercase' } = options

  const cnNums = {
    lowercase: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    uppercase: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  }
  // Basic units
  const cnIntRadice = {
    lowercase: ['', '十', '百', '千'],
    uppercase: ['', '拾', '佰', '仟']
  }
  // Extended units for the integer part
  const cnIntUnits = {
    lowercase: ['', '万', '亿', '兆'],
    uppercase: ['', '萬', '億', '兆']
  }
  // Maximum number that can be handled
  const maxNum = 9999999999999999.9999999999999999
  // Integer part
  let integerNum: string | undefined = undefined
  // Decimal part
  let decimalNum: string | undefined = undefined
  // Output Chinese string
  let chineseStr = ''

  if (benchmark) {
    num *= benchmark
  }

  // Out of conversion range
  if (num > maxNum) {
    return '超出转换范围'
  }

  // Split into integer and decimal parts
  const moneyStr = num.toString()
  integerNum = moneyStr.split('.')[0]
  decimalNum = moneyStr.split('.')[1]

  if (integerNum) {
    let zeroCount = 0

    for (let i = 0; i < integerNum.length; i++) {
      const index = integerNum.length - i - 1

      const num = +integerNum[i]
      const units = Math.floor(index / 4)
      const radice = index % (4 * (units === 0 ? 1 : units))

      if (+integerNum[i] === 0) {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[textType][0]
          zeroCount = 0
        }

        chineseStr += `${cnNums[textType][num] + cnIntRadice[textType][radice]}`
        if (index % 4 === 0) {
          chineseStr += cnIntUnits[textType][units]
        }
      }
    }
  }

  if (decimalNum) {
    chineseStr += '点'

    for (let i = 0; i < decimalNum.length; i++) {
      const num = +decimalNum[i]

      if (+decimalNum[i] === 0) {
        chineseStr += `${cnNums[textType][0]}`
      } else {
        chineseStr += `${cnNums[textType][num]}`
      }
    }
  }

  if (chineseStr === '') {
    chineseStr += cnNums[textType][0]
  }

  return chineseStr
}

const ConvertNumbers = {
  toChineseNum
}
export default ConvertNumbers
