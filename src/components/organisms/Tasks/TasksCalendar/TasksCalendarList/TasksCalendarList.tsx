import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'

type Props = FlexProps

export const TasksCalendarList: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex flex={1} flexDirection="column">
      hey
    </Flex>
  )
})
TasksCalendarList.displayName = 'TasksCalendarList'
