import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMainStyle } from 'src/hooks'

type Props = FlexProps

export const TasksHeader: React.FC<Props> = memo<Props>((props) => {
  const { paddingX } = useMainStyle()

  return <Flex maxH="60px" px={paddingX} py={4} {...props} />
})
