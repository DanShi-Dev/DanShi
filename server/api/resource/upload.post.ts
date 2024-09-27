import { readBody, H3Event } from 'h3'
import { withAuth } from '../../middleware/auth'
import Resource from '@/server/models/Resource'

const handler = async (event: H3Event) => {
  const user = event.context.user

  // 仅教师和管理员可以上传资料
  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  // 假设前端以 JSON 形式上传文件 URL
  const body = await readBody(event)
  const { title, description, class: className, fileUrl } = body

  if (!title || !className || !fileUrl) {
    return { status: 'error', message: '缺少必要字段' }
  }

  const resource = new Resource({
    title,
    description,
    fileUrl,
    class: className,
    uploadedBy: user._id,
  })

  try {
    await resource.save()
    return {
      status: 'success',
      data: resource,
    }
  } catch (error) {
    return { status: 'error', message: '上传失败' }
  }
}

export default withAuth(handler, ['admin', 'teacher'])
