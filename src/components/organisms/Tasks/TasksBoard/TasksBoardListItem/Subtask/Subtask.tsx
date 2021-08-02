import React, { memo, useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms'
import { SUBTASK_LIST_CONTAINER_ID } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Subtasks'
import { useRouter } from 'src/router'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Icon } from './Icon'

type Props = {
  taskId: string
}

export const Subtask: React.VFC<Props> = memo((props) => {
  const { taskId } = props
  const { taskIds } = useTaskIdsByTaskParentId(taskId)
  const size = useMemo(() => taskIds.length, [taskIds.length])
  const { setScrollId } = useTaskDetail()
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
})
Subtask.displayName = 'Subtask'
