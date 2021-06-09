import React, { memo } from 'react'
import { Text, TextProps } from 'src/components/atoms'
import { formatCreatedAt } from 'src/shared/date'
import { useFeedListItem } from '../Provider'

type Props = TextProps

export const CreateAt: React.VFC<Props> = memo<Props>(() => {
  const { feed } = useFeedListItem()
  return (
    <Text fontSize="xs" color="text.muted" ml={2}>
      {formatCreatedAt(feed.createdAt)}
      {feed.updatedAt ? ' (edited)' : ''}
    </Text>
  )
})
CreateAt.displayName = 'CreateAt'
