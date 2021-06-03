import React from 'react'
import { ListItem } from './ListItem'
import { useProjectIds } from 'src/store/entities/projects'

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
