import { useEffect } from 'react'
import { Project, useProjects } from 'src/store/projects'

export const useProjectsQuery = () => {
  const { setProjects } = useProjects()

  useEffect(() => {
    ;(async () => {
      const res = await fetchProjects()
      setProjects(res)
    })()
  }, [setProjects])
}

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
            color: 'teal.400',
          },
          icon: {
            id: '1',
          },
        },
      ])
    }, 1000)
  })
}
