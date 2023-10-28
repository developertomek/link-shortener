import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import {
  Anchor,
  AppShell,
  Button,
  Center,
  Container,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core"
import { IconLink } from "@tabler/icons-react"
import Link from "next/link"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/auth/mutations/logout"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const appName = "Shortl"
  const thisYear = new Date().getFullYear()

  const user = useCurrentUser()
  const [$logout] = useMutation(logout)

  return (
    <>
      <Head>
        <title>{title || "link-shortener"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        mx="auto"
        padding="md"
        header={
          <Header height={60} px="xs" withBorder={false}>
            <Container>
              <Group mx="auto" h={60} align="center" position="apart">
                <Anchor
                  underline={false}
                  color="gray.3"
                  component={Link}
                  href={Routes.Home()}
                  fw="bold"
                >
                  <Group>
                    <IconLink color="violet" />
                    {appName}
                  </Group>
                </Anchor>
                {user && (
                  <Button
                    onClick={async () => {
                      await $logout()
                    }}
                  >
                    Logout
                  </Button>
                )}
                {!user && (
                  <Button component={Link} href={Routes.LoginPage()}>
                    Login
                  </Button>
                )}
              </Group>
            </Container>
          </Header>
        }
        footer={
          <Footer withBorder={false} height={50} p="md" fz="xs" color="dimmed">
            <Center>
              {appName} @copyright {thisYear}
            </Center>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Container size="md">{children}</Container>
      </AppShell>
    </>
  )
}

export default Layout
