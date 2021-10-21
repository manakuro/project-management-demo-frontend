import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksProvider } from 'src/components/organisms/Tasks'
import { useProjectsPageContext } from 'src/pages/Projects/Provider'
import { OverviewLeft } from './OverviewLeft'
import { OverviewLeftContent } from './OverviewLeftContent'
import { OverviewRight } from './OverviewRight'
import { OverviewRightContent } from './OverviewRightContent'
import { SkeletonOverview } from './SkeletonOverview'

export const Overview: React.VFC = memo(() => {
  return (
    <TasksProvider isProjectsPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useProjectsPageContext()

  if (loadingTabContent) return <SkeletonOverview />

  return (
    <Flex flex={1} h="full" maxW="full">
      <OverviewLeft>
        <OverviewLeftContent>left</OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight>
        <OverviewRightContent>right</OverviewRightContent>
      </OverviewRight>
    </Flex>
  )
})
Component.displayName = 'Component'
Overview.displayName = 'Overview'
