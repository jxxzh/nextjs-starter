/**
 * 检查一个值是否为普通对象（plain object）
 * 普通对象是指通过对象字面量 {} 创建或 Object.create(null) 创建的对象
 *
 * @param value - 要检查的值
 * @returns 如果是普通对象返回 true，否则返回 false
 *
 * @example
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject(Object.create(null)) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  // 快速检查：如果不是对象或为 null，直接返回 false
  if (!value || typeof value !== 'object')
    return false

  // 检查对象的内部 [[Class]] 标签
  if (Object.prototype.toString.call(value) !== '[object Object]')
    return false

  // 获取原型链
  const proto = Object.getPrototypeOf(value)

  // 如果原型为 null（Object.create(null)的情况），则是普通对象
  if (proto === null)
    return true

  // 检查构造函数
  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor

  // 验证构造函数是否为 Object
  return typeof Ctor === 'function'
    && Ctor === Object
}
