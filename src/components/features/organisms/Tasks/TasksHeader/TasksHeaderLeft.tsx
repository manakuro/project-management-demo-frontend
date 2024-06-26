import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const TasksHeaderLeft: React.FC<Props> = memo<Props>((props) => {
  return <Flex flex={1} {...props} />
})
TasksHeaderLeft.displayName = 'TasksHeaderLeft'
