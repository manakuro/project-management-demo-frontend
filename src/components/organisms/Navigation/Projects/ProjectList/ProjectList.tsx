import React from 'react'
import { ListItem } from './ListItem'
import { useProjects } from 'src/store/projects'

type Props = {}

export const ProjectList: React.VFC<Props> = () => {
  const { projectIds } = useProjects()

  return (
    <>
      {projectIds.map((id) => (
        <ListItem projectId={id} key={id} />
      ))}
    </>
  )
}
