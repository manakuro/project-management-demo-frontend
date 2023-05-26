import React, { memo, useMemo } from 'react'
import { useTask } from 'src/store/entities/task'
import { useSubtaskIds } from 'src/store/entities/task'
import { Component } from './Component'

type Props = {
  taskId: string
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const { taskIds } = useSubtaskIds(props.taskId)
  const showExpandIcon = useMemo(
    () => !!taskIds.length && !task.taskParentId,
    [taskIds.length, task.taskParentId],
  )

  return <Component showExpandIcon={showExpandIcon} />
})
Container.displayName = 'Container'
