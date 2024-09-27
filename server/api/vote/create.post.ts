import { withAuth } from '../../middleware/auth'
import Vote from '../../models/Vote'

const handler = async (event) => {
  const user = event.context.user

  // 仅教师和管理员可以创建投票
  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  const body = await useBody(event)
  const { title, description, options } = body

  if (!title || !options || !Array.isArray(options) || options.length < 2) {
    return { status: 'error', message: '投票标题和至少两个选项是必需的' }
  }

  const vote = new Vote({
    title,
    description,
    options,
    class: user.class,
    createdBy: user._id,
  })

  await vote.save()

  return {
    status: 'success',
    data: vote,
  }
}

export default withAuth(handler, ['admin', 'teacher'])