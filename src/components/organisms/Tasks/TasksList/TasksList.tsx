import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const TasksList: React.FC<Props> = forwardRef((props, ref) => (
  <Flex flex={1} flexDirection="column" {...props} ref={ref} />
))
