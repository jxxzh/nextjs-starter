# 组件规范

## 组件分类

### 1. 全局组件 (`@/components`)
全局组件位于 `@/components` 目录下，可被多个页面复用：

- **`/common`**: 通用基础组件
  - 与业务逻辑无关
  - 类似工具函数，高度可复用
  - 示例：`LocaleSelect`

- **`/business`**: 业务组件
  - 包含特定业务逻辑
  - 示例：`UserProfile`、`ProductCard`

- **`/icons`**: 图标组件
  - 基于 [Iconify](https://icon-sets.iconify.design/) 图标库
  - 使用方法：
    1. 在 Iconify 中选择图标
    2. 复制 React 代码
    3. 创建新的图标组件文件

- **`/ui`**: Shadcn UI 组件
  - 存放所有 Shadcn UI 相关组件
  - 保持组件原有结构

### 2. 页面组件 (`@/app/**/_components`)
- 仅用于特定页面的组件
- 位于对应页面目录的 `_components` 文件夹下
- 示例：`@/app/[locale]/dashboard/_components/stats-card.tsx`

## 开发规范

### 1. 文件命名
- 使用 kebab-case（短横线）命名
- 一般以描述性名词结尾
- 示例：
  - ✅ `nav-breadcrumbs.tsx`
  - ✅ `user-profile-card.tsx`
  - ❌ `NavBreadcrumbs.tsx`

### 2. 组件基础规范
- 优先使用 React Server Components (RSC)
- 仅在必要时使用 `'use client'` 指令
  - 需要使用浏览器 API
  - 需要使用 React hooks
  - 需要添加事件处理器
- 确保所有组件都有完整的 TypeScript 类型定义
- 使用命名导出（named export）
- 遵循项目 ESLint 配置

### 3. 组件结构

```tsx
// 组件文件结构
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
// 类型定义
type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
} & ComponentPropsWithoutRef<'button'>

export function Button({
  children,
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'base-styles',
        variant === 'primary' && 'primary-styles',
        variant === 'secondary' && 'secondary-styles',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 4. Props 规范
- 使用解构赋值接收 props
- 为可选 props 提供默认值
- props 接口名应以组件名 + Props 结尾
- 使用 children 代替 content 属性

### 5. 状态管理
- 优先使用 React Server Components 获取数据
- 客户端状态管理使用 TanStack Query
- 表单状态管理使用 React Hook Form
- 避免过度使用全局状态
- 合理使用 Context API

### 6. 样式规范
- 优先使用 Tailwind CSS
- 使用 cn() 工具函数合并类名
- 遵循移动优先的响应式设计
- 避免内联样式
- 复杂样式逻辑抽离为独立的 CSS 类

### 7. 性能优化

- 必要时使用组件懒加载: [Next.js Lazy Loading](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- 合理使用 memo 优化重渲染
- 使用 useMemo 和 useCallback 缓存计算结果和回调
- 避免不必要的状态更新
- 优化图片加载使用 [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
  - 当一个图片以多个不同尺寸在不同组件中使用时，可以不使用 Image 组件，或者设置 `unoptimized` 为 `true`
