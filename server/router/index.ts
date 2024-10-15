import { mergeRouters } from '../trpc/trpc'
import { Test } from './test'

export const allRouters = mergeRouters(Test)
