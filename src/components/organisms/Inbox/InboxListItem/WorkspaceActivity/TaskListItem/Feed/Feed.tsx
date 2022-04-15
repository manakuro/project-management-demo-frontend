import React, { useMemo } from 'react'
import { Flex, Icon as AtomsIcon, Text } from 'src/components/atoms'
import { useTaskFeedIdsWithoutFirstByTaskId } from 'src/store/entities/taskFeed'

type Props = {
  taskId: string
}

export const Feed: React.VFC<Props> = (props) => {
  const { taskId } = props
  const { taskFeedIdsWithoutFirst } = useTaskFeedIdsWithoutFirstByTaskId(taskId)
  const size = useMemo(
    () => taskFeedIdsWithoutFirst.length,
    [taskFeedIdsWithoutFirst.length],
  )

  if (!size) return null

  return (
    <Flex alignItems="center" justifyContent="center" h={5}>
      <Text fontSize="xs" color="text.muted">
        {size}
      </Text>
      <AtomsIcon icon="messageRounded" color="text.muted" ml={1} />
    </Flex>
  )
}
