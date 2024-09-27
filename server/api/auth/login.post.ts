import { defineEventHandler, readBody } from 'h3'
import { User } from '../../models/User'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    return { status: 'error', message: '缺少用户名或密码' }
  }

  const user = await User.findOne({ username })
  if (!user) {
    return { status: 'error', message: '用户不存在' }
  }

  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return { status: 'error', message: '密码错误' }
  }

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
})
