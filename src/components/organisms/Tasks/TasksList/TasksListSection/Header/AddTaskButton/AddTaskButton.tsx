import React, { memo, useCallback } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useTasksTask } from 'src/components/organisms/Tasks/hooks'

type Props = {
  taskSectionId: string
}

export const AddTaskButton: React.FC<Props> = memo((props) => {
  const { addTask } = useTasksTask()

  const handleClick = useCallback(() => {
    addTask({ taskSectionId: props.taskSectionId })
  }, [addTask, props.taskSectionId])

  return (
    <Tooltip
      hasArrow
      label="Add a task to this section"
      aria-label="Add task button"
      size="sm"
      openDelay={500}
    >
      <IconButton
        aria-label="Add task button"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={handleClick}
      />
    </Tooltip>
  )
})
AddTaskButton.displayName = 'AddTaskButton'
