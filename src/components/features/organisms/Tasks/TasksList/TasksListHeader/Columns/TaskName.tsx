import React, { memo } from 'react'
import { useTasksListContext } from 'src/components/features/organisms/Tasks/TasksList/Provider'
import { Container } from './Container'

type Props = {
  tasksTaskColumnId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { stickyStyle } = useTasksListContext()

  return (
    <Container
      ml={6}
      tasksTaskColumnId={tasksTaskColumnId}
      isFirst
      containerStyle={{ ...stickyStyle }}
    />
  )
})
TaskName.displayName = 'TaskName'
