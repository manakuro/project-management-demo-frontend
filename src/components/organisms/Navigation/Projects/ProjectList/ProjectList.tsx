import React, { useEffect } from 'react'
import { ListItem } from './ListItem'
import { Project, useProjects } from 'src/store/projects'

type Props = {}

const fetchProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Asana',
          color: {
            id: '10',
            name: 'pink',
            color: 'pink.400',
          },
          icon: {
            id: '1',
          },
        },
        {
          id: '2',
          name: 'Asana 2',
          color: {
            id: '10',
            name: 'pink',
            color: 'pink.400',
          },
          icon: {
            id: '1',
          },
        },
      ])
    }, 1000)
  })
}

export const ProjectList: React.VFC<Props> = () => {
  const { projects, setProjects } = useProjects()

  useEffect(() => {
    ;(async () => {
      const res = await fetchProjects()
      setProjects(res)
    })()
  }, [setProjects])
  console.log('projects: ', projects)

  return (
    <>
      {projects.map((p, k) => (
        <ListItem project={p} key={k} />
      ))}
    </>
  )
}
