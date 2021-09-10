import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import {
  ActivityIdsSortByUpdatedAtKeys,
  useActivityIdsSortByUpdatedAt,
} from 'src/store/app/inbox/activity/activities'
import { InboxListSection } from '../InboxListSection'
import { useInboxList } from './useInboxList'

type Props = FlexProps

export const InboxList: React.FC<Props> = memo<Props>((props) => {
  const { activityIds } = useActivityIdsSortByUpdatedAt()
  const firstActivityId = useMemo(() => {
    const key =
      (Object.keys(activityIds) as ActivityIdsSortByUpdatedAtKeys[]).find(
        (k) => !!activityIds[k].length,
      ) || 'today'
    return activityIds[key][0]
  }, [activityIds])

  useInboxList({ activityId: firstActivityId })

  return (
    <Flex {...props} flexDirection="column" flex={1} maxWidth="full">
      <InboxListSection activityIds={activityIds.today} sectionText="Today" />
      <InboxListSection
        activityIds={activityIds.yesterday}
        sectionText="Yesterday"
      />
      <InboxListSection
        activityIds={activityIds.pastSevenDays}
        sectionText="Past 7 days"
      />
      <InboxListSection
        activityIds={activityIds.earlier}
        sectionText="Earlier"
      />
    </Flex>
  )
})

InboxList.displayName = 'InboxList'
