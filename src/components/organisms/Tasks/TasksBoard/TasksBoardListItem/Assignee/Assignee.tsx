import React, { memo } from 'react'
import { AssigneeIconMenu } from 'src/components/organisms/Menus'
import { useTasksContext } from 'src/components/organisms/Tasks'
import { useTask } from 'src/store/entities/tasks'
import { useAssignee } from './useAssignee'

type Props = {
  taskId: string
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)
  const { onAssigneeClosed, onAssigneeOpened, showIcon } = useAssignee()
  const { isMyTasksPage } = useTasksContext()

  if (isMyTasksPage) return null

  return (
    <AssigneeIconMenu
      taskId={taskId}
      assigneeId={task.assigneeId}
      onAssigneeClosed={onAssigneeClosed}
      onAssigneeOpened={onAssigneeOpened}
      showIcon={showIcon}
    />
  )
})
Assignee.displayName = 'Assignee'
