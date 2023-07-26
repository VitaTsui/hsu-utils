type Type =
  | 'number'
  | 'string'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'undefined'
  | 'unknown'
  | 'function'
  | 'symbol'
  | 'date'
  | 'formdata'
  | string

export default function Typeof(value: any): Type {
  const object_type: string = Object.prototype.toString.call(value)

  const reg = new RegExp(' (.+?)]')

  const type = (object_type.match(reg) as RegExpMatchArray)[1]

  return type.toLowerCase() as Type
}
