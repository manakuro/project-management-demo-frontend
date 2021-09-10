import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'

type Props = FlexProps

export const InboxListHeader: React.FC<Props> = memo((props) => {
  const text = useMemo(() => 'Today', [])

  return (
    <Flex
      minH="36px"
      maxH="36px"
      fontSize="sm"
      px={6}
      position="sticky"
      top={0}
      left={0}
      alignItems="center"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      bg="white"
      zIndex="docked"
      transition={transitions.base()}
      {...props}
    >
      {text}
    </Flex>
  )
})

InboxListHeader.displayName = 'InboxListHeader'
