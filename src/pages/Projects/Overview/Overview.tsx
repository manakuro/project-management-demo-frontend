import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksContainer } from 'src/components/organisms/Tasks'
import { useProjectsPageContext } from 'src/pages/Projects/Provider'
import { OverviewContent } from './OverviewContent'
import { OverviewLeft } from './OverviewLeft'
import { OverviewLeftContent } from './OverviewLeftContent'
import { OverviewRight } from './OverviewRight'
import { OverviewRightContent } from './OverviewRightContent'
import { OverviewTimeline } from './OverviewTimeline'
import { SkeletonOverview } from './SkeletonOverview'

export const Overview: React.FC = memo(() => {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  )
})

const Component: React.FC = memo(() => {
  const { tabContentLoading } = useProjectsPageContext()

  if (tabContentLoading) return <SkeletonOverview />

  return (
    <Flex flex={1} h="full" maxW="full">
      <OverviewLeft>
        <OverviewLeftContent>
          <OverviewContent />
        </OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight>
        <OverviewRightContent>
          <OverviewTimeline />
        </OverviewRightContent>
      </OverviewRight>
    </Flex>
  )
})
Component.displayName = 'Component'
Overview.displayName = 'Overview'
