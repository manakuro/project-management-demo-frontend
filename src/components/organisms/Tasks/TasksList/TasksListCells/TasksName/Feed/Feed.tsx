import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms'
import { FEED_LIST_CONTAINER_ID } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useRouter } from 'src/router'
import { useTasksFeedIds } from 'src/store/entities/tasks/feedIds'
import { Icon } from './Icon'

type Props = {}

export const Feed: React.VFC<Props> = () => {
  const { taskId } = useTasksNameContext()
  const { feedIdsWithoutFirst } = useTasksFeedIds(taskId)
  const size = useMemo(
    () => feedIdsWithoutFirst.length,
    [feedIdsWithoutFirst.length],
  )
  const { setScrollId } = useTaskDetail()
  const { navigateToTaskDetail } = useRouter()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setScrollId(FEED_LIST_CONTAINER_ID)
      await navigateToTaskDetail(taskId)
    },
    [navigateToTaskDetail, setScrollId, taskId],
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
