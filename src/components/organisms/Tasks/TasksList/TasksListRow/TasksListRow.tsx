import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = FlexProps

export const TasksListRow: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverStyle } = useClickableHoverStyle()

  return <Flex {...clickableHoverStyle} cursor="auto" h="36px" {...props} />
})
