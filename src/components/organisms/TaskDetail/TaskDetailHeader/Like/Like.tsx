import React from 'react'
import { LikeTaskButton } from 'src/components/molecules'
import { useTaskDetail } from 'src/components/organisms'

type Props = {}

export const Like: React.FC<Props> = () => {
  const { taskId } = useTaskDetail()

  return <LikeTaskButton taskId={taskId} show />
}
