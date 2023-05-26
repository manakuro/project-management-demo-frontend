import React, { memo } from 'react'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'
import { LikeTaskIconButton } from 'src/components/ui/molecules'

type Props = {}

export const Like: React.FC<Props> = memo(() => {
  const { taskId } = useTaskDetail()

  return <LikeTaskIconButton taskId={taskId} show />
})
Like.displayName = 'Like'
