import jwt from 'jsonwebtoken'
import User from '../models/User'
import { H3Event, defineEventHandler, getHeader } from 'h3'

type Role = 'admin' | 'teacher' | 'student'

export const withAuth = (
  handler: (event: H3Event) => Promise<any>,
  requiredRoles: Role[] = []
) => {
  return defineEventHandler(async (event: H3Event) => {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { status: 'error', message: '未授权' }
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, role: Role }
      const user = await User.findById(decoded.id)
      if (!user) {
        return { status: 'error', message: '用户不存在' }
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return { status: 'error', message: '权限不足' }
      }

      // 将用户信息挂载到 event 上下文
      event.context.user = user

      return await handler(event)
    } catch (error) {
      return { status: 'error', message: '无效的Token' }
    }
  })
}
