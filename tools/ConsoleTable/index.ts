export type ConsoleData = Array<Array<string | number>>

const NODE = '+'
const EDGE = '-'
const HIGH = '|'
const SPACE = ' '
const EMPTY = ''

// Get the display width of a string
function get_string_width(str: string): number {
  let width = 0
  for (const char of str) {
    width += char.charCodeAt(0) < 128 && char.charCodeAt(0) >= 0 ? 1 : 2
  }

  return width
}

// Generate a horizontal border segment of the given width
function get_egde(width: number) {
  let edge = ''
  for (let i = 0; i <= width; i++) {
    edge += EDGE
  }
  return edge
}

// Generate a border row
function get_edge(widths: number[], no_line_break: boolean = false) {
  const col_num = widths.length
  let border = ''
  widths.forEach((width, col) => {
    border += NODE + get_egde(width + 1)
    if (col === col_num - 1) {
      border += NODE + (no_line_break ? EMPTY : '\n')
    } else {
      border += EMPTY
    }
  })

  return border
}

// Generate whitespace padding of the given width
function get_space(width: number): string {
  let space = ''
  for (let i = 0; i <= width; i++) {
    space += SPACE
  }
  return space
}

// Write a data row
function wirte_data(widths: number[], data: (string | number)[]): string {
  const col_num = widths.length
  let content = ''

  widths.forEach((width, col) => {
    const col_data = data[col]
    let _content = ''

    if (!isNaN(+col_data)) {
      _content += get_space(width - get_string_width(col_data.toString())) + col_data + SPACE
    } else {
      _content += SPACE + (col_data ?? '') + get_space(width - get_string_width((col_data ?? '').toString()))
    }
    content += HIGH + _content
    if (col === col_num - 1) {
      content += HIGH + '\n'
    } else {
      content += EMPTY
    }
  })

  return content
}

// Get the maximum display width of each column
function get_max_widths(data: ConsoleData): number[] {
  let max_widths = Object.keys(data[0]).map((v) => +v)

  for (const row_data of data) {
    row_data.forEach((col_data, idx) => {
      const width = get_string_width(col_data.toString())
      max_widths[idx] = Math.max(width, max_widths[idx])
    })
  }
  return max_widths
}

/**
 * Print a MySQL-client-style table to the console
 * @param data 2D array; the first row is the header
 * @param callBack optional callback that receives the assembled table string (for custom output)
 */
export default function console_table(data: ConsoleData, callBack?: (str: string) => void) {
  const row_num = data.length
  const max_widths = get_max_widths(data)

  let table = ''
  data.forEach((row_data, row) => {
    if (row <= 1) {
      table += get_edge(max_widths)
    }
    table += wirte_data(max_widths, row_data)
    if (row === row_num - 1) {
      table += get_edge(max_widths, true)
    }
  })

  console.log(table)

  callBack?.(table)
}
