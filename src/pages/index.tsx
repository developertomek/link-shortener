import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Stack, Title, Text } from "@mantine/core"
import { LinkInput } from "@/core/components/LinkInput"
import crypto from "crypto"
import { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import generateLink from "@/links/mutations/generateLink"

const UserInfo = () => {
  const user = useCurrentUser()
  const [url, setUrl] = useState<string>("")
  const [redirectTo, setRedirectTo] = useState<string>("")
  const [$generateLink, { isLoading, isSuccess }] = useMutation(generateLink, {})

  const handleOnClick = async () => {
    if (user) {
      setUrl(crypto.randomBytes(10).toString("hex"))
      await $generateLink({ url, redirectTo })

      if (isSuccess) {
        setUrl("")
      }
    } else {
      Routes.LoginPage()
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRedirectTo(e.target.value)
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
          <LinkInput isLoading={isLoading} onClick={handleOnClick} />
        </Stack>
      )}
      {user && (
        <Stack align="center" pt="xl">
          <LinkInput
            redirectTo={redirectTo}
            isLoading={isLoading}
            onClick={handleOnClick}
            onChange={handleOnChange}
          />
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
