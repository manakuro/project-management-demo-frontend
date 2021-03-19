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
            id: '4',
          },
          teammates: [
            {
              id: '1',
              name: 'Manato Kuroda',
              image: '/images/cat_img.png',
              email: 'manato.kuroda@gmail.com',
            },
            {
              id: '2',
              name: 'Dan Abrahmov',
              image: 'https://bit.ly/dan-abramov',
              email: 'dan.abrahmov@gmail.com',
            },
          ],
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
            id: '3',
          },
          teammates: [
            {
              id: '1',
              name: 'Manato Kuroda',
              image: '/images/cat_img.png',
              email: 'manato.kuroda@gmail.com',
            },
            {
              id: '2',
              name: 'Dan Abrahmov',
              image: 'https://bit.ly/dan-abramov',
              email: 'dan.abrahmov@gmail.com',
            },
            {
              id: '3',
              name: 'Kent Dodds',
              image: 'https://bit.ly/kent-c-dodds',
              email: 'kent.dodds@gmail.com',
            },
          ],
        },
      ])
    }, 1000)
  })
}
