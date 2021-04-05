import React from 'react'
import { Button, Text, Box, Flex } from 'src/components/atoms'

type Props = {}

export const ProjectButton: React.FC<Props> = (props) => {
  return (
    <Button
      as={Box}
      variant="ghost"
      size="sm"
      cursor="pointer"
      h={6}
      minH={6}
      borderRadius="full"
    >
      <Flex alignItems="center">
        <Box ml={2} w={2} h={2} bg="pink.400" borderRadius="sm" />
        <Text fontSize="xs" flex={1} ml={2}>
          Asana
        </Text>
      </Flex>
    </Button>
  )
}
