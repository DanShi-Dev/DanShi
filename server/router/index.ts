import { mergeRouters } from '../trpc/trpc'
import { UserRoute } from './user'

export const allRouters = mergeRouters(UserRoute)
