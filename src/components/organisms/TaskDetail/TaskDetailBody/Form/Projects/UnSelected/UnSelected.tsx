import React from 'react'
import { Button, Box, Flex } from 'src/components/atoms'
import { useDisclosure } from 'src/shared/chakra'
import { Input } from '../Input'

type Props = {
  taskId: string
}

export const UnSelected: React.FC<Props> = (props) => {
  const inputDisclosure = useDisclosure()

  return (
    <Flex flex={1}>
      {inputDisclosure.isOpen ? (
        <Input onClose={inputDisclosure.onClose} taskId={props.taskId} />
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
