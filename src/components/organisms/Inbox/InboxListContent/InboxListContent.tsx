import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

const maxH = 72 + 57
export const InboxListContent: React.FC<Props> = forwardRef((props, ref) => (
  <Flex
    maxH={`calc(100vh - ${maxH}px)`}
    h="full"
    overflowY="scroll"
    flexDirection="column"
    {...props}
    ref={ref}
  />
))

InboxListContent.displayName = 'InboxListContent'
