/**
 * 深度比较两个值是否相等
 * @param value1 - 第一个要比较的值
 * @param value2 - 第二个要比较的值
 * @returns 如果两个值深度相等则返回 true，否则返回 false
 *
 * @example
 * ```ts
 * isDeepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
 * isDeepEqual(new Date('2024-01-01'), new Date('2024-01-01')) // true
 * ```
 */
export function isDeepEqual(value1: unknown, value2: unknown): boolean {
  // 处理完全相等的情况
  if (Object.is(value1, value2))
    return true

  // 处理基础类型不相等的情况
  if (
    typeof value1 !== 'object'
    || typeof value2 !== 'object'
    || value1 === null
    || value2 === null
  ) {
    return false
  }

  // 处理特殊对象类型
  if (value1 instanceof Date && value2 instanceof Date)
    return value1.getTime() === value2.getTime()

  if (value1 instanceof RegExp && value2 instanceof RegExp)
    return value1.toString() === value2.toString()

  // 确保两个值的构造函数相同
  if (value1.constructor !== value2.constructor)
    return false

  // 处理数组
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length)
      return false
    return value1.every((item, index) => isDeepEqual(item, value2[index]))
  }

  const keys1 = Object.keys(value1 as object)
  const keys2 = Object.keys(value2 as object)

  // 检查键的数量是否相同
  if (keys1.length !== keys2.length)
    return false

  // 递归比较每个属性
  return keys1.every((key) => {
    const hasKey = Object.prototype.hasOwnProperty.call(value2, key)
    if (!hasKey)
      return false
    return isDeepEqual(
      (value1 as Record<string, unknown>)[key],
      (value2 as Record<string, unknown>)[key],
    )
  })
}
