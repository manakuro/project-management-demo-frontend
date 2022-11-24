import React, { memo } from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { useTaskFeedListItemContext } from '../Provider'
import { ContentAttachment } from './ContentAttachment'
import { ContentText } from './ContentText'

type Props = {}

export const Content: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex mt={2} flexDirection="column">
      <Component />
    </Flex>
  )
})
const Component: React.FC<Props> = memo<Props>(() => {
  const { taskFileIds, hasText } = useTaskFeedListItemContext()

  return (
    <Stack flexDirection="column" flex={1} spacing={4}>
      {hasText && <ContentText />}
      <Stack spacing={4}>
        {taskFileIds.map((id) => (
          <ContentAttachment taskFileId={id} key={id} />
        ))}
      </Stack>
    </Stack>
  )
})
Component.displayName = 'Component'
Content.displayName = 'Content'
