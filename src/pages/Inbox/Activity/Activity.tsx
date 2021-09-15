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
} from 'src/components/organisms/Inbox'
import { useInboxTaskDetail } from 'src/components/organisms/Inbox'
import { TaskDetailSide } from 'src/components/organisms/TaskDetails'
import { useInboxActivityQuery } from 'src/hooks/queries/useInboxActivityQuery'
import { getInboxDetailId, isInboxDetailURL } from 'src/router'
import { useInboxPageContext } from '../Provider'
import { SkeletonActivity } from './SkeletonActivity'

export const Activity: React.VFC = memo(() => {
  return <Component />
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useInboxPageContext()
  const { loading: loadingQuery } = useInboxActivityQuery()
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  )

  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
  })

  if (loading) return <SkeletonActivity />

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
Activity.displayName = 'Activity'
