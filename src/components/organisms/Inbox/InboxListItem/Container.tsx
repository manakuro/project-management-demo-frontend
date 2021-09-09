import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useInboxListItemContext } from './Provider'

type Props = FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useInboxListItemContext()

  return (
    <Flex
      maxW="inherit"
      ref={ref}
      flex={1}
      px={6}
      transition={transitions.base()}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      cursor="pointer"
      _hover={{
        borderColor: 'gray.300',
      }}
      {...props}
    />
  )
})

Container.displayName = 'Container'
