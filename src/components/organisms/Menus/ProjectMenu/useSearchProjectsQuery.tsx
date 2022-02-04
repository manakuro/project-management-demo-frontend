import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { ProjectResponse } from 'src/store/entities/project'
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
          projectBaseColorId: '0AI01FSB3CBYDQXQAED33EJJHH4WE',
          projectLightColorId: '0AJ01FSB3CBZRJVYTHPKBM26RM0CP',
          projectIconId: '0AJ01FSB3CBZRJVYTHPKBM26RM0CP',
          teammateIds: [teammates.manato.id, teammates.dan.id],
          projectTeammates: [
            {
              id: '1',
              teammateId: teammates.manato.id,
              projectId: '2',
              teammate: {
                id: teammates.manato.id,
                name: teammates.manato.name,
                image: teammates.manato.image,
                email: teammates.manato.email,
                createdAt: '',
                updatedAt: '',
              },
              isOwner: true,
              role: '',
              createdAt: '',
              updatedAt: '',
            },
            {
              id: '2',
              teammateId: teammates.dan.id,
              projectId: '2',
              teammate: {
                id: teammates.dan.id,
                name: teammates.dan.name,
                image: teammates.dan.image,
                email: teammates.dan.email,
                createdAt: '',
                updatedAt: '',
              },
              isOwner: false,
              role: '',
              createdAt: '',
              updatedAt: '',
            },
          ],
          description: {
            type: '',
            content: [],
          },
          descriptionTitle: '',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          createdBy: '1',
          createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
          updatedAt: '',
        },
        {
          id: '2',
          name: 'Asana 2',
          projectBaseColorId: '0AI01FSB3CBYDQXQAED33E9PNJRXH',
          projectLightColorId: '0AJ01FSB3CBZRJVYTHPKBKTQNFACZ',
          projectIconId: '0AJ01FSB3CBZRJVYTHPKBM26RM0CP',
          teammateIds: [teammates.manato.id, teammates.dan.id],
          projectTeammates: [
            {
              id: '1',
              teammateId: teammates.manato.id,
              projectId: '2',
              teammate: {
                id: teammates.manato.id,
                name: teammates.manato.name,
                image: teammates.manato.image,
                email: teammates.manato.email,
                createdAt: '',
                updatedAt: '',
              },
              isOwner: true,
              role: '',
              createdAt: '',
              updatedAt: '',
            },
            {
              id: '2',
              teammateId: teammates.dan.id,
              projectId: '2',
              teammate: {
                id: teammates.dan.id,
                name: teammates.dan.name,
                image: teammates.dan.image,
                email: teammates.dan.email,
                createdAt: '',
                updatedAt: '',
              },
              isOwner: false,
              role: '',
              createdAt: '',
              updatedAt: '',
            },
          ],
          description: {
            type: '',
            content: [],
          },
          descriptionTitle: '',
          dueDate: new Date(dateFns.addDays(new Date(), 3)).toISOString(),
          createdBy: '1',
          createdAt: new Date(dateFns.subDays(new Date(), 10)).toISOString(),
          updatedAt: '',
        },
      ])
    }, 300)
  })
}
