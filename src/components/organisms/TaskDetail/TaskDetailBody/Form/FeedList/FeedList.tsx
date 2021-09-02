import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import { useFeedIdsByTaskId, useFeedsPinnedIds } from 'src/store/entities/feeds'
import { FeedListItem } from './FeedListItem'

type Props = {
  taskId: string
}

export const FEED_LIST_CONTAINER_ID = 'FEED_LIST_CONTAINER_ID'

export const FeedList: React.VFC<Props> = memo<Props>((props) => {
  const { feedIds } = useFeedIdsByTaskId(props.taskId)
  const { feedPinnedIds } = useFeedsPinnedIds(props.taskId)
  const anyFeedIds = useMemo(
    () => !!feedIds.length || !!feedPinnedIds.length,
    [feedIds.length, feedPinnedIds.length],
  )

  return (
    <Flex
      mt={4}
      flexDirection="column"
      id={FEED_LIST_CONTAINER_ID}
      bg={anyFeedIds ? 'gray.50' : 'transparent'}
      flex={1}
    >
      {feedPinnedIds.map((pinnedId) => (
        <FeedListItem
          key={pinnedId}
          feedId={pinnedId}
          taskId={props.taskId}
          isPinned
        />
      ))}
      {feedIds.map((id) => (
        <FeedListItem key={id} feedId={id} taskId={props.taskId} />
      ))}
    </Flex>
  )
})
