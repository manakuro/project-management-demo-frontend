import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const OverviewRightContent: React.FC<Props> = memo((props) => {
  return <Flex h="full" flexDirection="column" {...props} />
})

OverviewRightContent.displayName = 'OverviewRightContent'
