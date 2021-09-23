import React from 'react'
import { LikeTaskIconButton } from 'src/components/molecules'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'

type Props = {}

export const Like: React.FC<Props> = () => {
  const { taskId } = useTaskDetail()

  return <LikeTaskIconButton taskId={taskId} show />
}
