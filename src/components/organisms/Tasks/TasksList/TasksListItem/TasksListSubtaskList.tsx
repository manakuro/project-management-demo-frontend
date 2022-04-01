import React, { memo } from 'react'
import { useSubtaskIds } from 'src/store/entities/task'
import { useSubtaskListContext } from './Provider'
import { TasksListSubtaskItem } from './TasksListSubtaskItem'

type Props = {
  taskId: string
}

export const TasksListSubtaskList: React.FC<Props> = memo<Props>((props) => {
  const { isSubtaskExpanded } = useSubtaskListContext()
  const { taskIds } = useSubtaskIds(props.taskId)

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
