import { readBody, H3Event } from 'h3'
import { withAuth } from '@/server/utils/auth'
import { Vote } from '../../../models/Vote'

const handler = async (event: H3Event) => {
  const user = event.context.user
  const { id } = event.context.params
  const { option } = await readBody(event)

  const vote = await Vote.findById(id)
  if (!vote) {
    return { status: 'error', message: '投票不存在' }
  }

  // 确保投票属于用户所在班级
  if (vote.class !== user.class) {
    return { status: 'error', message: '你不能参与此投票' }
  }

  // 检查用户是否已经投票
  const existingVote = vote.votes.find(v => v.user.toString() === user._id.toString())
  if (existingVote) {
    return { status: 'error', message: '你已经投过票了' }
  }

  // 检查选项是否有效
  if (!vote.options.includes(option)) {
    return { status: 'error', message: '无效的投票选项' }
  }

  vote.votes.push({ option, user: user._id })
  await vote.save()

  return {
    status: 'success',
    data: vote,
  }
}

export default withAuth(handler, ['admin', 'teacher', 'student'])