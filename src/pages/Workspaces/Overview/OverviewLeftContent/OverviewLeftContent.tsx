import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const OverviewLeftContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" px={4} flexDirection="column" {...props} />
})

OverviewLeftContent.displayName = 'OverviewLeftContent'
