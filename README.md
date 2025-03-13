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

| 方法              | 子方法       | 说明                            | 类型                                                                                             | 备注                             |
| ----------------- | ------------ | ------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------- |
| array_is_includes | -            | 判断一个数组是否包含另一个数组  | \<T>(arr1: Array\<T>, arr2: Array\<T>) => boolean                                                | -                                |
| console_table     | -            | 在控制台打印像 MySql 一样的表格 | (data: [ConsoleData](#consoledata), callBack?: (str: string) => void) => void                    | -                                |
| ConvertNumbers    | toChineseNum | 数字转中文                      | (num: number, options?: [C_Options](#c_options)) => string                                       | -                                |
| deepCopy          | -            | 深拷贝                          | <T = any>(data: T) => T                                                                          | -                                |
| downloadFile      | -            | 文件下载                        | (file: ArrayBuffer \| string, fileName: string) => void                                          | string 为 http(s) 地址或本地地址 |
| Equal             | ValEqual     | 判断值相等                      | <T = unknown>(obj1: T, obj2: T) => boolean                                                       | -                                |
|                   | TypeEqual    | 判断类型相同                    | <T = unknown>(obj1: T, obj2: T) => boolean                                                       | -                                |
|                   | ObjEqual     | 判断对象相等                    | <T = object>(obj1: T, obj2: T) => boolean                                                        | -                                |
| get_string_size   | -            | 获取字符串大小                  | (str: string, font?: [Font](#font), letterSpacing?: number) => { width: number; height: number } | -                                |
| loadImage         | -            | 异步加载图片并缓存              | (url: string) => Promise\<HTMLImageElement>                                                      | -                                |
| RenderPDF         | load         | 用于预加载 PDF                  | (pdfUrl: string) => Promise\<PDFDocumentProxy>                                                   | -                                |
|                   | getNumPages  | 获取 PDF 页数                   | (pdfUrl: string): Promise\<number>                                                               | -                                |
|                   | clear        | 删除已渲染的 PDF                | (containerId: string) => void                                                                    | -                                |
|                   | render       | 渲染 PDF                        | (options: [RenderOption](#renderoption)) => Promise\<void>                                       | -                                |
| Typeof            | -            | 获取类型或判断类型              | \<T>(value: T, isType?: [Type](#type)) => boolean \| Type                                        | -                                |

## 类型

### ConsoleData

> type ConsoleData = Array<Array<string | number>>

### C_Options

| 参数      | 说明         | 类型     | 默认值    | 备注 |
| --------- | ------------ | -------- | --------- | ---- |
| benchmark | 乘数         | number   | -         | -    |
| textType  | 输出文字样式 | TextType | lowercase | -    |

> type TextType = 'lowercase' | 'uppercase'

`lowercase` ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']  
`uppercase` ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

### Font

| 参数    | 说明     | 类型   | 默认值   | 备注 |
| ------- | -------- | ------ | -------- | ---- |
| size    | 字体大小 | number | 12       | -    |
| style   | 字体样式 | string | normal   | -    |
| variant | 字体变体 | string | normal   | -    |
| weight  | 字体粗细 | string | normal   | -    |
| family  | 字体系列 | string | 微软雅黑 | -    |

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

## License

MIT
