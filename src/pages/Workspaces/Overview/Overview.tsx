import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksProvider } from 'src/components/organisms/Tasks'
import { useWorkspacesPageContext } from '../Provider'
import { DescriptionSection } from './DescriptionSection'
import { MembersSection } from './MembersSection'
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
  const { loadingTabContent } = useWorkspacesPageContext()

  if (loadingTabContent) return <SkeletonOverview />

  return (
    <Flex flex={1} h="full" maxW="full" justifyContent="center">
      <OverviewLeft mt={12}>
        <OverviewLeftContent>
          <DescriptionSection />
          <MembersSection />
        </OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight mt={12}>
        <OverviewRightContent>hey</OverviewRightContent>
      </OverviewRight>
    </Flex>
  )
})
Component.displayName = 'Component'
Overview.displayName = 'Overview'
