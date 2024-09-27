import { withAuth } from '@/server/utils/auth'
import { User } from '../../models/User'

const handler = async (event) => {
  const user = event.context.user

  // 仅管理员或教师可以获取学生列表
  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  // 可以根据需要实现按班级筛选
  const { class: className } = getQuery(event)

  const filter = className ? { class: className } : {}

  const students = await User.find({ ...filter, role: 'student' }).select('-password')

  return {
    status: 'success',
    data: students,
  }
}

export default withAuth(handler, ['admin', 'teacher'])