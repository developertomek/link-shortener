import getLink from "@/links/queries/getLink"
import { BlitzPage, useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Group, Loader, Text, Title } from "@mantine/core"
import React from "react"

const LinkPage: BlitzPage = () => {
  const link = useParam("link", "string")

  const [redirectTo] = useQuery(getLink, { id: link as string })

  if (!link) {
    return <Text>Link not found 😞</Text>
  }

  if (redirectTo) {
    window.location.replace(redirectTo)
  }

  return (
    <Group position="center" align="center" h="100vh">
      <Text fz="xl">
        {" "}
        Redirecting <Loader />{" "}
      </Text>
    </Group>
  )
}

export default LinkPage
