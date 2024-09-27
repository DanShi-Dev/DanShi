import { withAuth } from '../../middleware/auth'
import Resource from '../../models/Resource'
import { writeFile } from 'fs/promises'
import path from 'path'

const handler = async (event) => {
  const user = event.context.user

  // 仅教师和管理员可以上传资料
  if (!['admin', 'teacher'].includes(user.role)) {
    return { status: 'error', message: '权限不足' }
  }

  const body = await useBody(event)
  const { title, description, class: className } = body
  const file = await readMultipartFormData(event).catch(() => null)

  if (!title || !className || !file) {
    return { status: 'error', message: '缺少必要字段' }
  }

  // 保存文件
  const uploadDir = path.resolve('./public/uploads')
  await writeFile(`${uploadDir}/${file.filename}`, file.file)

  const resource = new Resource({
    title,
    description,
    fileUrl: `/uploads/${file.filename}`,
    class: className,
    uploadedBy: user._id,
  })

  await resource.save()

  return {
    status: 'success',
    data: resource,
  }
}

export default withAuth(handler, ['admin', 'teacher'])