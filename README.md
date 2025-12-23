# [Hsu Utils](https://github.com/VitaTsui/hsu-utils#hsu-utils)

## 前言

`hsu-utils` 一些前端的工具集

## 安装

```sh
npm install --save hsu-utils
# 或
yarn add hsu-utils
```

## 功能

| 方法              | 子方法                | 说明                            | 类型                                                                                          | 备注                             |
| ----------------- | --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------- |
| array_is_includes | -                     | 判断一个数组是否包含另一个数组  | \<T>(arr1: Array\<T>, arr2: Array\<T>) => boolean                                             | -                                |
| console_table     | -                     | 在控制台打印像 MySql 一样的表格 | (data: [ConsoleData](#consoledata), callBack?: (str: string) => void) => void                 | -                                |
| ConvertNumbers    | toChineseNum          | 数字转中文                      | (num: number, options?: [C_Options](#c_options)) => string                                    | -                                |
| deepCopy          | -                     | 深拷贝                          | \<T>(data: T) => T                                                                            | -                                |
| downloadFile      | -                     | 文件下载                        | (file: ArrayBuffer \| string, fileName?: string, signal?: AbortSignal) => Promise\<void>      | string 为 http(s) 地址或本地地址 |
| Equal             | ValEqual              | 判断值相等                      | <T = unknown>(obj1: T, obj2: T) => boolean                                                    | -                                |
|                   | TypeEqual             | 判断类型相同                    | <T = unknown>(obj1: T, obj2: T) => boolean                                                    | -                                |
|                   | ObjEqual              | 判断对象相等                    | <T = object>(obj1: T, obj2: T) => boolean                                                     | -                                |
| get_string_size   | -                     | 获取字符串大小                  | (str: string, font?: [Font](#font)) => { width: number; height: number }                      | -                                |
|                   | get_string_size_async | 异步获取字符串大小              | (str: string, font?: [Font](#font)) => Promise<{ width: number; height: number }>             | -                                |
| loadImage         | -                     | 异步加载图片并缓存              | (url: string) => Promise\<HTMLImageElement>                                                   | -                                |
| loadFont          | -                     | 异步加载字体                    | (options: [LoadFontOptions](#loadfontoptions)) => Promise\<void>                              | -                                |
| RenderPDF         | load                  | 用于预加载 PDF                  | (pdfUrl: string) => Promise\<PDFDocumentProxy>                                                | -                                |
|                   | getNumPages           | 获取 PDF 页数                   | (pdfUrl: string): Promise\<number>                                                            | -                                |
|                   | clear                 | 删除已渲染的 PDF                | (containerId: string) => void                                                                 | -                                |
|                   | render                | 渲染 PDF                        | (options: [RenderOption](#renderoption)) => Promise\<void>                                    | -                                |
| Typeof            | -                     | 获取类型或判断类型              | \<T>(value: T, isType?: [Type](#type)) => boolean \| Type                                     | -                                |
| generateRandomStr | -                     | 生成随机字符串                  | (length:number) => string                                                                     | -                                |
| getTimeDifference | -                     | 获取时间差                      | (start: string, end: string) => [TimeDifference](#timedifference)                             | -                                |
| getDateRange      | -                     | 获取日期范围                    | (options: [GetDateRangeOptions](#getdaterangeoptions)) => [DateRangeResult](#daterangeresult) | -                                |

## 类型

### ConsoleData

> type ConsoleData = Array<Array<string | number>>

### C_Options

| 参数      | 说明         | 类型     | 默认值    | 备注 |
| --------- | ------------ | -------- | --------- | ---- |
| benchmark | 乘数         | number   | -         | -    |
| textType  | 输出文字样式 | TextType | lowercase | -    |

> type TextType = 'lowercase' | 'uppercase'

`lowercase` ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿', '兆']  
`uppercase` ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '萬', '億', '兆']

### Font

| 参数   | 说明     | 类型   | 默认值     | 备注 |
| ------ | -------- | ------ | ---------- | ---- |
| size   | 字体大小 | number | 10         | -    |
| style  | 字体样式 | string | normal     | -    |
| weight | 字体粗细 | string | normal     | -    |
| family | 字体系列 | string | sans-serif | -    |

### LoadFontOptions

| 参数 | 说明          | 类型                     | 默认值 | 备注 |
| ---- | ------------- | ------------------------ | ------ | ---- |
| ctx  | Canvas 上下文 | CanvasRenderingContext2D | -      | -    |
| font | 字体配置      | [Font](#font)            | -      | -    |
| text | 文本内容      | string                   | -      | -    |

### RenderOption

| 参数         | 说明         | 类型   | 默认值 | 备注 |
| ------------ | ------------ | ------ | ------ | ---- |
| pdfUrl       | pdf 文件地址 | string | -      | 必填 |
| containerId  | pdf 容器 id  | string | normal | 必填 |
| startPageNum | 开始页码     | number | normal | -    |
| endPageNum   | 结束页码     | number | normal | -    |
| pixelRatio   | 像素比例     | number | 2      | -    |
| scale        | 缩放         | number | 1      | -    |

### Type

> type BaseType = 'string' | 'number' | 'boolean' | 'undefined' | 'function' | 'symbol' | 'bigint'  
> type ObjectType = 'object' | 'array' | 'null' | 'date' | 'formdata' | 'set' | 'map' | 'regexp' | 'arraybuffer' | 'blob'  
> type Type = BaseType | ObjectType

### TimeDifference

| 参数         | 说明       | 类型   | 默认值 | 备注 |
| ------------ | ---------- | ------ | ------ | ---- |
| days         | 相差天数   | number | -      | -    |
| hours        | 相差小时   | number | -      | -    |
| minutes      | 相差分钟   | number | -      | -    |
| seconds      | 相差秒数   | number | -      | -    |
| milliseconds | 相差毫秒数 | number | -      | -    |

### GetDateRangeOptions

| 参数     | 说明                  | 类型                                 | 默认值 | 备注                           |
| -------- | --------------------- | ------------------------------------ | ------ | ------------------------------ |
| type     | 日期范围类型          | [DateRangeType](#daterangetype)      | -      | 必填                           |
| amount   | 数量（用于过去/未来） | number                               | 0      | -                              |
| baseDate | 基准日期              | string \| Date \| Dayjs              | -      | 默认为当前日期                 |
| unit     | 单位（用于过去/未来） | 'day' \| 'week' \| 'month' \| 'year' | 'day'  | -                              |
| minDate  | 最小时间限制          | string \| Date \| Dayjs              | -      | 用于过去/未来，限制范围最小值 |
| maxDate  | 最大时间限制          | string \| Date \| Dayjs              | -      | 用于过去/未来，限制范围最大值 |
| hasTime  | 是否包含时间部分      | boolean                              | false  | 控制返回格式是否包含时间       |

### DateRangeType

> type DateRangeType = 'past' | 'future' | 'today' | 'thisWeek' | 'thisMonth' | 'thisQuarter' | 'thisYear'

- `past` - 过去
- `future` - 未来
- `today` - 当日
- `thisWeek` - 当周
- `thisMonth` - 当月
- `thisQuarter` - 当季
- `thisYear` - 当年

### DateRangeResult

> type DateRangeResult = [string, string]

返回时间段数组，格式根据类型和单位自动匹配：

- `today` / `thisWeek` / `past`(day/week) / `future`(day/week) → `YYYY-MM-DD` (hasTime 为 true 时: `YYYY-MM-DD HH:mm:ss`)
- `thisMonth` / `past`(month) / `future`(month) → `YYYY-MM`
- `thisQuarter` → `YYYY-[Q]Q` (例如: `2024-Q1`)
- `thisYear` / `past`(year) / `future`(year) → `YYYY`

注意：当 `hasTime` 为 `true` 时，包含日期部分的格式会自动添加时间部分 `HH:mm:ss`。默认 `hasTime` 为 `false`。

## License

MIT
