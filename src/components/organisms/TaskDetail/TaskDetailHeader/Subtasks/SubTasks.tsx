import React, { useCallback } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useTasksSubTask } from 'src/components/organisms/Tasks/hooks'

type Props = {
  taskId: string
}

export const SubTasks: React.FC<Props> = (props) => {
  const { addTask } = useTasksSubTask()

  const handleAddSubtask = useCallback(async () => {
    await addTask({ taskParentId: props.taskId })
  }, [addTask, props.taskId])

  return (
    <Tooltip
      hasArrow
      label="Add a task to this task. SubTasks can have different assignees and due date"
      aria-label="Subtasks button description"
      size="md"
      textAlign="left"
    >
      <IconButton
        aria-label="Subtasks button"
        icon={<Icon icon="subdirectoryRight" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={handleAddSubtask}
      />
    </Tooltip>
  )
}
