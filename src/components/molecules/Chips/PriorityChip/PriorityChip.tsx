import React, { memo, useCallback } from 'react'
import { Badge } from 'src/components/atoms'
import { useTaskPriority } from 'src/store/entities/taskPriority'

type Props = {
  taskPriorityId: string
  onDelete?: () => void
  onClick?: () => void
  disableStopPropagation?: boolean
}

export const PriorityChip: React.VFC<Props> = memo((props) => {
  const { taskPriorityId, onClick, disableStopPropagation } = props
  const { taskPriority } = useTaskPriority(taskPriorityId)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!disableStopPropagation) {
        e.stopPropagation()
      }
      onClick?.()
    },
    [onClick, disableStopPropagation],
  )

  if (!taskPriorityId) return null

  return (
    <Badge
      h={5}
      variant="solid"
      bg={taskPriority.color.color}
      textAlign="center"
      fontWeight="medium"
      lineHeight={1.7}
      onClick={handleClick}
    >
      {taskPriority.name}
    </Badge>
  )
})
PriorityChip.displayName = 'PriorityChip'
