import React, { memo } from 'react'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'
import { useProjectIds } from 'src/store/entities/project'

type Props = {}

export const RecentProjects: React.FC<Props> = memo<Props>(() => {
  const { projectIds } = useProjectIds()

  return (
    <ProjectsContainer
      title="Recent Projects"
      showNewOrder
      projectIds={projectIds}
      projectTileItemProps={{
        'aria-label': 'recent project tile item',
      }}
      projectListItemProps={{
        'aria-label': 'recent project list item',
      }}
    />
  )
})
RecentProjects.displayName = 'RecentProjects'
