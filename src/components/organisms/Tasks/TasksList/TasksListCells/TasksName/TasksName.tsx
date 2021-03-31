import React, { memo } from 'react'
import { CheckIcon, FlexProps, Text } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'

type Props = FlexProps

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  return (
    <TasksListCell pl={10} flex={1} cursor="pointer">
      <CheckIcon isDone={false} fontSize="sm" />
      <Text ml={2} fontSize="sm" color="text.base">
        Organize components folder
      </Text>
    </TasksListCell>
  )
})
