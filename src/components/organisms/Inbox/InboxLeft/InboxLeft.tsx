import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const InboxLeft: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="50%" {...props} ref={ref} />
))

InboxLeft.displayName = 'InboxLeft'
