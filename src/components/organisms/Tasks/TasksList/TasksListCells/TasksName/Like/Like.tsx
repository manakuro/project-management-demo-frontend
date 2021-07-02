import React, { useMemo } from 'react'
import { LikeTaskButton } from 'src/components/molecules'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLikes'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { taskId } = useTasksNameContext()
  const { taskLikes } = useTaskLikesByTaskId(taskId)
  const show = useMemo(() => !!taskLikes.length, [taskLikes.length])

  return (
    <LikeTaskButton
      taskId={taskId}
      show={show}
      size="xs"
      h={5}
      textStyle={{ mt: 0 }}
    />
  )
}
