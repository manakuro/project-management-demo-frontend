import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { ProjectResponse } from 'src/store/entities/projects'
import { teammates } from 'src/store/entities/teammates/data'

const key = (str: string) =>
  `src/components/organisms/Menus/ProjectMenu/useSearchProjectsQuery/${str}`

const searchProjectsQueryState = atom<{ loading: boolean; projects: any[] }>({
  key: key('searchProjectsQueryState'),
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
              id: '1',
              teammateId: teammates.manato.id,
              projectId: '2',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              isOwner: true,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: '2',
              teammateId: teammates.dan.id,
              projectId: '2',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              isOwner: false,
              createdAt: '',
              updatedAt: '',
            },
          ],
          description: '',
          descriptionTitle: '',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
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
              teammateId: teammates.manato.id,
              projectId: '2',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              isOwner: true,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: '2',
              teammateId: teammates.dan.id,
              projectId: '2',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              isOwner: false,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: '3',
              teammateId: teammates.kent.id,
              projectId: '1',
              name: teammates.kent.name,
              image: teammates.kent.image,
              email: teammates.kent.email,
              isOwner: false,
              createdAt: '',
              updatedAt: '',
            },
          ],
          description: '',
          descriptionTitle: '',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
        },
      ])
    }, 300)
  })
}
