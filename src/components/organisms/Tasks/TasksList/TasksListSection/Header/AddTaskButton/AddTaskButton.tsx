import React, { memo, useCallback } from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useTooltip } from 'src/components/molecules/Tooltip/useTooltip'
import { useMyTask } from 'src/store/app/myTasks'

type Props = {
  taskSectionId: string
}

export const AddTaskButton: React.FC<Props> = memo((props) => {
  const { ref, isOpen, onClose } = useTooltip({ openDelay: 250 })
  const { addTask } = useMyTask(props.taskSectionId)

  const handleClick = useCallback(async () => {
    onClose()
    await addTask()
  }, [addTask, onClose])

  return (
    <Tooltip
      hasArrow
      label="Add a task to this section"
      aria-label="Add task button"
      size="lg"
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
