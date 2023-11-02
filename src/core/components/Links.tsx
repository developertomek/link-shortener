import deleteLink from "@/links/mutations/deleteLink"
import getLinks from "@/links/queries/getLinks"
import { confirmDelete } from "@/utils/mantine-utils"
import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Group, Title, Text, ActionIcon, Anchor, Stack, Button, Tooltip } from "@mantine/core"
import { notifications } from "@mantine/notifications"
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
                shortl/s/
              </Text>
              <Tooltip label="copy to clipboard">
                <Anchor
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      "https://shortl.up.railway.app/s/" + link.name
                    )
                    notifications.show({
                      color: "green",
                      title: "Success",
                      message: "Copied to clipboard",
                    })
                  }}
                >
                  {link.name}
                </Anchor>
              </Tooltip>
            </Group>
            <Group spacing="xs">
              <Tooltip label={link.redirectTo}>
                <Anchor color="inherit" href={link.redirectTo} component={Link} target="_blank">
                  {link.redirectTo.slice(0, 25)}...{" "}
                </Anchor>
              </Tooltip>
              <Text fz="xs" c="dimmed">
                ({link.createdAt.toDateString()})
              </Text>
            </Group>
            <Tooltip label="delete">
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
            </Tooltip>
          </Group>
        ))}
    </>
  )
}
