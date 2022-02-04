import React, { memo } from 'react'
import { Text, TextProps } from 'src/components/atoms'
import { formatFeedCreatedAt } from 'src/shared/date'
import { useTaskFeedListItemContext } from '../Provider'

type Props = TextProps

export const CreateAt: React.VFC<Props> = memo<Props>(() => {
  const { taskFeed } = useTaskFeedListItemContext()
  return (
    <Text fontSize="xs" color="text.muted" ml={2}>
      {formatFeedCreatedAt(taskFeed.createdAt)}
      {taskFeed.updatedAt ? ' (edited)' : ''}
    </Text>
  )
})
CreateAt.displayName = 'CreateAt'
