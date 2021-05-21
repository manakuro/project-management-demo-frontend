import React, { memo } from 'react'
import { Text, TextProps } from 'src/components/atoms'
import { useFeedListItem } from '../Provider'
import { Teammate } from 'src/store/teammates'
import { Feed } from 'src/store/feeds'

type Props = TextProps

const generateTitle = ({
  teammate,
  feed,
}: {
  teammate: Teammate
  feed: Feed
}): string => {
  switch (true) {
    case feed.isFirst:
      return `${teammate.name} created this task.`
    default:
      return teammate.name
  }
}

export const Title: React.VFC<Props> = memo<Props>((props) => {
  const { teammate, feed } = useFeedListItem()
  const title = generateTitle({ teammate, feed })

  return (
    <Text fontSize="sm" fontWeight="medium" ml={2} {...props}>
      {title}
    </Text>
  )
})
Title.displayName = 'Title'
