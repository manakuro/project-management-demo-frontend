import React, { useMemo } from 'react'
import { LikeTaskButton } from 'src/components/molecules'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskLikesByTaskId } from 'src/store/entities/taskLikes'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { taskId } = useTasksName()
  const { taskLikes } = useTaskLikesByTaskId(taskId)
  const show = useMemo(() => !!taskLikes.length, [taskLikes.length])

  return <LikeTaskButton taskId={taskId} show={show} />
}
