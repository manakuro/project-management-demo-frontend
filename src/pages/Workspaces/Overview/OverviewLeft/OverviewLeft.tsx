import React from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps

export const OverviewLeft: React.FC<Props> = forwardRef((props, ref) => (
  <Flex
    flex={1}
    flexDirection="column"
    w="258px"
    maxW="258px"
    {...props}
    ref={ref}
  />
))

OverviewLeft.displayName = 'OverviewLeft'