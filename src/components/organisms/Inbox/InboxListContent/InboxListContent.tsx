import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useInboxListContentRef } from './useInboxListContentRef'
import { useInboxListContentVerticalScroll } from './useInboxListContentVerticalScroll'

type Props = FlexProps

const maxH = 72 + 57
export const InboxListContent: React.FC<Props> = memo((props) => {
  const { ref } = useInboxListContentRef()

  useInboxListContentVerticalScroll({ listenOnEvent: true })

  return (
    <Flex
      maxH={`calc(100vh - ${maxH}px)`}
      h="full"
      overflowY="scroll"
      flexDirection="column"
      {...props}
      ref={ref}
    />
  )
})

InboxListContent.displayName = 'InboxListContent'