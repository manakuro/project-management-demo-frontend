import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const OverviewRight: React.FC<Props> = forwardRef((props, ref) => (
  <Flex w="400px" maxW="400px" flexDirection="column" {...props} ref={ref} />
))

OverviewRight.displayName = 'OverviewRight'
