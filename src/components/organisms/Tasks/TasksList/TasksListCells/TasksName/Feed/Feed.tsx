import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useRouter } from 'src/router'
import { useTasksFeedIds } from 'src/store/entities/tasks/feedIds'
import { Icon } from './Icon'

type Props = {}

export const Feed: React.VFC<Props> = () => {
  const { taskId } = useTasksName()
  const { feedIds } = useTasksFeedIds(taskId)
  const size = useMemo(() => feedIds.length, [feedIds.length])
  const { navigateToTaskDetailFeed } = useRouter()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      await navigateToTaskDetailFeed(taskId, feedIds[0])
    },
    [feedIds, navigateToTaskDetailFeed, taskId],
  )

  if (!size) return null

  return (
    <IconButton
      aria-label="The number of feed"
      icon={<Icon size={size} />}
      variant="ghost"
      size="xs"
      h={5}
      onClick={handleClick}
    />
  )
}
