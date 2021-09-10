import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useInboxListContentVerticalScroll } from '../InboxListContent'

type Props = FlexProps

export const InboxListHeader: React.FC<Props> = memo((props) => {
  const { isScrolling } = useInboxListContentVerticalScroll()
  const text = useMemo(() => 'Today', [])
  const style = useMemo(
    (): FlexProps => ({
      ...(isScrolling ? { boxShadow: 'sm' } : {}),
    }),
    [isScrolling],
  )

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
      {...style}
      {...props}
    >
      {text}
    </Flex>
  )
})

InboxListHeader.displayName = 'InboxListHeader'
