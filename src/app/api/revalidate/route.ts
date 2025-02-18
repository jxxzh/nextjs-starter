import type { NextRequest } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// 定义请求体的验证 schema
const RevalidateSchema = z.object({
  route: z.string().startsWith('/').optional(), // 可选的路由，如果提供则必须以 / 开头
  tag: z.string().optional(), // 可选的重新验证标签
})

// 从环境变量中获取验证令牌
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN

export async function POST(request: NextRequest) {
  try {
    // 从自定义请求头获取令牌
    const token = request.headers.get('X-Revalidate-Token')
    if (!token) {
      return NextResponse.json(
        { message: '缺少重新验证令牌' },
        { status: 401 },
      )
    }

    if (token !== REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: '无效的重新验证令牌' },
        { status: 401 },
      )
    }

    // 解析请求体
    const body = await request.json()

    // 验证请求体格式
    const { route, tag } = RevalidateSchema.parse(body)

    // 根据提供的参数选择性地重新验证
    if (route)
      revalidatePath(route)
    if (tag)
      revalidateTag(tag)

    return NextResponse.json(
      {
        revalidated: true,
        message: `重新验证成功${route ? `：路由 ${route}` : ''}${tag ? ` 标签 ${tag}` : ''}`,
      },
      { status: 200 },
    )
  }
  catch (error) {
    // 处理验证错误
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: '无效的请求格式', errors: error.errors },
        { status: 400 },
      )
    }

    // 处理其他错误
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: '重新验证过程中发生错误' },
      { status: 500 },
    )
  }
}
