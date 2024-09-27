import { H3Event, getQuery } from 'h3'
import { withAuth } from '@/server/utils/auth'
import { User } from '../../models/User'

const handler = async (event: H3Event) => {
  const user = event.context.user

  // 仅管理员或教师可以获取学生列表
  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  // 可以根据需要实现按班级筛选
  const query = getQuery(event)
  const className = query.class as string | undefined

  const filter = className ? { class: className } : {}

  const students = await User.find({ ...filter, role: 'student' }).select('-password')

  return {
    status: 'success',
    data: students,
  }
}

export default withAuth(handler, ['admin', 'teacher'])
