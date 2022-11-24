import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  useTaskFeedIdsByTaskId,
  useTaskFeedsPinnedIds,
} from 'src/store/entities/taskFeed'
import { FeedListItem } from './FeedListItem'

type Props = {
  taskId: string
}

export const FEED_LIST_CONTAINER_ID = 'FEED_LIST_CONTAINER_ID'

export const FeedList: React.FC<Props> = memo<Props>((props) => {
  const { taskFeedIds } = useTaskFeedIdsByTaskId(props.taskId)
  const { taskFeedPinnedIds } = useTaskFeedsPinnedIds(props.taskId)
  const anyFeedIds = useMemo(
    () => !!taskFeedIds.length || !!taskFeedPinnedIds.length,
    [taskFeedIds.length, taskFeedPinnedIds.length],
  )

  return (
    <Flex
      mt={4}
      flexDirection="column"
      id={FEED_LIST_CONTAINER_ID}
      bg={anyFeedIds ? 'gray.50' : 'transparent'}
      flex={1}
    >
      {taskFeedPinnedIds.map((pinnedId) => (
        <FeedListItem
          key={pinnedId}
          taskFeedId={pinnedId}
          taskId={props.taskId}
          isPinned
        />
      ))}
      {taskFeedIds.map((id) => (
        <FeedListItem key={id} taskFeedId={id} taskId={props.taskId} />
      ))}
    </Flex>
  )
})
FeedList.displayName = 'FeedList'
