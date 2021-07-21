import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const RightItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex minW={6} justifyContent="center" alignItems="center" {...props} />
  )
})
