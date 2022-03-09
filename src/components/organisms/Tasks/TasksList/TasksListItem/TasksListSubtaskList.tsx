import React, { memo } from 'react'
import { useTasksSubTaskIds } from 'src/components/organisms/Tasks/hooks'
import { useSubtaskListContext } from './Provider'
import { TasksListSubtaskItem } from './TasksListSubtaskItem'

type Props = {
  taskId: string
}

export const TasksListSubtaskList: React.FC<Props> = memo<Props>((props) => {
  const { isSubtaskExpanded } = useSubtaskListContext()
  const { taskIds } = useTasksSubTaskIds(props.taskId)

  if (!isSubtaskExpanded || !taskIds.length) return null

  return (
    <>
      {taskIds.map((id) => (
        <TasksListSubtaskItem key={id} taskId={id} />
      ))}
    </>
  )
})
TasksListSubtaskList.displayName = 'TasksListSubtaskList'
