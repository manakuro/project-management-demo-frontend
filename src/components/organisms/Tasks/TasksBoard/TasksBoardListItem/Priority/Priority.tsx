import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { PriorityChip } from 'src/components/molecules'
import { useTask } from 'src/store/entities/task'

type Props = FlexProps & {
  taskId: string
}

export const Priority: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)

  return (
    <PriorityChip taskPriorityId={task.taskPriorityId} disableStopPropagation />
  )
})
Priority.displayName = 'Priority'
