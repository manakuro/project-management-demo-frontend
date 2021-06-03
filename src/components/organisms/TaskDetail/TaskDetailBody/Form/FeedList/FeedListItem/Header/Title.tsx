import React, { memo } from 'react'
import { Flex, Icon, Text, TextProps } from 'src/components/atoms'
import { useFeedListItem } from '../Provider'
import { Teammate } from 'src/store/entities/teammates'
import { Feed } from 'src/store/entities/feeds'

type Props = TextProps

const generateTitle = (
  {
    teammate,
    feed,
  }: {
    teammate: Teammate
    feed: Feed
  },
  { hasAttachment }: { hasAttachment: boolean },
): React.ReactElement => {
  switch (true) {
    case feed.isFirst:
      return <Text>{`${teammate.name} created this task.`}</Text>
    case Boolean(hasAttachment): {
      return (
        <Flex flex={1} alignItems="center">
          <Icon icon="attach" color="text.muted" />
          <Text ml={1}>attached</Text>
        </Flex>
      )
    }
    default:
      return <Text>{teammate.name}</Text>
  }
}

export const Title: React.VFC<Props> = memo<Props>((props) => {
  const { teammate, feed, hasAttachment } = useFeedListItem()
  const title = generateTitle({ teammate, feed }, { hasAttachment })

  return (
    <Flex fontSize="sm" fontWeight="medium" ml={2} {...props}>
      {title}
    </Flex>
  )
})
Title.displayName = 'Title'
