import { withAuth } from '../../middleware/auth'
import Vote from '../../models/Vote'

const handler = async (event) => {
  const user = event.context.user

  const filter = { class: user.class }

  const votes = await Vote.find(filter)

  return {
    status: 'success',
    data: votes,
  }
}

export default withAuth(handler)