import { publicProcedure, router } from '@/server/trpc/trpc'
import { z } from 'zod'
import { User, UserZodSchema } from '../models/User'

export const Test = router({
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
        userList: z.array(UserZodSchema),
      }),
    )
    .query(async (_) => {
      return {
        userList: await User.find(),
      }
    }),
})
