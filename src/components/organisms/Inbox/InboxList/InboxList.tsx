import React, { memo, useEffect } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { isInboxDetailURL, useRouter } from 'src/router'
import { useActivityIds } from 'src/store/app/inbox/activity/activities'
import { InboxListItem } from '../InboxListItem'

type Props = FlexProps

export const InboxList: React.FC<Props> = memo((props) => {
  const { activityIds } = useActivityIds()
  const { router } = useRouter()
  const { setId } = useTaskDetail()

  useEffect(() => {
    if (isInboxDetailURL(router)) return

    setId('1')
  }, [router, setId])

  return (
    <Flex {...props} flexDirection="column" flex={1} maxWidth="full">
      {activityIds.map((id) => (
        <InboxListItem activityId={id} key={id} />
      ))}
    </Flex>
  )
})

InboxList.displayName = 'InboxList'
