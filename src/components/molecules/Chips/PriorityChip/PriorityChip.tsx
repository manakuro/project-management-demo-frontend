import React, { memo, useCallback } from 'react'
import { Badge } from 'src/components/atoms'
import {
  TasksPriorityTypes,
  useTasksPriority,
} from 'src/store/entities/tasksPriorities'

type Props = {
  taskPriorityType: TasksPriorityTypes
  onDelete?: () => void
  onClick?: () => void
  disableStopPropagation?: boolean
}

export const PriorityChip: React.VFC<Props> = memo((props) => {
  const { taskPriorityType, onClick, disableStopPropagation } = props
  const { taskPriority } = useTasksPriority(taskPriorityType)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!disableStopPropagation) {
        e.stopPropagation()
      }
      onClick?.()
    },
    [onClick, disableStopPropagation],
  )

  if (!taskPriority) return null

  return (
    <Badge
      h={5}
      variant="solid"
      bg={taskPriority.color}
      textAlign="center"
      fontWeight="medium"
      lineHeight={1.7}
      onClick={handleClick}
    >
      {taskPriority.text}
    </Badge>
  )
})
PriorityChip.displayName = 'PriorityChip'
