import React, { memo } from 'react'
import { useProjectIds } from 'src/store/entities/project'
import { ListItem } from './ListItem'

type Props = {}

export const ProjectList: React.VFC<Props> = memo(() => {
  const { projectIds } = useProjectIds()

  return (
    <>
      {projectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  )
})
ProjectList.displayName = 'ProjectList'
