import { ReactFC } from "~/types"
import { IconArrowRight, IconLink } from "@tabler/icons-react"
import { Button, Text, TextInput } from "@mantine/core"

export const LinkInput: ReactFC<{
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  onClick?: () => void
  isLoading: boolean
  redirectTo?: string
}> = ({ onChange, onClick, redirectTo, isLoading = false }) => (
  <TextInput
    radius="md"
    size="lg"
    maw={600}
    w="100%"
    placeholder="Paste link to shorten"
    rightSectionWidth={130}
    icon={<IconLink />}
    onChange={onChange}
    rightSection={
      <Button
        loading={isLoading}
        onClick={onClick}
        size="sm"
        disabled={isLoading || !redirectTo}
        rightIcon={<IconArrowRight stroke={1.5} width={12} />}
      >
        <Text size="sm">Generate</Text>
      </Button>
    }
  />
)
