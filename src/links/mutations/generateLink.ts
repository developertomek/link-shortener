import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({
  url: z.string(),
  redirectTo: z.string().url(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ url, redirectTo }, { session: { userId } }) => {
    const link = await db.link.create({
      data: {
        name: url,
        redirectTo,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return link
  }
)
