import React from 'react'
import { LikeTaskButton } from 'src/components/molecules'
import { useTasksListDetail } from 'src/components/organisms'

type Props = {}

export const Like: React.FC<Props> = () => {
  const { taskId } = useTasksListDetail()

  return <LikeTaskButton taskId={taskId} show />
}
