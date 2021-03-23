import React, { memo } from 'react'
import { useProjects } from 'src/store/projects'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'

type Props = {}

export const RecentProjects: React.VFC<Props> = memo<Props>(() => {
  const { projectIds } = useProjects()

  return (
    <ProjectsContainer
      title="Recent Projects"
      showNewOrder
      projectIds={projectIds}
    />
  )
})
