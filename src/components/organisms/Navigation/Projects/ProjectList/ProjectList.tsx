import React from 'react'
import { ListItem } from './ListItem'
import { Project } from './types'

type Props = {}

const projects: Project[] = [
  {
    name: 'Asana',
    color: 'pink.400',
    href: 'home',
  },
]

export const ProjectList: React.VFC<Props> = () => {
  return (
    <>
      {projects.map((p, k) => (
        <ListItem project={p} key={k} />
      ))}
    </>
  )
}
