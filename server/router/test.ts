import { publicProcedure, router } from '@/server/trpc/trpc'
import { z } from 'zod'
import { User, UserZod } from '../models/User'

export const TestRoute = router({
  test: publicProcedure
    .input(
      z.object({
        text: z.string(),
        plain: z.string(),
      }),
    )
    .output(
      z.object({
        greeting: z.string(),
      }),
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        greeting: `hello ${input.text ?? 'world'}`,
      }
    }),
  test_database: publicProcedure
    .input(
      z.object({}),
    )
    .output(
      z.object({
        userList: z.array(UserZod),
      }),
    )
    .query(async (_) => {
      return {
        userList: await User.find(),
      }
    }),
  test_environment: publicProcedure
    .input(z.object({}))
    .output(z.object({
      env: z.string(),
    }))
    .query((_) => {
      return {
        env: useRuntimeConfig().private.TEST_ENV_VARIANT,
      }
    }),
})
