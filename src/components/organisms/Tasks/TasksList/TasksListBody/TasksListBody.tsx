import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksListBody } from 'src/pages/MyTasks/List/useTasksListBody'

type Props = {}

export const TasksListBody: React.FC<Props> = memo<Props>((props) => {
  const { id } = useTasksListBody()
  return (
    <Flex
      id={id}
      flex={1}
      flexDirection="column"
      pb={4}
      position="relative"
      {...props}
    />
  )
})
TasksListBody.displayName = 'TasksListBody'
