import React, { memo } from 'react'
import { useProjectIds } from 'src/store/entities/projects'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'

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
