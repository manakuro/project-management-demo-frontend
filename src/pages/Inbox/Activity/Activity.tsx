import React, { memo, useEffect, useMemo } from 'react'
import {
  Inbox,
  InboxLeft,
  InboxRight,
  InboxHeader,
  InboxHeaderRight,
  MoreActionButton,
  FilterButton,
} from 'src/components/organisms/Inbox'
import { useInboxDetail } from 'src/components/organisms/Inbox'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
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
  const { setId } = useTaskDetail()

  useEffect(() => {
    setId('1')
  }, [setId])

  useInboxDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
  })

  if (loading) return <SkeletonActivity />

  return (
    <>
      <Inbox>
        <InboxLeft>
          <InboxHeader>
            <InboxHeaderRight ml="auto">
              <FilterButton />
              <MoreActionButton />
            </InboxHeaderRight>
          </InboxHeader>
        </InboxLeft>
        <InboxRight>
          <TaskDetailSide />
        </InboxRight>
      </Inbox>
    </>
  )
})
Activity.displayName = 'Activity'
