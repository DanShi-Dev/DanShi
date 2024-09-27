import { withAuth } from '../../middleware/auth'
import Resource from '../../models/Resource'

const handler = async (event) => {
  const user = event.context.user

  const { class: className } = useQuery(event)

  if (user.role === 'student') {
    // 学生只能获取自己班级的资料
    const resources = await Resource.find({ class: user.class })
    return { status: 'success', data: resources }
  } else if (['admin', 'teacher'].includes(user.role)) {
    // 管理员和教师可以获取指定班级或所有班级的资料
    const filter = className ? { class: className } : {}
    const resources = await Resource.find(filter)
    return { status: 'success', data: resources }
  } else {
    return { status: 'error', message: '权限不足' }
  }
}

export default withAuth(handler)