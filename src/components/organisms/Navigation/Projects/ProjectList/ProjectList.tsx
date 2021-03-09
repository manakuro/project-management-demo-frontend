import React from 'react'
import { ListItem } from './ListItem'
import { useProjects } from 'src/store/projects'

type Props = {}

export const ProjectList: React.VFC<Props> = () => {
  const { projects } = useProjects()

  return (
    <>
      {projects.map((p, k) => (
        <ListItem project={p} key={k} />
      ))}
    </>
  )
}
