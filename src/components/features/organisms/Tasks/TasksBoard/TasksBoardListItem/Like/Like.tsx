import type React from 'react'
import { memo, useMemo } from 'react'
import { LikeTaskIconButton } from 'src/components/features/molecules/LikeTaskIconButton'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLike'
import { useTasksBoardListItemContext } from '../Provider'

type Props = {
  taskId: string
}

export const Like: React.FC<Props> = memo((props) => {
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
