import deleteLink from "@/links/mutations/deleteLink"
import getLinks from "@/links/queries/getLinks"
import { confirmDelete } from "@/utils/mantine-utils"
import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Group, Title, Text, ActionIcon, Anchor, Stack } from "@mantine/core"
import { IconTrashX } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

export const Links = () => {
  const [$deleteLink] = useMutation(deleteLink, {})
  const [links] = useQuery(getLinks, {})

  return (
    <>
      <Title pt="xl" mt="xl">
        Your links
      </Title>
      {links &&
        links.map((link) => (
          <Group position="apart" spacing="xl" w="100%" pt="md" key={link.id}>
            <Group spacing="xs">
              <Text fz="xs" color="dimmed">
                shortl.com/
              </Text>
              <Anchor href={Routes.LinkPage({ link: link.name })} component={Link}>
                {link.name}
              </Anchor>
            </Group>
            <Group spacing="xs">
              <Anchor color="inherit" href={link.redirectTo} component={Link} target="_blank">
                {link.redirectTo.slice(0, 25)}...{" "}
              </Anchor>
              <Text fz="xs" c="dimmed">
                ({link.createdAt.toDateString()})
              </Text>
            </Group>

            <ActionIcon
              onClick={() => {
                confirmDelete(
                  async () => {
                    await $deleteLink({ id: link.id })
                  },
                  {
                    confirmLabel: "Delete link",
                  }
                )
              }}
              color="violet"
              variant="light"
              size="lg"
            >
              <IconTrashX />
            </ActionIcon>
          </Group>
        ))}
    </>
  )
}
