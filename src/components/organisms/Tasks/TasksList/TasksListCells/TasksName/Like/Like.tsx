import React, { useMemo } from 'react'
import { LikeTaskIconButton } from 'src/components/molecules'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLike'
import { useTasksNameContext } from '../TasksNameProvider'

type Props = {}

export const Like: React.FC<Props> = () => {
  const { taskId } = useTasksNameContext()
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
}
