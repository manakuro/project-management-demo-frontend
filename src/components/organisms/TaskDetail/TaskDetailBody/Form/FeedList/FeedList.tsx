import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useFeedsByTask, useFeedsPinnedIds } from 'src/store/entities/feeds'
import { FeedListItem } from './FeedListItem'

type Props = {
  taskId: string
}

export const FEED_LIST_CONTAINER_ID = 'FEED_LIST_CONTAINER_ID'

export const FeedList: React.VFC<Props> = memo<Props>((props) => {
  const { feedIds } = useFeedsByTask(props.taskId)
  const { feedPinnedIds } = useFeedsPinnedIds(props.taskId)

  return (
    <Flex mt={4} flexDirection="column" id={FEED_LIST_CONTAINER_ID}>
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
