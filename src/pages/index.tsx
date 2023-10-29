import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { Stack, Title, Text } from "@mantine/core"
import { LinkInput } from "@/core/components/LinkInput"

const UserInfo = () => {
  const user = useCurrentUser()

  const onClick = () => {
    if (user) {
      console.log("generate link")
      //   cryptoRandomString({length: 10, type: 'url-safe'});
    } else {
      console.log("onClick")
    }
  }

  return (
    <>
      {!user && (
        <Stack align="center" h={550} justify="center">
          <Title pt="xl">Shorten, Share and Track Your Links</Title>
          <Text c="dimmed" mt="md">
            Shorter links are easier to share and remember, and they can help you track your traffic
            and clicks.
          </Text>
          <LinkInput onClick={onClick} />
        </Stack>
      )}
      {user && (
        <Stack align="center" pt="xl">
          <LinkInput onClick={onClick} />
        </Stack>
      )}
    </>
  )
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <UserInfo />
    </Layout>
  )
}

export default Home
