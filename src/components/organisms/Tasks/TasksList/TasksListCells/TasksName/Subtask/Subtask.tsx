import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Icon } from './Icon'

type Props = {}

export const Subtask: React.VFC<Props> = () => {
  const { taskId } = useTasksName()
  const { taskIds } = useTaskIdsByTaskParentId(taskId)
  const size = useMemo(() => taskIds.length, [taskIds.length])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('click Subtask!')
  }, [])

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
