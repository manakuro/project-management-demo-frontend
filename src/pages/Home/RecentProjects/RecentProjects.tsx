import React, { memo } from 'react'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'
import { useProjectIds } from 'src/store/entities/project'

type Props = {}

export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjectIds()

  return (
    <ProjectsContainer
      title="Recent Projects"
      showNewOrder
      projectIds={projectIds}
    />
  )
})
RecentProjects.displayName = 'RecentProjects'
