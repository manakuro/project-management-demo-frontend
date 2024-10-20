import React, { memo, useMemo } from 'react'
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
} from 'src/components/features/organisms/Inbox'
import { useInboxTaskDetail } from 'src/components/features/organisms/Inbox'
import { TaskDetailSide } from 'src/components/features/organisms/TaskDetails'
import { TasksProvider } from 'src/components/features/organisms/Tasks'
import { Flex } from 'src/components/ui/atoms'
import { useInboxActivityPageQuery } from 'src/hooks/queries/app'
import { getInboxDetailId, isInboxDetailURL } from 'src/router'
import { useInboxPageContext } from '../Provider'

export const Activity: React.FC = memo(() => {
  return <Component />
})

const Component: React.FC = memo(() => {
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
    <TasksProvider isInboxPage>
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
    </TasksProvider>
  )
})
Component.displayName = 'Component'
Activity.displayName = 'Activity'
