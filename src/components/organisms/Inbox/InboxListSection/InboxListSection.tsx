import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { InboxListHeader } from '../InboxListHeader'
import { InboxListItem } from '../InboxListItem'

type Props = FlexProps & {
  activityIds: string[]
  sectionText: string
}

export const InboxListSection: React.FC<Props> = memo<Props>((props) => {
  const { activityIds, sectionText, ...rest } = props

  if (!activityIds.length) return null

  return (
    <Flex flexDirection="column" flex={1} {...rest}>
      <InboxListHeader>{sectionText}</InboxListHeader>
      {activityIds.map((id) => (
        <InboxListItem activityId={id} key={id} />
      ))}
    </Flex>
  )
})

InboxListSection.displayName = 'InboxListSection'
