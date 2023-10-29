import { ReactFC } from "~/types"
import { IconArrowRight, IconLink } from "@tabler/icons-react"
import { Button, Text, TextInput } from "@mantine/core"

export const LinkInput: ReactFC<{
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
