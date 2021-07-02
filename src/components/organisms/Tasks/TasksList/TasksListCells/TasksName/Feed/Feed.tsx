import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTasksFeedIds } from 'src/store/entities/tasks/feedIds'
import { Icon } from './Icon'

type Props = {}

export const Feed: React.VFC<Props> = () => {
  const { taskId } = useTasksName()
  const { feedIds } = useTasksFeedIds(taskId)
  const feedSize = useMemo(() => feedIds.length, [feedIds.length])

  const handleClick = useCallback(() => {}, [])

  if (!feedSize) return null

  return (
    <IconButton
      aria-label="Like this"
      icon={<Icon size={feedSize} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  )
}
