import React, { memo } from 'react'
import { PriorityChip } from 'src/components/features/molecules/Chips'
import { FlexProps } from 'src/components/ui/atoms'
import { useTask } from 'src/store/entities/task'

type Props = FlexProps & {
  taskId: string
}

export const Priority: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)

  return (
    <PriorityChip taskPriorityId={task.taskPriorityId} disableStopPropagation />
  )
})
Priority.displayName = 'Priority'
