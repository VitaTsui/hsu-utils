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

- `console_table` 在控制台打印像 MySql 一样的表格
- `deepCopy` 深拷贝
- `Equal`

  > `ValEqual` 判断值相等，`TypeEqual` 判断类型相同，`ObjEqual` 判断对象相等

- `Typeof` 获取类型或判断类型

  > string、number、boolean、undefined、function、symbol、bigint、object、array、null、date、formdata、set、map、regexp、arraybuffer、blob

- `get_string_width` 获取字符串长度
  > 根据字体属性进行计算，默认 size 为 12，family 为 微软雅黑
- `loadImage` 异步加载图片
  > 确保相同的图片只加载一次
- `renderPDF` 渲染 PDF
- `downloadFile` 下载文件
