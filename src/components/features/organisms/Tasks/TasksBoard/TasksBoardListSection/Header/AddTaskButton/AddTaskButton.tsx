import React, { memo, useCallback } from 'react'
import { useTasksTask } from 'src/components/features/organisms/Tasks/hooks'
import { Icon, IconButton } from 'src/components/ui/atoms'
import { Tooltip } from 'src/components/ui/molecules'
import { useTooltip } from 'src/components/ui/molecules/Tooltip/useTooltip'

type Props = {
  taskSectionId: string
}

export const AddTaskButton: React.FC<Props> = memo((props) => {
  const { ref, isOpen, onClose } = useTooltip()
  const { addTask } = useTasksTask()

  const handleClick = useCallback(async () => {
    onClose()
    addTask({ taskSectionId: props.taskSectionId })
  }, [addTask, onClose, props.taskSectionId])

  return (
    <Tooltip
      hasArrow
      label="Add task"
      aria-label="Add task button"
      isOpen={isOpen}
    >
      <IconButton
        ref={ref}
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
