import React, { memo, useMemo } from 'react'
import { LikeTaskIconButton } from 'src/components/molecules'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLike'

type Props = {
  taskId: string
}

export const Like: React.FC<Props> = memo((props) => {
  const { taskId } = props
  const { taskLikes } = useTaskLikesByTaskId(taskId)
  const show = useMemo(() => !!taskLikes.length, [taskLikes.length])

  return (
    <LikeTaskIconButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: 0 }}
    />
  )
})
Like.displayName = 'Like'
