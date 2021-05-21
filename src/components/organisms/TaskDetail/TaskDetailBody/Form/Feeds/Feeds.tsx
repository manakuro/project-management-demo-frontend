import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useFeedsByTask } from 'src/store/feeds'
import { Feed } from './Feed'

type Props = {
  taskId: string
}

export const Feeds: React.VFC<Props> = memo<Props>((props) => {
  const { feedIds } = useFeedsByTask(props.taskId)

  return (
    <Flex mt={4} bg="gray.50" flexDirection="column">
      {feedIds.map((id) => (
        <Feed key={id} feedId={id} />
      ))}
    </Flex>
  )
})
