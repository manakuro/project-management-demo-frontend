import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { ProjectResponse, useProjects } from 'src/store/entities/projects'

type Props = {
  lazy?: boolean
}

const projectsQueryState = atom<{ loading: boolean }>({
  key: 'projectsQueryState',
  default: {
    loading: false,
  },
})

export const useProjectsQuery = (props?: Props) => {
  const [state, setState] = useRecoilState(projectsQueryState)
  const { setProjects } = useProjects()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      setState((s) => ({ ...s, loading: true }))
      const res = await fetchProjects()
      setProjects(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [props?.lazy, setProjects, setState])

  const refetch = useCallback(() => {
    ;(async () => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetchProjects()
      setProjects(res)
      setState((s) => ({ ...s, loading: false }))
    })()
  }, [setProjects, setState])

  return {
    refetch,
    ...state,
  }
}

const fetchProjects = (): Promise<ProjectResponse[]> => {
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
