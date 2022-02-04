import React, { memo, useMemo } from 'react'
import { LikeTaskIconButton } from 'src/components/molecules'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLike'
import { useTasksBoardListItemContext } from '../Provider'

type Props = {
  taskId: string
}

export const Like: React.VFC<Props> = memo((props) => {
  const { taskId } = props
  const { taskLikes } = useTaskLikesByTaskId(taskId)
  const { isHovering } = useTasksBoardListItemContext()
  const show = useMemo(() => {
    if (taskLikes.length) return true
    return isHovering
  }, [isHovering, taskLikes.length])

  return (
    <LikeTaskIconButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: '1px' }}
    />
  )
})
Like.displayName = 'Like'
