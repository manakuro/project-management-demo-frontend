import React, { memo } from 'react'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { Container } from './Container'

type Props = {
  taskColumnId: string
}

export const TaskName: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId } = props
  const { stickyStyle } = useTasksListContext()

  return (
    <Container
      ml={6}
      taskColumnId={taskColumnId}
      isFirst
      containerStyle={{ ...stickyStyle }}
    />
  )
})
TaskName.displayName = 'TaskName'
