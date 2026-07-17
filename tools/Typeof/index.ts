type BaseType = 'string' | 'number' | 'boolean' | 'undefined' | 'function' | 'symbol' | 'bigint'

type ObjectType = 'object' | 'array' | 'null' | 'date' | 'formdata' | 'set' | 'map' | 'regexp' | 'arraybuffer' | 'blob'

type Type = BaseType | ObjectType

/**
 * Get the type of a value, or check it against an expected type
 * @param value the value to inspect
 * @param isType expected type; if provided, returns a boolean (whether value is of that type), otherwise returns the type string
 * @returns the type string (e.g. 'array' / 'date'), or the comparison result against isType
 */
export default function Typeof<T>(value: T, isType?: Type): boolean | Type {
  const object_type: string = Object.prototype.toString.call(value)
  const reg = new RegExp(' (.+?)]')
  const type = (object_type.match(reg) as RegExpMatchArray)[1].toLowerCase()

  if (!isType) {
    return type as Type
  }

  if (typeof value !== 'object') {
    return typeof value === isType
  } else {
    return type === isType
  }
}
