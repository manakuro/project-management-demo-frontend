import React, { memo, useMemo } from 'react'
import { useTasksSubTaskIds } from 'src/components/organisms/Tasks/hooks'
import { useTask } from 'src/store/entities/task'
import { Component } from './Component'

type Props = {
  taskId: string
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const { taskIds } = useTasksSubTaskIds(props.taskId)
  const showExpandIcon = useMemo(
    () => !!taskIds.length && !task.taskParentId,
    [taskIds.length, task.taskParentId],
  )

  return <Component showExpandIcon={showExpandIcon} />
})
Container.displayName = 'Container'
