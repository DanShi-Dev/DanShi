import { allRouters } from '@/server/router'
import { createNuxtApiHandler } from 'trpc-nuxt'

export const appRouter = allRouters

export type AppRouter = typeof appRouter

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
