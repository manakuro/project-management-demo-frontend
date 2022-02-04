import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { PriorityChip } from 'src/components/molecules'

type Props = FlexProps & {
  taskId: string
}

export const Priority: React.VFC<Props> = memo<Props>((props) => {
  const { taskId } = props

  return <PriorityChip taskId={taskId} disableStopPropagation />
})
Priority.displayName = 'Priority'
