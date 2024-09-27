import { withAuth } from '../../../middleware/auth'
import User from '../../../models/User'

const handler = async (event) => {
  const user = event.context.user
  const { id } = event.context.params
  const { points } = await useBody(event)

  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  const targetUser = await User.findById(id)
  if (!targetUser) {
    return { status: 'error', message: '用户不存在' }
  }

  targetUser.points = points
  await targetUser.save()

  return {
    status: 'success',
    data: {
      id: targetUser._id,
      points: targetUser.points,
    },
  }
}

export default withAuth(handler, ['admin', 'teacher'])