import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell, Center, Container, Footer, Group, Header, Text } from "@mantine/core"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const appName = "Shortl"
  const thisYear = new Date().getFullYear()

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
              <Group mx="auto" h={60} align="center">
                <Text fw={700}>{appName}</Text>
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
