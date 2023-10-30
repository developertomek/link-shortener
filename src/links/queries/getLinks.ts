import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const links = await db.link.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        redirectTo: true,
        createdAt: true,
      },
    })
    return links
  }
)
