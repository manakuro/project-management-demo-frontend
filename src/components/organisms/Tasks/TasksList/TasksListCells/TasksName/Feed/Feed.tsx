import React, { useCallback, useMemo } from 'react'
import { IconButton } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { FEED_LIST_CONTAINER_ID } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTasksRouter } from 'src/components/organisms/Tasks/hooks'
import { useFeedIdsWithoutFirstByTaskId } from 'src/store/entities/feeds'
import { Icon } from './Icon'

type Props = {}

export const Feed: React.VFC<Props> = () => {
  const { taskId } = useTasksNameContext()
  const { feedIdsWithoutFirst } = useFeedIdsWithoutFirstByTaskId(taskId)
  const size = useMemo(
    () => feedIdsWithoutFirst.length,
    [feedIdsWithoutFirst.length],
  )
  const { setScrollId } = useTaskDetail()
  const { navigateToTaskDetail } = useTasksRouter()

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
