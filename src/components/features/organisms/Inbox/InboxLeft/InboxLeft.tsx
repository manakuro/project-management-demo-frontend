import React from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const InboxLeft: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="50%" flexDirection="column" {...props} ref={ref} />
))

InboxLeft.displayName = 'InboxLeft'
