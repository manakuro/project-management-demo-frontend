import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTasksListDetail } from 'src/components/organisms'
import { SUBTASK_LIST_CONTAINER_ID } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Subtasks'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useRouter } from 'src/router'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Icon } from './Icon'

type Props = {}

export const Subtask: React.VFC<Props> = () => {
  const { taskId } = useTasksName()
  const { taskIds } = useTaskIdsByTaskParentId(taskId)
  const size = useMemo(() => taskIds.length, [taskIds.length])
  const { setScrollId } = useTasksListDetail()
  const { navigateToTaskDetail } = useRouter()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setScrollId(SUBTASK_LIST_CONTAINER_ID)
      await navigateToTaskDetail(taskId)
    },
    [navigateToTaskDetail, setScrollId, taskId],
  )

  if (!size) return null

  return (
    <IconButton
      aria-label="The number of subtask"
      icon={<Icon size={size} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  )
}
