import React, { memo } from 'react'
import { useSubTasksQuery } from 'src/hooks/queries/entities'
import { useSubtaskIds } from 'src/store/entities/task'
import { SkeletonList } from './SkeletonList'
import { TasksListSubtaskItem } from './TasksListSubtaskItem'

type Props = {
  subTaskIds: string[]
  taskId: string
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { subTaskIds, taskId } = props
  const { loading } = useSubTasksQuery({
    where: {
      idIn: subTaskIds,
    },
  })
  const { taskIds } = useSubtaskIds(taskId)

  if (loading) return <SkeletonList />

  return (
    <>
      {taskIds.map((id) => (
        <TasksListSubtaskItem key={id} taskId={id} />
      ))}
    </>
  )
})

Container.displayName = 'Container'
