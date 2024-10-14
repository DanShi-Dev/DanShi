
import { publicProcedure, router } from '@/server/trpc/trpc'
import { z } from 'zod'

export const Test = router({
  test: publicProcedure
    .input(
      z.object({
        text: z.string(),
        plain: z.string()
      }),
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        greeting: `hello ${input.text ?? 'world'}`,
      }
    }),
})