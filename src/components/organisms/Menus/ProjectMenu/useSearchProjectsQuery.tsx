import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { ProjectResponse } from 'src/store/entities/projects'
import { teammates } from 'src/store/entities/teammates/data'

const searchProjectsQueryState = atom<{ loading: boolean; projects: any[] }>({
  key: 'searchProjectsQueryState',
  default: {
    loading: false,
    projects: [],
  },
})

type Props = {
  queryText: string
}
export const useSearchProjectsQuery = () => {
  const [state, setState] = useRecoilState(searchProjectsQueryState)

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetchProjects()
      const filtered = res.filter((r) =>
        r.name.toLowerCase().includes(props.queryText.toLowerCase()),
      )
      setState((s) => ({ ...s, projects: filtered, loading: false }))
      return filtered
    },
    [setState],
  )

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
              id: uuid(),
              teammateId: teammates.manato.id,
              projectId: '2',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: uuid(),
              teammateId: teammates.dan.id,
              projectId: '2',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              createdAt: '',
              updatedAt: '',
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
              id: uuid(),
              teammateId: teammates.manato.id,
              projectId: '2',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: uuid(),
              teammateId: teammates.dan.id,
              projectId: '2',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: uuid(),
              teammateId: teammates.kent.id,
              projectId: '1',
              name: teammates.kent.name,
              image: teammates.kent.image,
              email: teammates.kent.email,
              createdAt: '',
              updatedAt: '',
            },
          ],
        },
      ])
    }, 300)
  })
}
