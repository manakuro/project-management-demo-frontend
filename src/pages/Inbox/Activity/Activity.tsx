import React, { memo } from 'react'
import {
  Inbox,
  InboxLeft,
  InboxRight,
  InboxHeader,
  InboxHeaderRight,
  MoreActionButton,
  FilterButton,
} from 'src/components/organisms/Inbox'
import { useInboxPageContext } from '../Provider'
import { SkeletonActivity } from './SkeletonActivity'

export const Activity: React.VFC = memo(() => {
  return <Component />
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useInboxPageContext()

  if (loadingTabContent) return <SkeletonActivity />

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
        <InboxRight>hey</InboxRight>
      </Inbox>
    </>
  )
})
Activity.displayName = 'Activity'
