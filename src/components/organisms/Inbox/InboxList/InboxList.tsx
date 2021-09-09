import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useActivityIds } from 'src/store/app/inbox/activity/activities'
import { InboxListItem } from '../InboxListItem'

type Props = FlexProps

export const InboxList: React.FC<Props> = memo((props) => {
  const { activityIds } = useActivityIds()

  return (
    <Flex {...props} flexDirection="column" flex={1}>
      {activityIds.map((id) => (
        <InboxListItem activityId={id} key={id} />
      ))}
    </Flex>
  )
})

InboxList.displayName = 'InboxList'
