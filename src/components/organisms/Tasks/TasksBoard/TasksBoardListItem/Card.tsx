import React, { memo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { transitions } from 'src/styles'

type Props = FlexProps

export const Card: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex
      flexDirection="column"
      minH="91px"
      w="full"
      bg="white"
      border={1}
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="md"
      mt={2}
      _hover={{
        borderColor: 'gray.300',
        boxShadow: 'sm',
      }}
      cursor="pointer"
      transition={transitions.base()}
      p={4}
      {...props}
    />
  )
})
Card.displayName = 'Card'
