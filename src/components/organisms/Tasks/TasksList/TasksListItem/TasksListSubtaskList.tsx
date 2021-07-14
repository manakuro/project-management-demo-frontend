import React, { memo } from 'react'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { useTasksListItemContext } from './Provider'
import { TasksListSubtaskItem } from './TasksListSubtaskItem'

type Props = {
  taskId: string
}

export const TasksListSubtaskList: React.FC<Props> = memo<Props>((props) => {
  const { useSubtaskList } = useTasksListItemContext()
  const { isSubtaskExpanded } = useSubtaskList()
  const { taskIds } = useTaskIdsByTaskParentId(props.taskId)

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
