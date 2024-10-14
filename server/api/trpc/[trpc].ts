import { createNuxtApiHandler } from 'trpc-nuxt'
import { allRouters } from '~/server/router';

export const appRouter = allRouters;

export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
