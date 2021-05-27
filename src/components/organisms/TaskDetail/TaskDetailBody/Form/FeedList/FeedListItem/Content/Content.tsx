import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useFeedListItem } from '../Provider'
import { ContentText } from './ContentText'
import { ContentAttachment } from './ContentAttachment'
import { FEED_TYPE_ATTACHMENT, FEED_TYPE_TEXT } from 'src/store/feeds/types'

type Props = {}

export const Content: React.VFC<Props> = memo<Props>(() => {
  return (
    <Flex mt={2} flexDirection="column">
      <Component />
    </Flex>
  )
})
const Component: React.VFC<Props> = memo<Props>(() => {
  const { feed } = useFeedListItem()

  switch (feed.type) {
    case FEED_TYPE_TEXT:
      return <ContentText />
    case FEED_TYPE_ATTACHMENT:
      return <ContentAttachment />
  }
})
Content.displayName = 'Content'
