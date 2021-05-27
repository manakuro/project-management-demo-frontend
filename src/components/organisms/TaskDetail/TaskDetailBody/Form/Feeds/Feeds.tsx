import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useFeedsByTask, useFeedsPinnedIds } from 'src/store/feeds'
import { FeedListItem } from './FeedListItem'

type Props = {
  taskId: string
}

export const Feeds: React.VFC<Props> = memo<Props>((props) => {
  const { feedIds } = useFeedsByTask(props.taskId)
  const { feedPinnedIds } = useFeedsPinnedIds(props.taskId)

  return (
    <Flex mt={4} flexDirection="column">
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
