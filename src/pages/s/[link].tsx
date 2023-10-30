import Layout from "@/core/layouts/Layout"
import { BlitzPage, useParam } from "@blitzjs/next"
import { Group, Text } from "@mantine/core"
import React from "react"

const LinkPage: BlitzPage = () => {
  const link = useParam("link", "string")
  console.log(link, "link")
  return (
    <Layout>
      <Group>
        <Text> {link} </Text>
      </Group>
    </Layout>
  )
}

export default LinkPage
