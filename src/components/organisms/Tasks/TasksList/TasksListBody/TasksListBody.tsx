import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksListBody } from 'src/pages/MyTasks/List/useTasksListBody'

type Props = {}

const maxH = 72 + 62 + 37
export const TasksListBody: React.FC<Props> = memo<Props>((props) => {
  const { id } = useTasksListBody()
  return (
    <Flex
      id={id}
      flex={1}
      flexDirection="column"
      maxH={`calc(100vh - ${maxH}px)`}
      pb={20}
      position="relative"
      {...props}
    />
  )
})
TasksListBody.displayName = 'TasksListBody'
