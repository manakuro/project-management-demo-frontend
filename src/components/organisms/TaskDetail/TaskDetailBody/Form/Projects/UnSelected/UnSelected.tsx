import React from 'react'
import { Button, Box, Flex } from 'src/components/atoms'
import { Input } from '../Input'
import { useDisclosure } from 'src/shared/chakra'

type Props = {}

export const UnSelected: React.FC<Props> = () => {
  const inputDisclosure = useDisclosure()

  return (
    <Flex flex={1}>
      {inputDisclosure.isOpen ? (
        <Input onClickOutside={inputDisclosure.onClose} />
      ) : (
        <Button
          as={Box}
          variant="ghost"
          size="sm"
          border="1px"
          borderColor="transparent"
          onClick={inputDisclosure.onOpen}
          cursor="pointer"
          fontSize="sm"
        >
          Add to projects
        </Button>
      )}
    </Flex>
  )
}
