import React from 'react'
import { useProjectIds } from 'src/store/entities/projects'
import { ListItem } from './ListItem'

type Props = {}

export const ProjectList: React.VFC<Props> = () => {
  const { projectIds } = useProjectIds()

  return (
    <>
      {projectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  )
}
