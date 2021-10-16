import React, { memo } from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { useFeedListItemContext } from '../Provider'
import { ContentAttachment } from './ContentAttachment'
import { ContentText } from './ContentText'

type Props = {}

export const Content: React.VFC<Props> = memo<Props>(() => {
  return (
    <Flex mt={2} flexDirection="column">
      <Component />
    </Flex>
  )
})
const Component: React.VFC<Props> = memo<Props>(() => {
  const { attachmentIds, hasText } = useFeedListItemContext()

  return (
    <Stack flexDirection="column" flex={1} spacing={4}>
      {hasText && <ContentText />}
      <Stack spacing={4}>
        {attachmentIds.map((id) => (
          <ContentAttachment attachmentId={id} key={id} />
        ))}
      </Stack>
    </Stack>
  )
})
Component.displayName = 'Component'
Content.displayName = 'Content'
