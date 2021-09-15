import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import {
  useInboxListItemIds,
  UseInboxListItemIdsKeys,
} from 'src/components/organisms/Inbox'
import { InboxListSection } from '../InboxListSection'
import { useInboxList } from './useInboxList'

type Props = FlexProps

export const InboxList: React.FC<Props> = memo<Props>((props) => {
  const { listItemIds } = useInboxListItemIds()
  const firstListItemId = useMemo(() => {
    const key =
      (Object.keys(listItemIds) as UseInboxListItemIdsKeys[]).find(
        (k) => !!listItemIds[k].length,
      ) || 'today'
    return listItemIds[key][0]
  }, [listItemIds])

  useInboxList({ listItemId: firstListItemId })

  return (
    <Flex flexDirection="column" flex={1} maxWidth="full" {...props}>
      <InboxListSection listItemIds={listItemIds.today} sectionText="Today" />
      <InboxListSection
        listItemIds={listItemIds.yesterday}
        sectionText="Yesterday"
      />
      <InboxListSection
        listItemIds={listItemIds.pastSevenDays}
        sectionText="Past 7 days"
      />
      <InboxListSection
        listItemIds={listItemIds.earlier}
        sectionText="Earlier"
      />
    </Flex>
  )
})

InboxList.displayName = 'InboxList'
