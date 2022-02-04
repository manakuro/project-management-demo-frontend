import React, { memo, useCallback } from 'react'
import { Badge } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
  onDelete?: () => void
  onClick?: () => void
  disableStopPropagation?: boolean
}

export const PriorityChip: React.VFC<Props> = memo((props) => {
  const { taskId, onClick, disableStopPropagation } = props
  const { task } = useTask(taskId)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!disableStopPropagation) {
        e.stopPropagation()
      }
      onClick?.()
    },
    [onClick, disableStopPropagation],
  )

  if (!task.taskPriority) return null

  return (
    <Badge
      h={5}
      variant="solid"
      bg={task.taskPriority.color.color}
      textAlign="center"
      fontWeight="medium"
      lineHeight={1.7}
      onClick={handleClick}
    >
      {task.taskPriority.name}
    </Badge>
  )
})
PriorityChip.displayName = 'PriorityChip'
