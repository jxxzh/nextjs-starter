# Next.js Enterprise Starter

## 项目概述

这是一个企业级 Next.js 应用模板，采用最新的 Web 开发技术栈和最佳实践。本项目特别注重性能优化、代码可维护性和开发体验。

## 特性

- 🚀 基于 Next.js 15 App Router 和 React 19
- 💎 TypeScript 5.x 严格模式
- 🎨 集成 Tailwind CSS 4 和 Shadcn UI 组件库
- 🌐 开箱即用的国际化方案 (next-intl)
- 🔄 优雅的状态管理和数据获取策略
- 📱 响应式设计和移动优先

## 技术栈

### 核心技术
- **框架**: Next.js 15 (App Router)
- **运行时**: React 19 + TypeScript 5.x
- **包管理**: pnpm

### 前端技术
- **样式方案**: Tailwind CSS 4
- **组件库**: Shadcn UI + Radix UI
- **状态管理**:
  - 服务端: React Server Components (RSC)
  - 客户端: TanStack React Query
- **表单处理**: React Hook Form + Zod
- **国际化**: next-intl

## 项目结构

```
src/
├── app/                   # Next.js 应用路由
│   ├── [locale]/         # 国际化路由
│   ├── api/              # API 路由
│   └── global.css        # tailwind 样式配置
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── common/           # 自定义通用组件
│   └── features/         # 自定义业务组件
├── lib/                   # 第三方库配置
│   ├── i18n/             # 国际化配置
│   ├── report/           # 数据上报、分析
│   ├── seo/              # SEO 配置
│   ├── logger.ts         # 日志配置
│   └── utils.ts          # 工具函数
├── service/               # API 服务层
│   ├── api/              # API 接口层
│   └── request.ts        # 请求函数封装
├── types/                 # TypeScript 类型定义
├── utils/                 # 工具函数
│   ├── string/           # 字符串处理
│   └── object/           # 对象处理
└── middleware.ts          # 中间件
```

## 开发规范

### 代码风格
- 严格遵循 TypeScript 类型检查
- 使用 ESLint 进行代码规范和格式化
- 遵循函数式编程范式
- 优先使用 React Server Components

### 命名规范
```typescript
// 文件夹命名：小写中划线
components/auth-form/

// 组件命名：大驼峰
export function AuthButton() {}

// Hooks命名：use前缀
export function useAuthState() {}

// 工具函数：小驼峰
export function formatDateTime() {}

// 类型定义：大驼峰 + 类型后缀
type UserResponse = {}
interface AuthProps {}
```

组件规范详细见：/src/components/README.md

### Git 提交规范

```bash
# 格式
<type>(<scope>): <subject>

# 示例
feat(auth): add social login
fix(api): handle timeout errors
```

类型包括：
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具

## 快速开始

1. **克隆项目**
略

2. **安装依赖**
```bash
pnpm install
```

3. **环境变量配置**
```bash
cp .env.example .env.local
```

4. **启动开发服务器**
```bash
pnpm dev
```

## 环境变量

见： /.env
