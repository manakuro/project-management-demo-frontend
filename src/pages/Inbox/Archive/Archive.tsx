import type React from 'react'
import { memo, useMemo } from 'react'
import {
  Inbox,
  InboxHeader,
  InboxLeft,
  InboxList,
  InboxListContent,
  InboxRight,
  InboxSkeleton,
} from 'src/components/features/organisms/Inbox'
import { useInboxTaskDetail } from 'src/components/features/organisms/Inbox'
import { TaskDetailSide } from 'src/components/features/organisms/TaskDetails'
import { TasksProvider } from 'src/components/features/organisms/Tasks'
import { Flex } from 'src/components/ui/atoms'
import { useInboxArchivePageQuery } from 'src/hooks/queries/app'
import { getInboxDetailId, isInboxDetailURL } from 'src/router'
import { useInboxPageContext } from '../Provider'

export const Archive: React.FC = memo(() => {
  return <Component />
})

const Component: React.FC = memo(() => {
  const { loadingTabContent } = useInboxPageContext()
  const { loading: loadingQuery } = useInboxArchivePageQuery()
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
      <Inbox isArchive>
        <InboxLeft>
          <InboxHeader />
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
Archive.displayName = 'Archive'
