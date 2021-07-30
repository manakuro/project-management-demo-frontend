import React, { memo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useTasksBoardListItemContext } from './Provider'

type Props = FlexProps

export const Card: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTasksBoardListItemContext()
  return (
    <Flex
      ref={ref}
      flexDirection="column"
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
