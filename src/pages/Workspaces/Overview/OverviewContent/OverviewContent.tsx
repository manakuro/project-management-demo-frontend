import React, { memo } from 'react'
import { DescriptionSection } from './DescriptionSection'
import { KeyResourcesSection } from './KeyResourcesSection'
import { ProjectRolesSection } from './ProjectRolesSection'

type Props = {}

export const OverviewContent: React.VFC<Props> = memo<Props>(() => {
  return (
    <>
      <DescriptionSection />
      <ProjectRolesSection />
      <KeyResourcesSection />
    </>
  )
})
OverviewContent.displayName = 'OverviewContent'
