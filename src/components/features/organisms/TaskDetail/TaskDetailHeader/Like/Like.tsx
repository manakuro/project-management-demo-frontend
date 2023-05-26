import React, { memo } from 'react'
import { LikeTaskIconButton } from 'src/components/features/molecules/LikeTaskIconButton'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'

type Props = {}

export const Like: React.FC<Props> = memo(() => {
  const { taskId } = useTaskDetail()

  return <LikeTaskIconButton taskId={taskId} show />
})
Like.displayName = 'Like'
