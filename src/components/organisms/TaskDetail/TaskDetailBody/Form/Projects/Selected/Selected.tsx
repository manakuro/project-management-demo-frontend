import React from 'react'
import { Box, Button, Flex, Icon, Stack } from 'src/components/atoms'
import { ProjectButton } from './ProjectButton'
import { Section } from './Section'
import { useDisclosure } from 'src/shared/chakra'
import { Input } from '../Input'

type Props = {}

export const Selected: React.FC<Props> = () => {
  const inputDisclosure = useDisclosure()

  return (
    <Flex flexDirection="column">
      <Stack
        spacing={1}
        direction="row"
        display="flex"
        alignItems="center"
        mt={1}
        mb={2}
      >
        <ProjectButton />
        <Section />
        <Button as={Box} variant="ghost" size="xs" cursor="pointer">
          <Icon icon="x" color="text.muted" />
        </Button>
        <Button
          as={Box}
          variant="ghost"
          size="xs"
          cursor="pointer"
          onClick={inputDisclosure.onOpen}
        >
          <Icon icon="plus" color="text.muted" />
        </Button>
      </Stack>
      {inputDisclosure.isOpen && (
        <Flex flex={1}>
          <Input onClickOutside={inputDisclosure.onClose} />
        </Flex>
      )}
    </Flex>
  )
}
