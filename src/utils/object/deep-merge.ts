import { isPlainObject } from './plain-object'

type DeepMergeable = Record<string, any> | undefined

/**
 * 深度合并多个对象的类型定义
 */
type DeepMergeResult<T extends DeepMergeable[]> = T extends [infer First]
  ? First
  : T extends [infer First, ...infer Rest]
    ? Rest extends DeepMergeable[]
      ? Merge<First, DeepMergeResult<Rest>>
      : First
    : undefined

/**
 * 判断是否为对象类型
 */
type IsObject<T> = T extends object
  ? T extends (Array<any> | ((...args: any[]) => any) | Date | RegExp)
    ? false
    : true
  : false

/**
 * 合并两个类型
 */
type Merge<A, B> = A extends undefined
  ? B extends undefined
    ? undefined
    : B
  : B extends undefined
    ? A
    : {
        [K in (keyof A | keyof B)]: K extends keyof B
          ? K extends keyof A
            ? IsObject<A[K]> extends true
              ? IsObject<B[K]> extends true
                ? Merge<A[K], B[K]>
                : B[K]
              : B[K]
            : B[K]
          : K extends keyof A
            ? A[K]
            : never
      }

/**
 * 深度合并多个对象
 *
 * @description
 * - 合并多个对象，后面的对象属性会覆盖前面的
 * - 如果属性值都是普通对象，则递归合并
 * - 如果是数组，则创建新数组
 * - 其他情况直接覆盖
 *
 * @param objects - 要合并的对象数组
 * @returns 合并后的对象
 *
 * @example
 * ```ts
 * const obj1 = { a: { b: 1 } };
 * const obj2 = { a: { c: 2 } };
 * const result = deepMerge(obj1, obj2);
 * // result: { a: { b: 1, c: 2 } }
 * ```
 */
export function deepMerge<T extends DeepMergeable[]>(
  ...objects: [...T]
): DeepMergeResult<T> {
  // 过滤出有效的对象
  const validObjects = objects.filter(
    (obj): obj is Record<string, any> => obj != null && typeof obj === 'object',
  )

  if (validObjects.length === 0) {
    return undefined as DeepMergeResult<T>
  }

  // 使用第一个对象作为基础
  const result = { ...validObjects[0] }

  // 从第二个对象开始合并
  for (let i = 1; i < validObjects.length; i++) {
    const obj = validObjects[i]

    for (const [key, value] of Object.entries(obj)) {
      const currentValue = result[key]

      if (isPlainObject(value) && isPlainObject(currentValue)) {
        // 如果两个值都是普通对象，递归合并
        result[key] = deepMerge(currentValue, value)
      }
      else if (Array.isArray(value)) {
        // 如果是数组，创建新数组
        result[key] = [...value]
      }
      else {
        // 其他情况直接赋值
        result[key] = value
      }
    }
  }

  return result as DeepMergeResult<T>
}
