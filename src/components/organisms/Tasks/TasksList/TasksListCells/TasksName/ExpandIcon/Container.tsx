import React, { memo, useMemo } from 'react'
import { useTask, useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Component } from './Component'

type Props = {
  taskId: string
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const { taskIds } = useTaskIdsByTaskParentId(props.taskId)
  const showExpandIcon = useMemo(
    () => !!taskIds.length && !task.taskParentId,
    [taskIds.length, task.taskParentId],
  )

  return <Component showExpandIcon={showExpandIcon} />
})
Container.displayName = 'Container'
