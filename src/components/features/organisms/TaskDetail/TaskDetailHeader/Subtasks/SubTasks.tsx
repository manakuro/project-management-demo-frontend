import type React from 'react'
import { memo, useCallback } from 'react'
import { Icon, IconButton } from 'src/components/ui/atoms'
import { Tooltip } from 'src/components/ui/molecules'
import { useTaskCommand } from 'src/store/entities/task'

type Props = {
  taskId: string
}

export const SubTasks: React.FC<Props> = memo((props) => {
  const { addSubtask } = useTaskCommand()

  const handleAddSubtask = useCallback(async () => {
    await addSubtask({ taskParentId: props.taskId })
  }, [addSubtask, props.taskId])

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
})
SubTasks.displayName = 'SubTasks'
