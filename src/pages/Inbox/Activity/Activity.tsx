import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  Inbox,
  InboxLeft,
  InboxRight,
  InboxHeader,
  InboxList,
  InboxListContent,
  InboxHeaderRight,
  MoreActionButton,
  FilterButton,
  InboxSkeleton,
} from 'src/components/organisms/Inbox'
import { useInboxTaskDetail } from 'src/components/organisms/Inbox'
import { TaskDetailSide } from 'src/components/organisms/TaskDetails'
import { useInboxActivityPageQuery } from 'src/hooks/queries/app'
import { getInboxDetailId, isInboxDetailURL } from 'src/router'
import { useInboxPageContext } from '../Provider'

export const Activity: React.VFC = memo(() => {
  return <Component />
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useInboxPageContext()
  const { loading: loadingQuery } = useInboxActivityPageQuery()
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  )

  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
    fetchQuery: async () => {},
  })

  if (loading) return <InboxSkeleton />

  return (
    <Inbox isActivity>
      <InboxLeft>
        <InboxHeader>
          <InboxHeaderRight>
            <FilterButton />
            <MoreActionButton />
          </InboxHeaderRight>
        </InboxHeader>
        <InboxListContent>
          <Flex>
            <InboxList />
          </Flex>
        </InboxListContent>
      </InboxLeft>
      <InboxRight>
        <TaskDetailSide />
      </InboxRight>
    </Inbox>
  )
})
Component.displayName = 'Component'
Activity.displayName = 'Activity'
