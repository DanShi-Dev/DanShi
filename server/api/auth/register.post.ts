import { defineEventHandler, readBody } from 'h3'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, role, class: className, studentId } = body

  if (!username || !password || !className) {
    return { status: 'error', message: '缺少必要字段' }
  }

  // 检查用户名是否存在
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return { status: 'error', message: '用户名已存在' }
  }

  // 创建新用户
  const user = new User({
    username,
    password,
    role: role || 'student',
    class: className,
    studentId: studentId || null,
  })

  try {
    await user.save()

    // 生成JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    return {
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          class: user.class,
          studentId: user.studentId,
          points: user.points,
        },
      },
    }
  } catch (error) {
    return { status: 'error', message: '注册失败' }
  }
})
