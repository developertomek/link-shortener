import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ id }) => {
  const link = await db.link.findFirst({
    where: {
      name: id,
    },
    select: {
      redirectTo: true,
    },
  })

  if (!link?.redirectTo) throw new Error("Could not find link")

  return link.redirectTo
})
