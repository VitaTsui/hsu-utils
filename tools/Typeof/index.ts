type BaseType = 'string' | 'number' | 'boolean' | 'undefined' | 'function' | 'symbol' | 'bigint'

type ObjectType = 'object' | 'array' | 'null' | 'date' | 'formdata' | 'set' | 'map' | 'regexp' | 'arraybuffer' | 'blob'

type Type = BaseType | ObjectType

export default function Typeof<T>(value: T, isType?: Type): boolean | Type {
  const object_type: string = Object.prototype.toString.call(value)
  const reg = new RegExp(' (.+?)]')
  const type = (object_type.match(reg) as RegExpMatchArray)[1].toLowerCase()

  if (!isType) {
    return type as Type
  }

  let isTypeEqual = false

  if (typeof value !== 'object') {
    isTypeEqual = typeof value === isType
  } else {
    isTypeEqual = type === isType
  }

  return isTypeEqual
}
