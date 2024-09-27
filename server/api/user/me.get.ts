import { withAuth } from '@/server/utils/auth'

const handler = async (event) => {
  const user = event.context.user

  return {
    status: 'success',
    data: {
      id: user._id,
      username: user.username,
      role: user.role,
      class: user.class,
      studentId: user.studentId,
      points: user.points,
    },
  }
}

export default withAuth(handler)