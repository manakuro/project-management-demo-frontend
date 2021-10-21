import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { uuid } from 'src/shared/uuid'
import {
  ProjectResponse,
  useProjectsResponse,
} from 'src/store/entities/projects'
import { teammates } from 'src/store/entities/teammates/data'

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
  const { setProjects } = useProjectsResponse()

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
              id: uuid(),
              teammateId: teammates.manato.id,
              projectId: '1',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              isOwner: true,
              createdAt: '',
              updatedAt: '',
            },
            {
              id: uuid(),
              teammateId: teammates.dan.id,
              projectId: '1',
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
          name: 'Marketing',
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
              isOwner: true,
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
              isOwner: false,
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
    }, 1000)
  })
}
