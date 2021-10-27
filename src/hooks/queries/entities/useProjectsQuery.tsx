import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
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
              id: '1',
              teammateId: teammates.manato.id,
              projectId: '1',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              isOwner: true,
              role: '',
              createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
              updatedAt: '',
            },
            {
              id: '2',
              teammateId: teammates.dan.id,
              projectId: '1',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              isOwner: false,
              role: '',
              createdAt: new Date(dateFns.subDays(new Date(), 4)).toISOString(),
              updatedAt: '',
            },
          ],
          description: JSON.stringify(
            {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Welcome to the Marketing team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas!',
                    },
                  ],
                },
                { type: 'paragraph' },
              ],
            },
            null,
            2,
          ),
          descriptionTitle: "How we'll collaborate",
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          createdBy: '1',
          createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
          updatedAt: '',
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
              id: '3',
              teammateId: teammates.manato.id,
              projectId: '2',
              name: teammates.manato.name,
              image: teammates.manato.image,
              email: teammates.manato.email,
              isOwner: true,
              role: '',
              createdAt: new Date(dateFns.subDays(new Date(), 5)).toISOString(),
              updatedAt: '',
            },
            {
              id: '4',
              teammateId: teammates.dan.id,
              projectId: '2',
              name: teammates.dan.name,
              image: teammates.dan.image,
              email: teammates.dan.email,
              isOwner: false,
              role: '',
              createdAt: new Date(dateFns.subDays(new Date(), 4)).toISOString(),
              updatedAt: '',
            },
            {
              id: '5',
              teammateId: teammates.kent.id,
              projectId: '1',
              name: teammates.kent.name,
              image: teammates.kent.image,
              email: teammates.kent.email,
              isOwner: false,
              role: '',
              createdAt: new Date(dateFns.subDays(new Date(), 3)).toISOString(),
              updatedAt: '',
            },
          ],
          description: '',
          descriptionTitle: '',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          createdBy: '1',
          createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
          updatedAt: '',
        },
      ])
    }, 1000)
  })
}
