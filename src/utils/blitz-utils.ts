import { generateErrorMessage } from "zod-error"

export const errorFormatter = (err: any) => {
  const message = err?.message || err?.toString()

  if (err.code === "P2002") {
    const target = err?.meta?.target?.[0]
    return new Error(`The ${target} is already taken`)
  }

  const messageIncludesPrisma = message.match(/prisma/i)

  if (messageIncludesPrisma) {
    return new Error("An error occurred while accessing the database.")
  }

  if (err.issues) {
    //format zod errors
    const errorMessage = formatZodError(err)
    return new Error(errorMessage)
  }

  return new Error(message)
}

export const formatZodError = (err: any) => {
  return generateErrorMessage(err.issues, {
    delimiter: {
      error: " ",
      component: " ",
    },
    path: {
      enabled: true,
      type: "objectNotation",
      transform: ({ value }) => `${value}:`,
    },
    message: {
      enabled: true,
      transform: ({ value }) => `${value}`,
    },
    code: {
      enabled: false,
    },
  })
}
