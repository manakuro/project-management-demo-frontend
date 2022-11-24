import React, { memo } from 'react'
import { DescriptionSection } from './DescriptionSection'
import { KeyResourcesSection } from './KeyResourcesSection'
import { ProjectRolesSection } from './ProjectRolesSection'

type Props = {}

export const OverviewContent: React.FC<Props> = memo<Props>(() => {
  return (
    <>
      <DescriptionSection />
      <ProjectRolesSection />
      <KeyResourcesSection />
    </>
  )
})
OverviewContent.displayName = 'OverviewContent'
