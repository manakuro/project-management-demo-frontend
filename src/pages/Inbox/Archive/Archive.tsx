import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  Inbox,
  InboxLeft,
  InboxRight,
  InboxHeader,
  InboxList,
  InboxListContent,
  InboxSkeleton,
} from 'src/components/organisms/Inbox'
import { useInboxTaskDetail } from 'src/components/organisms/Inbox'
import { TaskDetailSide } from 'src/components/organisms/TaskDetails'
import { useInboxArchiveQuery } from 'src/hooks/queries/useInboxArchiveQuery'
import { getInboxDetailId, isInboxDetailURL } from 'src/router'
import { useInboxPageContext } from '../Provider'

export const Archive: React.VFC = memo(() => {
  return <Component />
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useInboxPageContext()
  const { loading: loadingQuery } = useInboxArchiveQuery()
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  )

  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
  })

  if (loading) return <InboxSkeleton />

  return (
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
  )
})
Archive.displayName = 'Archive'
