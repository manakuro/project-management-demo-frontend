import { useRecoilCallback } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import {
  projectTeammateState,
  ProjectTeammate,
} from 'src/store/entities/projectsTeammates'
import { Teammate, useTeammatesResponse } from 'src/store/entities/teammates'
import { projectState } from '../atom'
import { ProjectResponse } from '../type'

export const useProjectsResponse = () => {
  const { setTeammates: setTeammatesFromResponse } = useTeammatesResponse()

  const setProjectTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        const projectTeammates = data.reduce<ProjectTeammate[]>((acc, p) => {
          return uniqBy([...acc, ...p.projectTeammates], 'id')
        }, [])

        projectTeammates.forEach((p) => set(projectTeammateState(p.id), p))
      },
  )

  const setTeammates = useRecoilCallback(
    () => (data: ProjectResponse[]) => {
      const teammates = data.reduce<Teammate[]>(
        (acc, p) =>
          uniqBy(
            [...acc, ...p.projectTeammates.map((pt) => pt.teammate)],
            'id',
          ),
        [],
      )

      setTeammatesFromResponse(teammates)
    },
    [setTeammatesFromResponse],
  )

  const setProjects = useRecoilCallback(
    ({ set }) =>
      (data: ProjectResponse[]) => {
        data.forEach((p) => {
          set(projectState(p.id), p)
        })

        setProjectTeammates(data)
        setTeammates(data)
      },
    [setProjectTeammates, setTeammates],
  )

  return {
    setProjects,
  }
}
