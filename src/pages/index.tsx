import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage } from "@blitzjs/next"
import { Button, Stack, Title, Text, TextInput } from "@mantine/core"
import { IconArrowRight, IconLink } from "@tabler/icons-react"
import { ReactFC } from "~/types"

const LinkInput: ReactFC<{
  onChange?: () => React.FormEvent<HTMLInputElement>
  onClick?: () => void
}> = ({ onChange, onClick }) => (
  <TextInput
    radius="md"
    size="lg"
    maw={600}
    w="100%"
    placeholder="Paste link to shorten"
    rightSectionWidth={130}
    icon={<IconLink />}
    onChange={() => onChange}
    rightSection={
      <Button onClick={onClick} size="sm" rightIcon={<IconArrowRight stroke={1.5} width={12} />}>
        <Text size="sm">Generate</Text>
      </Button>
    }
  />
)

const UserInfo = () => {
  const user = useCurrentUser()

  const onClick = () => {
    if (user) {
      console.log("generate link")
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
